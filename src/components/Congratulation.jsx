import { useRecoilState } from "recoil";
import { completionTimeState, congratulatedState, referralState } from "../recoil/atom";
import "./Congratulation.scss";
import logo from "../assets/logo.svg";
import moment from "moment";
import Button from "./Button";
import { useCallback, useMemo } from "react";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import Links from "./Links";
import { EXTERNAL } from "../utils/const";
import close_white from "../assets/close_white.svg";

function Congratulation() {
	const [congratulated, setCongratulated] = useRecoilState(congratulatedState);
	const [referral] = useRecoilState(referralState);
	const [completionTime] = useRecoilState(completionTimeState);

	const link = useMemo(() => `${window.location.origin}?referral=${referral}`, [referral]);
	const list = useMemo(() => {
		const result = {};
		Object.keys(EXTERNAL).forEach((key) => {
			if (EXTERNAL[key].social) {
				result[key] = { ...EXTERNAL[key] };
			}
		});
		return result;
	}, []);

	const copyLink = useCallback(() => {
		copy(link);
		toast.success("Copied successfully.");
	}, [link]);

	const close = useCallback(() => {
		setCongratulated(false);
	}, [setCongratulated]);

	if (!congratulated) return null;

	return (
		<div className="Congratulation" onClick={close}>
			<div className="box" onClick={(e) => e.stopPropagation()}>
				<div className="background"></div>
				<div className="top">
					<img className="logo" src={logo} alt="logo" />
					<img className="close" src={close_white} alt="logo" onClick={close} />
				</div>
				<h1>CONGRATULATION!</h1>
				<p className="text">
					Your participation for HAVAH Incentivized Testnet is complete.
					<br />
					The reward will be transferred to your HAVAH wallet registered.
					<br />
					<span>Completion Time: {moment.unix(completionTime).format("YYYY/MM/DD hh:mm [UTC]Z")}</span>
				</p>
				<div className="referral">
					<span>{link}</span>
					<Button mint filled title="Copy My Link" onClick={copyLink} />
				</div>
				<div className="join">
					<p>{"Join our community and invite your friends!".toUpperCase()}</p>
					<Links list={list} className="congratulation" />
				</div>
			</div>
		</div>
	);
}

export default Congratulation;
