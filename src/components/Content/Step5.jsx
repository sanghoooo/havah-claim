import copy from "copy-to-clipboard";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import {
	accountState,
	discordAccessTokenState,
	emailState,
	twitterAccessTokenState,
} from "../../recoil/atom";
import { postRequestClaim } from "../../utils/api";
import { CLAIM_ERROR, DISCORD_SERVER } from "../../utils/const";
import { Copy, NewLink } from "../../utils/icons";
import { delay, ellipsisHash } from "../../utils/util";
import { useWallet } from "../../utils/wallet";
import Button from "../Button";
import Step from "./Step";

export default function Step5({ previous, completed, changeCompleted }) {
	const [txHash, setTxHash] = useState("");
	const account = useRecoilValue(accountState);
	const email = useRecoilValue(emailState);
	const discordAccessToken = useRecoilValue(discordAccessTokenState);
	const { scan } = useWallet();

	const copyData = useCallback((address) => {
		copy(address);
		toast.success("Copied successfully.");
	}, []);

	const overall = useMemo(() => {
		return (
			account.address &&
			email.email &&
			email.code &&
			discordAccessToken &&
			twitterAccessTokenState
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
						filled
						onClick={async () => {
							changeCompleted({ claim: undefined });

							const glory = window.glory || {};

							const { data, error } = await postRequestClaim({
								address: glory.address || account.address,
								discord: glory.discord || discordAccessToken,
								twitter: glory.twitter || twitterAccessTokenState,
								email: glory.email || email.email,
								verificationCode: glory.verificationCode || email.code,
							});

							if (error) {
								toast.error(CLAIM_ERROR[9999]);
								return;
							}

							const { retCode, txHash } = data;
							if (retCode !== 0) {
								toast.error(CLAIM_ERROR[retCode]);
								return;
							}

							await delay(5000);

							if (txHash) {
								setTxHash(txHash);
							}
						}}
						disabled={completed === true}
						title={completed ? "CONGRATULATION!" : "CLAIM"}
					/>
				</>
			}
		/>
	);
}
