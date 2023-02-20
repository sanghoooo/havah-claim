import { useRecoilState } from "recoil";
import { congratulatedState } from "../recoil/atom";
import "./Congratulation.scss";
import logo from "../assets/logo.svg";
import Button from "./Button";
import { useCallback } from "react";
import close_white from "../assets/close_white.svg";
import { useWallet } from "../utils/wallet";

function Congratulation() {
	const [congratulated, setCongratulated] = useRecoilState(congratulatedState);
	const { scan } = useWallet();

	const close = useCallback(() => {
		setCongratulated("");
	}, [setCongratulated]);

	if (!congratulated) return null;

	return (
		<div className="Congratulation" onClick={close}>
			<div
				className="box"
				onClick={(e) => e.stopPropagation()}
				style={{
					width: 450,
				}}
			>
				<div className="background"></div>
				<div className="top">
					<img className="logo" src={logo} alt="logo" />
					<img className="close" src={close_white} alt="logo" onClick={close} />
				</div>
				<h1 style={{ textAlign: "center", fontSize: 40, lineHeight: 1, marginLeft: 0 }}>
					CONGRATULATION!
				</h1>
				<p
					className="text"
					style={{
						textAlign: "center",
					}}
				>
					Claimed HAVAH Event Reward successfully.
					<br />
				</p>
				<div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 25 }}>
					<Button small mint lined title="CONFIRM" onClick={close} />
					<Button
						small
						mint
						filled
						title="SCAN TxHash"
						onClick={() => {
							scan(congratulated);
							close();
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default Congratulation;
