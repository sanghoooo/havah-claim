import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { emailState } from "../../recoil/atom";
import { postCheckToken, postSendToken } from "../../utils/api";
import { EMAIL_ERROR } from "../../utils/const";
import { validateEmail } from "../../utils/util";
import Button from "../Button";
import Input from "../Input";

function EmailVerifier({ completed, changeCompleted }) {
	const [emailValue, setEmailValue] = useState("");
	const [emailError, setEmailError] = useState("");
	const [sendSuccess, setSendSuccess] = useState(false);
	const [codeValue, setCodeValue] = useState("");
	const setEmail = useSetRecoilState(emailState);

	const sendCode = useCallback(
		async (value) => {
			if (!value) {
				setEmailError("Please enter your email address.");
				return;
			}

			if (!validateEmail(value)) {
				setEmailError("Please check your email address.");
				return;
			}

			changeCompleted({ email: undefined });

			const { data, error } = await postSendToken(value);

			if (error || data.sendMailStatus !== "SUCCESS") {
				changeCompleted({ email: false });
				toast.error(EMAIL_ERROR[error || "E998"]);
				return;
			}

			setSendSuccess(true);
			toast.success("Code sent successfully.");
		},
		[changeCompleted]
	);

	const checkCode = useCallback(
		async (email, code) => {
			// const { data, error } = await postCheckToken(email, code);

			// if (error || data.status !== "SUCCESS") {
			// 	changeCompleted({ email: false });
			// 	toast.error(EMAIL_ERROR[error || "E999"]);
			// 	return;
			// }

			// changeCompleted({ email: true });
			// toast.success("Code verified successfully.");
			// setEmail({
			// 	email,
			// 	code,
			// });

			changeCompleted({ email: true });
			setEmail({ email, code });
		},
		[changeCompleted]
	);

	const buttonTitle = useMemo(() => {
		if (!sendSuccess) {
			return "SEND CODE";
		} else {
			return "NEXT";
		}
	}, [completed, sendSuccess]);

	return (
		<>
			<Input
				style={{
					width: 400,
				}}
				label="Email"
				value={emailValue}
				disabled={sendSuccess || completed}
				onChange={(e) => setEmailValue(e.target.value)}
				error={emailError}
				resetError={() => setEmailError("")}
				onEnter={() => sendCode(emailValue)}
				resend={sendSuccess ? () => sendCode(emailValue) : undefined}
				resendDisabled={completed}
			/>
			{sendSuccess && (
				<Input
					style={{
						width: 260,
						marginLeft: 10,
					}}
					label="Code"
					value={codeValue}
					disabled={completed}
					onChange={(e) => setCodeValue(e.target.value)}
					onEnter={() => checkCode(emailValue, codeValue)}
				/>
			)}
			<Button
				mint
				filled
				disabled={completed}
				onClick={() => {
					if (sendSuccess) {
						checkCode(emailValue, codeValue);
					} else {
						sendCode(emailValue);
					}
				}}
				title={buttonTitle}
			/>
		</>
	);
}

export default EmailVerifier;
