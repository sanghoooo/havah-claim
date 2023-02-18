import "./index.scss";
import Button from "../Button";
import { ArrowBottom, Copy, NewLink } from "../../utils/icons";
import { useCallback, useRef, useState } from "react";
import { classBind, delay, ellipsisHash } from "../../utils/util";
import { getBalance, useWallet, sendTransaction } from "../../utils/wallet";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
	accountState,
	completionTimeState,
	congratulatedState,
	referralState,
} from "../../recoil/atom";
import {
	DISCORD_LOGIN_LINK,
	ERROR_MESSAGE,
	INITIAL_CONTENTS_COMPLETED,
	INITIAL_CONTENTS_VALUES,
	MINIMUM_BALANCE,
	MITTER_LINK,
	NFT_CONTRACT,
	NFT_METADATA_LIST,
	NFT_METHOD,
	SIGN_UP_LINK,
	TESTNET_NID,
	WEBSITE_LINK,
} from "../../utils/const";
import { useEffect } from "react";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { checkAddress, hvhAddress, getEventComplete, getDiscordOauthToken } from "../../utils/api";
import Step from "./Step";
import EmailVerifier from "./EmailVerifier";
import queryString from "query-string";
import { Client, auth } from "twitter-api-sdk";

function Content() {
	const account = useRecoilValue(accountState);
	const [values, setValues] = useState(INITIAL_CONTENTS_VALUES);
	const [completed, setCompleted] = useState(INITIAL_CONTENTS_COMPLETED);
	const [mintError, setMintError] = useState("");
	const [confirmError, setConfirmError] = useState("");
	const setCongratulated = useSetRecoilState(congratulatedState);
	const [referral, setReferral] = useRecoilState(referralState);
	const setCompletionTime = useSetRecoilState(completionTimeState);
	const [selected, setSelected] = useState(undefined);
	const { connect, disconnect, scan } = useWallet();

	const changeValues = useCallback(
		(changed) => {
			setValues({
				...values,
				...changed,
			});
		},
		[values]
	);

	const changeCompleted = useCallback(
		(changed) => {
			setCompleted({
				...completed,
				...changed,
			});
		},
		[completed]
	);

	const init = useCallback(() => {
		setValues(INITIAL_CONTENTS_VALUES);
		setCompleted(INITIAL_CONTENTS_COMPLETED);
		setSelected(undefined);
		setMintError("");
		setConfirmError("");
		setCongratulated(false);
		setReferral("");
		setCompletionTime("");
	}, []);

	const check = useCallback(async () => {
		changeCompleted({ wallet: undefined });

		const success = async (address) => {
			const {
				result: already,
				referral,
				completionTime,
				error,
			} = await checkAddress(address);

			if (error) {
				changeCompleted({ wallet: false });
				toast.error(ERROR_MESSAGE[error]);
				return;
			}

			if (already) {
				changeCompleted({ wallet: false });
				alert("You have already participated in this event.");
				setCongratulated(true);
				setReferral(referral);
				setCompletionTime(completionTime);
			} else {
				changeCompleted({ wallet: true });
				toast.success("Connected successfully.");
			}
		};

		const failure = () => {
			changeCompleted({ wallet: false });
			toast.error("Connection failed.");
		};

		await connect(success, failure);
	}, [account, changeCompleted, setReferral, setCompletionTime, setCongratulated]);

	const claim = useCallback(
		async (address) => {
			changeCompleted({ hvh: undefined });

			const saved = await getBalance(address);

			if (saved >= MINIMUM_BALANCE) {
				changeValues({ hvh: saved });
				changeCompleted({ hvh: true });
				toast.success("You already have more than 10 HVH.");
				return;
			}

			const { error } = await hvhAddress(address);

			if (error) {
				changeCompleted({ hvh: false });
				toast.error(ERROR_MESSAGE[error]);
				return;
			}

			const recursive = async (count) => {
				if (count < 0) {
					return 0;
				}

				await delay(1000);
				const value = await getBalance(address);
				if (value >= MINIMUM_BALANCE) {
					return value;
				}

				return await recursive(count - 1);
			};

			await delay(1000);
			const claimed = await recursive(7);

			if (claimed < MINIMUM_BALANCE) {
				changeCompleted({ hvh: false });
				toast.error("Your claim may have failed or delayed.\nPlease try again later.");
				return;
			}

			changeValues({ hvh: claimed });
			changeCompleted({ hvh: true });
			toast.success("Requested successfully.");
		},
		[changeValues, changeCompleted]
	);

	const mint = useCallback(async () => {
		if (account.nid !== TESTNET_NID) {
			setMintError("Please change the network directly to HAVAH Chain Testnet.");
			return;
		}

		if (selected === undefined) {
			setMintError("Select NFT Image.");
			return;
		}

		if (mintError) {
			setMintError("");
		}

		const { txHash, type } = await sendTransaction({
			to: NFT_CONTRACT,
			method: NFT_METHOD,
			params: {
				_uri: NFT_METADATA_LIST[selected].uri,
			},
		});

		switch (type) {
			case "success":
				changeValues({ nft: txHash });
				changeCompleted({ nft: true });
				toast.success("Minted successfully.");
				gtag("event", "mint_complete");
				return;
			case "cancel":
			case "close":
				changeCompleted({ nft: false });
				toast.error("User rejected.");
				return;
			default:
				changeCompleted({ nft: false });
				toast.error("Transaction failed.");
		}
	}, [selected, changeValues, changeCompleted, account, mintError]);

	const bridge = useCallback(async () => {
		window.open(MITTER_LINK);

		changeCompleted({ bridged: true });

		await delay(100);
	}, [changeCompleted]);

	const confirm = useCallback(async () => {
		if (referral) {
			setCongratulated(true);
			return;
		}

		changeCompleted({ confirmed: undefined });

		if (confirmError) {
			setConfirmError("");
		}

		const parsed = queryString.parse(window.location.search);
		const {
			result,
			referral: code,
			completionTime,
			error,
		} = await getEventComplete(account.address, parsed.referral, values.email);

		if (error === 1) {
			const {
				result: already,
				referral: alreadyCode,
				completionTime: alreadyTime,
			} = await checkAddress(account.address);

			if (already) {
				setCongratulated(true);
				setReferral(alreadyCode);
				setCompletionTime(alreadyTime);
				changeCompleted({ confirmed: true });
				return;
			}
		} else if (error) {
			setConfirmError(ERROR_MESSAGE[error]);
			changeCompleted({ confirmed: false });
			return;
		}

		if (!result) {
			setConfirmError("Please bridge your NFT using HAVAH Mitter.");
			changeCompleted({ confirmed: false });
		} else {
			setCongratulated(true);
			setReferral(code);
			setCompletionTime(completionTime);
			changeCompleted({ confirmed: true });
			gtag("event", "confirm_event");
		}
	}, [
		account,
		referral,
		values,
		confirmError,
		setReferral,
		setCompletionTime,
		changeCompleted,
		setConfirmError,
	]);

	const selectImage = useCallback(
		(index) => {
			if (mintError) {
				setMintError("");
			}

			setSelected(index);
		},
		[mintError]
	);

	const copyData = useCallback((address) => {
		copy(address);
		toast.success("Copied successfully.");
	}, []);

	const signUp = useCallback(() => {
		window.open(SIGN_UP_LINK);
	}, []);

	const goHavah = useCallback(() => {
		window.open(WEBSITE_LINK);
	}, []);

	////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////

	const scrollRef = useRef();
	const codeRef = useRef();

	const goScrollRef = useCallback(() => {
		scrollRef.current.scrollIntoView({ behavior: "smooth" });
	}, []);

	useEffect(() => {
		const { address } = account;

		if (address) {
			const { search } = window.location;
			const parsed = queryString.parse(search);

			changeCompleted({
				...INITIAL_CONTENTS_COMPLETED,
				wallet: true,
			});

			if (parsed.code && codeRef.current) {
				changeValues({ discord: parsed.code });
				codeRef.current.scrollIntoView({ behavior: "smooth" });
			}
		}
	}, [account]);

	useEffect(() => {
		const { search } = window.location;
		const parsed = queryString.parse(search);
		if (parsed.code && codeRef.current) {
			changeValues({ discord: parsed.code });
			codeRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, []);

	return (
		<div className="Content">
			<section className="introduction">
				<div className="background"></div>
				<div className="background reflection"></div>
				<h1>
					<span>HAVAH</span>
					Claim HAVAH Airdrop
				</h1>
				<p>
					Join the Discord Channel and follow the official Twitter account.
					<br />
					Claim Airdrop using HAVAH account.
				</p>
				<Button white filled onClick={goScrollRef} title="LET'S CLAIM" />
				<Button
					white
					lined
					onClick={goHavah}
					title={
						<>
							<span>HAVAH.io</span>
							<NewLink white />
						</>
					}
				/>
				<ArrowBottom white onClick={goScrollRef} />
			</section>
			<section className="progress">
				<div className="background"></div>
				<div ref={scrollRef} className="scroll_position"></div>
				<h2>STEPS</h2>
				<Step
					index="1"
					highlight={!completed.wallet}
					completed={completed.wallet}
					title="Connect Wallet"
					titleCompleted={
						<>
							{ellipsisHash(account.address)}
							<NewLink white size="1.02em" onClick={() => scan(account.address)} />
							<Copy white size="1.1em" onClick={() => copyData(account.address)} />
						</>
					}
					description={<>Connect Wallet.</>}
					form={
						<>
							<Button
								mint
								filled
								onClick={check}
								disabled={completed.wallet === true}
								title={completed.wallet ? "CONNECTED" : "CONNECT"}
							/>
						</>
					}
				/>
				<div ref={codeRef} style={{ position: "relative", top: -100 }} />
				<Step
					index="2"
					highlight={completed.wallet && !completed.discord}
					completed={completed.discord}
					title="Discord"
					description={<>Discord</>}
					form={
						<>
							<Button
								lined
								discord
								onClick={() => {
									window.open(DISCORD_LOGIN_LINK);
								}}
								disabled={values.discord}
								title={
									<>
										Authorize
										<NewLink discord />
									</>
								}
							/>
							<Button
								filled
								discord
								onClick={async () => {
									changeCompleted({ discord: undefined });
									getDiscordOauthToken(values.discord);
									changeCompleted({ discord: true });
								}}
								disabled={!values.discord || completed.discord}
								title={completed.discord ? "VERIFIED" : "VERIFY"}
							/>
						</>
					}
				/>
				<Step
					index="2"
					highlight={completed.discord && !completed.twitter}
					completed={completed.twitter}
					title="Twitter"
					description={<>Twitter</>}
					form={
						<>
							<Button
								lined
								discord
								onClick={async () => {
									const client = new Client(
										"AAAAAAAAAAAAAAAAAAAAABDTlgEAAAAALtYyWPo%2Fmvb7M6ZpV9D 8IdvVtss%3DPnFqGRosot6sgerIty8XS9DBcmlAkfnpAEUMpKvplIUvXdHGxy"
									);

									const response = await client.users.findUserByUsername(
										"elonmusk"
									);
								}}
								title={
									<>
										TTT
										<NewLink discord />
									</>
								}
							/>
							<Button
								filled
								discord
								onClick={async () => {
									changeCompleted({ discord: undefined });
									await delay(1000);
									changeCompleted({ discord: true });
								}}
								disabled={!values.discord || completed.discord}
								title={completed.discord ? "VERIFIED" : "VERIFY"}
							/>
						</>
					}
				/>
				{/**
				 *
				 *
				 *
				 *
				 *
				 *
				 *
				 *
				 */}

				<Step
					index="2"
					highlight={completed.wallet && !completed.email}
					completed={completed.email}
					title="Verify Email"
					titleCompleted={values.email}
					description={
						<>
							Enter your email to verify your <b>HAVAH account</b>.<br />
							If you do not have an account yet, please click <b>Sign Up</b> button
							and register first.
						</>
					}
					form={
						<>
							<EmailVerifier
								connected={completed.wallet}
								completed={completed.email}
								loading={() => changeCompleted({ email: undefined })}
								failure={() => changeCompleted({ email: false })}
								success={(value) => {
									changeValues({ email: value });
									changeCompleted({ email: true });
									toast.success("Verified successfully.");
								}}
							/>
							<Button
								mint
								lined
								onClick={signUp}
								title={
									<>
										<span>SIGN UP</span>
										<NewLink mint />
									</>
								}
							/>
						</>
					}
				/>
				<Step
					index="3"
					highlight={completed.email && !completed.hvh}
					completed={completed.hvh}
					title="Claim testnet HVH"
					titleCompleted={`${values.hvh.toFixed(4)} testnet HVH`}
					description={
						<>
							Switch to <b>testnet</b> and claim your <b>testnet HVH</b> tokens.
							<br />
							Please change the network directly to <b>HAVAH Chain Testnet</b> from
							the top right of your <b>HAVAH wallet</b>.
						</>
					}
					form={
						<>
							<Button
								mint
								filled
								onClick={() => claim(account.address)}
								disabled={completed.hvh !== false}
								title={completed.hvh ? "REQUESTED" : "REQUEST"}
							/>
						</>
					}
				/>
				<Step
					index="4"
					highlight={completed.hvh && !completed.nft}
					completed={completed.nft}
					title="Mint testnet NFT"
					titleCompleted={
						<>
							{ellipsisHash(values.nft)}
							<NewLink white size="1.02em" onClick={() => scan(values.nft)} />
							<Copy white size="1.1em" onClick={() => copyData(values.nft)} />
						</>
					}
					description={
						<>
							Mint your <b>testnet NFT</b> to be eligible for bridging.
							<br />
							Please check if you have changed HAVAH wallet’s network to the{" "}
							<b>testnet.</b>
						</>
					}
					form={
						<>
							<div className="list">
								{NFT_METADATA_LIST.map((item, index) => {
									return (
										<img
											key={index}
											src={item.image}
											alt={`image_${index}`}
											onClick={() => selectImage(index)}
											className={classBind(index === selected && "selected")}
										/>
									);
								})}
								{mintError && <p className="error">{mintError}</p>}
							</div>
							<Button
								mint
								filled
								onClick={mint}
								disabled={completed.nft !== false}
								title={completed.nft ? "MINTED" : "MINT"}
							/>
						</>
					}
				/>
				<Step
					index="5"
					highlight={completed.nft && !completed.bridged}
					completed={completed.bridged}
					title="Bridge My NFT"
					description={
						<>
							Almost there!
							<br />
							Use <b>HAVAH Mitter</b> to bridge your NFT.
							<br />
							Press the Bridge button and use the <b>HAVAH Mitter</b>.
							<br />
							Complete Steps 1 to 6 below.
						</>
					}
					form={
						<>
							<div className="information">
								<div className="box">
									<p>
										This task is to bridge your minted NFT to another network.
										<br />
										Please refer to the following process.
									</p>
									<ol>
										<li>Select Source chain ‘HAVAH’</li>
										<li>Connect HAVAH wallet</li>
										<li>Select your test NFT</li>
										<li>Select Destination chain</li>
										<li>Connect Destination chain's wallet</li>
										<li>Proceed with the transaction</li>
									</ol>
								</div>
							</div>
							<Button
								mint
								lined
								onClick={bridge}
								disabled={completed.confirmed}
								title={
									<>
										<span>BRIDGE MY NFT</span>
										<NewLink mint />
									</>
								}
							/>
						</>
					}
				/>
				<Step
					index="6"
					highlight={completed.bridged && !completed.confirmed}
					completed={completed.confirmed}
					title="Confirm Your Participation"
					last
					description={
						<>
							Your participation for <b>HAVAH Incentivized Testnet</b> is complete.
						</>
					}
					form={
						<>
							<Button
								mint
								filled
								onClick={confirm}
								disabled={completed.confirmed === undefined}
								title={completed.confirmed ? "CONFIRMED" : "CONFIRM"}
							/>
							{confirmError && <p className="error">{confirmError}</p>}
						</>
					}
				/>
			</section>
		</div>
	);
}

export default Content;
