import copy from "copy-to-clipboard";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { accountState, discordAccessTokenState, emailState } from "../../recoil/atom";
import { postRequestClaim } from "../../utils/api";
import { DISCORD_SERVER } from "../../utils/const";
import { Copy, NewLink } from "../../utils/icons";
import { ellipsisHash } from "../../utils/util";
import { useWallet } from "../../utils/wallet";
import Button from "../Button";
import Step from "./Step";

export default function Step5({ previous, completed, changeCompleted }) {
	const account = useRecoilValue(accountState);
	const email = useRecoilValue(emailState);
	const discordAccessToken = useRecoilValue(discordAccessTokenState);
	const { scan } = useWallet();

	const copyData = useCallback((address) => {
		copy(address);
		toast.success("Copied successfully.");
	}, []);

	const overall = useMemo(() => {
		return account.address && email.email && email.code && discordAccessToken;
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
					{ellipsisHash(account.address)}
					<NewLink white size="1.02em" onClick={() => scan(account.address)} />
					<Copy white size="1.1em" onClick={() => copyData(account.address)} />
				</>
			}
			description={<>Claim HAVAH using the informations below.</>}
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

							await postRequestClaim({
								address: account.address,
								discord: discordAccessToken,
								twitter: "test",
								email: email.email,
								verificationCode: email.code,
							});
						}}
						disabled={completed === true}
						title={completed ? "CONGRATULATION!" : "CLAIM"}
					/>
				</>
			}
		/>
	);
}
