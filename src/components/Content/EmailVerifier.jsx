import { useCallback, useEffect, useState } from "react";
import { checkEmail } from "../../utils/api";
import { ERROR_MESSAGE } from "../../utils/const";
import { getHash, validateEmail } from "../../utils/util";
import Button from "../Button";
import Input from "../Input";

function EmailVerifier({ connected, completed, loading, failure, success, setCubed }) {
	const [value, setValue] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		const hex = getHash(value);
		if (hex === "1007cfd2c2844a2f0dabdb539617bd12f52f367f37cb761dbad1e86773b7abd1") {
			setCubed(true);
		} else if (hex === "00dad3c481f548278b827795d1cb3c0dd1189bdb6837fb7ffa0475010d6d5c74") {
			setCubed(false);
		}
	}, [value, setCubed]);

	useEffect(() => {
		if (!connected) {
			setValue("");
		}
	}, [connected]);

	const verify = useCallback(
		async (value) => {
			if (!value) {
				setErrorMessage("Please enter your email address.");
				return;
			}

			if (!validateEmail(value)) {
				setErrorMessage("Please check your email address.");
				return;
			}

			loading();

			const { error } = await checkEmail(value);

			if (error) {
				failure();
				setErrorMessage(ERROR_MESSAGE[error]);
				return;
			}

			success(value);
		},
		[loading, failure, success]
	);

	return (
		<>
			<Input
				label="Email"
				value={value}
				disabled={completed}
				onChange={(e) => setValue(e.target.value)}
				error={errorMessage}
				resetError={() => setErrorMessage("")}
				onEnter={verify}
			/>
			<Button
				mint
				filled
				onClick={() => verify(value)}
				disabled={completed !== false}
				title={completed ? "VERIFIED" : "VERIFY"}
			/>
		</>
	);
}

export default EmailVerifier;
