import { EXTERNAL } from "../utils/const";
import { Logo } from "../utils/icons";
import Cube from "./Cube";
import { LinkImg } from "./Links";
import "./Maintenance.scss";
import nft_example from "../assets/nft_example.webp";
import { useState } from "react";

function Ended() {
	const [cubed, setCubed] = useState(false);

	return (
		<div className="Maintenance">
			<div className="box">
				{cubed ? (
					<Cube src={nft_example} className="small" onClick={() => setCubed(false)} />
				) : (
					<Logo white size={60} onClick={() => setCubed(true)} />
				)}
				<h2>{"The Event was over.".toUpperCase()}</h2>
				<p>
					Thank you for participating in the HAVAH incentivized Testnet.
					<br />
					Come to{" "}
					<a href={EXTERNAL.Discord.href} target="_blank" rel="noreferrer">
						<LinkImg type={"Discord"} />
						<b>DISCORD</b>
					</a>{" "}
					for more information.
				</p>
			</div>
		</div>
	);
}

export default Ended;
