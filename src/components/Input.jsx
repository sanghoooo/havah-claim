import { useCallback } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Refresh } from "../utils/icons";
import { classBind, delay } from "../utils/util";
import "./Input.scss";

function Input({
	style,
	label,
	value,
	onChange,
	onEnter,
	disabled,
	error,
	resetError,
	resend,
	resendDisabled,
}) {
	const inputRef = useRef();
	const [focused, setFocused] = useState(!!value);
	const [errorMessage, setErrorMessage] = useState("");

	const focus = useCallback(async () => {
		if (!focused) {
			setFocused(true);
			await delay(200);
			inputRef.current.focus();
		}
	}, [focused]);

	const blur = useCallback(() => {
		if (focused && !value) {
			setFocused(false);
		}
	}, [focused, value]);

	useEffect(() => {
		if (error) {
			setErrorMessage(error);
		}
	}, [error]);

	const handleChange = useCallback(
		(e) => {
			if (errorMessage) {
				setErrorMessage();
				resetError();
			}

			onChange(e);
		},
		[onChange, errorMessage]
	);

	return (
		<div
			style={{ ...style }}
			className={classBind(
				"Input",
				focused && "focused",
				disabled && "disabled",
				errorMessage && "error"
			)}
		>
			<div className="decorator" onClick={focus}>
				<div className="border left"></div>
				<div className="border bottom">
					<div className="label">{label}</div>
				</div>
				<div className="border right"></div>
			</div>
			<input
				ref={inputRef}
				className={classBind(!focused && "invisible")}
				value={value}
				disabled={disabled}
				onChange={handleChange}
				onBlur={blur}
				style={{
					paddingRight: resend ? 60 : 0,
				}}
				onKeyPress={(e) => {
					if (e.key === "Enter" && onEnter) {
						e.preventDefault();
						onEnter(value);
					}
				}}
			/>
			{resend && (
				<Refresh
					className="refresh"
					onClick={resend}
					mint
					size={30}
					css={{
						position: "absolute",
						right: 15,
						top: 15,
						pointerEvents: resendDisabled ? "none" : "unset",
					}}
				/>
			)}
			{errorMessage && <p>{errorMessage}</p>}
		</div>
	);
}

export default Input;
