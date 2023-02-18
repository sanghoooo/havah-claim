import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState, useSetRecoilState } from "recoil";
import { discordCodeState, discordAccessTokenState } from "../../recoil/atom";
import { getDiscordOauthToken, getUsersGuilds } from "../../utils/api";
import { DISCORD_LOGIN_LINK, EXTERNAL, HAVAH_GUILD_ID } from "../../utils/const";
import { NewLink } from "../../utils/icons";
import { delay } from "../../utils/util";
import Button from "../Button";
import Step from "./Step";

export default function Step2({ previous, completed, changeCompleted }) {
	const [discordCode, setDiscordCode] = useRecoilState(discordCodeState);
	const setDiscordAccessToken = useSetRecoilState(discordAccessTokenState);

	const handleError = useCallback(
		(message) => {
			toast.error(message);
			changeCompleted({ discord: false });
		},
		[changeCompleted]
	);

	return (
		<Step
			index="2"
			discord
			className="discord"
			highlight={previous && !completed}
			completed={completed}
			title="Join Discord"
			description={<>After authorizing, join the HAVAH official server.</>}
			form={
				<>
					<Button
						lined
						discord
						disabled={completed}
						onClick={() => {
							window.open(DISCORD_LOGIN_LINK);
						}}
						title={
							<>
								AUTHORIZE
								<NewLink discord />
							</>
						}
					/>
					<Button
						filled
						discord
						disabled={!discordCode || completed}
						onClick={async () => {
							changeCompleted({ discord: undefined });

							const { data, error } = await getDiscordOauthToken(discordCode);
							if (error) {
								handleError("Code expired. Please authorize again.");
								return;
							}

							const { access_token } = data;
							const { data: guildData, error: guildError } = await getUsersGuilds(
								access_token
							);

							if (guildError) {
								handleError("An error occured. Please try again.");
								return;
							}

							const included = guildData
								.map((guild) => guild.id)
								.includes(HAVAH_GUILD_ID);
							if (!included) {
								toast.error("After join the server, try again.");
								changeCompleted({ discord: false });
								setDiscordCode("");

								await delay(3000);
								window.open(EXTERNAL.Discord.href);
							} else {
								toast.success("Verified joining the server.");
								changeCompleted({ discord: true });
								setDiscordAccessToken(access_token);
							}
						}}
						title={completed ? "JOINED" : "JOIN"}
					/>
				</>
			}
		/>
	);
}
