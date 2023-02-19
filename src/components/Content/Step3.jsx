import { auth } from "twitter-api-sdk";
import { HAVAH_FOLLOW_LINK, TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET } from "../../utils/const";
import { NewLink } from "../../utils/icons";
import Button from "../Button";
import Step from "./Step";
import { FaTwitter } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { twitterAccessTokenState } from "../../recoil/atom";
import { toast } from "react-hot-toast";

export default function Step3({ previous, completed, changeCompleted }) {
	const twitterAccessToken = useRecoilValue(twitterAccessTokenState);

	return (
		<Step
			index="3"
			twitter
			className="twitter"
			highlight={previous && !completed}
			completed={completed}
			title="Follow Twitter"
			description={<>After authorizing, follow the HAVAH official account.</>}
			form={
				<>
					<Button
						lined
						twitter
						disabled={completed}
						onClick={async () => {
							const authClient = new auth.OAuth2User({
								client_id: TWITTER_CLIENT_ID,
								client_secret: TWITTER_CLIENT_SECRET,
								callback: window.location.origin,
								scopes: ["tweet.read", "users.read", "offline.access"],
							});

							const authUrl = authClient.generateAuthURL({
								state: "state",
								code_challenge_method: "plain",
								code_challenge: "test",
							});

							window.open(authUrl);
						}}
						title={
							<>
								AUTHORIZE
								<NewLink twitter />
							</>
						}
					/>
					<Button
						filled
						twitter
						disabled={completed}
						onClick={async () => {
							if (!twitterAccessToken) {
								toast.error("Please authorize again.");
								return;
							}

							changeCompleted({ twitter: true });
							window.open(HAVAH_FOLLOW_LINK);
						}}
						title={
							<>
								<FaTwitter
									style={{
										fontSize: "1.1em",
										position: "relative",
										top: -1,
										marginRight: 5,
									}}
								/>
								FOLLOW
							</>
						}
					/>
				</>
			}
		/>
	);
}
