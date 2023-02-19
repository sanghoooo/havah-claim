import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { FaDiscord } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { discordAccessTokenState } from "../../recoil/atom";
import { getUsersGuilds } from "../../utils/api";
import { DISCORD_LOGIN_LINK, EXTERNAL, HAVAH_GUILD_ID } from "../../utils/const";
import { NewLink } from "../../utils/icons";
import { delay } from "../../utils/util";
import Button from "../Button";
import Step from "./Step";

export default function Step2({ previous, completed, changeCompleted }) {
	const [discordAccessToken, setDiscordAccessToken] = useRecoilState(discordAccessTokenState);

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
						disabled={completed}
						onClick={async () => {
							changeCompleted({ discord: undefined });

							if (!discordAccessToken) {
								handleError("Please authorize again.");
								return;
							}

							const { data: guildData, error: guildError } = await getUsersGuilds(
								discordAccessToken
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
						title={
							<>
								<FaDiscord
									style={{
										fontSize: "1.2em",
										position: "relative",
										top: -1,
										marginRight: 5,
									}}
								/>
								{completed ? "JOINED" : "JOIN"}
							</>
						}
					/>
				</>
			}
		/>
	);
}
