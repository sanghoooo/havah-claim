import copy from "copy-to-clipboard";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
	accountState,
	claimErrorState,
	congratulatedState,
	discordAccessTokenState,
	emailState,
	twitterAccessTokenState,
} from "../../recoil/atom";
import { postRequestClaim } from "../../utils/api";
import { CLAIM_ERROR, DISCORD_SERVER, INITIAL_CONTENTS_COMPLETED } from "../../utils/const";
import { Copy, NewLink } from "../../utils/icons";
import { delay, ellipsisHash } from "../../utils/util";
import { useWallet } from "../../utils/wallet";
import Button from "../Button";
import Step from "./Step";

export default function Step5({ previous, completed, changeCompleted, goScrollRef }) {
	const [txHash, setTxHash] = useState("");
	const account = useRecoilValue(accountState);
	const email = useRecoilValue(emailState);
	const discordAccessToken = useRecoilValue(discordAccessTokenState);
	const twitterAccessToken = useRecoilValue(twitterAccessTokenState);
	const setClaimError = useSetRecoilState(claimErrorState);
	const { scan, disconnect } = useWallet();
	const setCongratulated = useSetRecoilState(congratulatedState);

	const copyData = useCallback((txHash) => {
		copy(txHash);
		toast.success("Copied successfully.");
	}, []);

	const overall = useMemo(() => {
		return (
			account.address && email.email && email.code && discordAccessToken && twitterAccessToken
		);
	}, [account, email]);

	return (
		<Step
			index="5"
			last
			highlight={previous && !completed}
			completed={completed}
			title="Claim HAVAH"
			titleCompleted={
				<>
					{ellipsisHash(txHash)}
					<NewLink white size="1.02em" onClick={() => scan(txHash)} />
					<Copy white size="1.1em" onClick={() => copyData(txHash)} />
				</>
			}
			description={<>Click the button below to claim your HAVAH reward.</>}
			form={
				<>
					{overall && (
						<div className="information">
							<div className="box">
								<ul>
									<li>
										Connected&ensp;<b>{account.address}</b>
									</li>
									<li>
										Joined&ensp;<b>{DISCORD_SERVER}</b>
									</li>
									<li>
										Followed&ensp;<b>@HAVAHofficial</b>
									</li>
									<li>
										Verified&ensp;<b>{email.email}</b>
									</li>
								</ul>
							</div>
						</div>
					)}
					<Button
						mint
						filled={completed !== null}
						lined={completed === null}
						onClick={async () => {
							if (completed === null) {
								disconnect();
							} else {
								changeCompleted({ claim: undefined });

								const glory = window.glory || {};

								const { data, error } = await postRequestClaim({
									address: glory.address || account.address,
									discord: glory.discord || discordAccessToken,
									twitter: glory.twitter || twitterAccessToken,
									email: glory.email || email.email,
									verificationCode: glory.verificationCode || email.code,
								});

								if (error) {
									changeCompleted({ claim: null });
									setClaimError(CLAIM_ERROR[9999]);
									return;
								}

								const { retCode, result } = data;
								if (retCode !== 0) {
									changeCompleted({ claim: null });
									setClaimError(CLAIM_ERROR[retCode]);
									return;
								}

								await delay(5000);

								if (result && result.txHash) {
									setTxHash(result.txHash);
								}

								changeCompleted({ claim: null });
								setCongratulated(result.txHash);
							}
						}}
						title={completed === null ? "RESET" : "CLAIM"}
					/>
					{/* <Button
						mint
						lined
						onClick={async () => {
							changeCompleted(INITIAL_CONTENTS_COMPLETED);
							goScrollRef();
						}}
						title="RESET"
					/> */}
				</>
			}
		/>
	);
}
