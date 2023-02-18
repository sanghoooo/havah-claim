import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { auth, Client } from "twitter-api-sdk";
import { NewLink } from "../../utils/icons";
import { delay } from "../../utils/util";
import Button from "../Button";
import Step from "./Step";

export default function Step3({ previous, completed, changeCompleted }) {
	const handleError = useCallback(
		(message) => {
			toast.error(message);
			changeCompleted({ twitter: false });
		},
		[changeCompleted]
	);

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
								client_id: "ZDdOa0RjWlJYLWZQUHFHa0tCMmw6MTpjaQ",
								client_secret: "7rcHOz5wZH41cUwgeZt0KNJeqbeECviRa3ZzrQRFkvgIcYjWYu",
								callback: "http://localhost:3000",
								scopes: ["tweet.read", "users.read", "offline.access"],
							});

							const authUrl = authClient.generateAuthURL({
								state: "state",
								code_challenge_method: "plain",
								code_challenge: "test", // 수정 필요
							});

							window.open(authUrl);

							// const aa = await authClient.requestAccessToken(
							// 	"UlJXRFJCRXppNFRsWFJwUzdRaFdGWTNTOG80QkVQYWFsM3o0NWh2WEJLaW5GOjE2NzY3MjEwNDg5ODg6MToxOmFjOjE"
							// );

							// console.log(aa);

							// const client = new Client(authClient);

							// const response = await client.users.findUserByUsername("elonmusk");
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
						onClick={async () => {
							changeCompleted({ twitter: undefined });
							await delay(1000);
							changeCompleted({ twitter: true });
						}}
						disabled={completed}
						title={completed ? "FOLLOWED" : "FOLLOW"}
					/>
				</>
			}
		/>
	);
}
