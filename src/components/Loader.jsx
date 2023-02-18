import { classBind } from "../utils/util";
import "./Loader.scss";

function Loader({ black, discord, twitter }) {
	return (
		<div
			className={classBind(
				"lds-dual-ring",
				black && "black",
				discord && "discord",
				twitter && "twitter"
			)}
		/>
	);
}

export default Loader;
