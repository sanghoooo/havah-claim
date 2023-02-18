import { useRecoilValue } from "recoil";
import { maintenanceState } from "../recoil/atom";
import { EXTERNAL } from "../utils/const";
import { Logo } from "../utils/icons";
import { LinkImg } from "./Links";
import "./Maintenance.scss";

function Maintenance() {
	const maintenance = useRecoilValue(maintenanceState);

	if (!maintenance) {
		return null;
	}

	return (
		<div className="Maintenance">
			<div className="box">
				<Logo white size={60} />
				<h2>{"Service under maintenance".toUpperCase()}</h2>
				<p>
					We'll let you know via{" "}
					<a href={EXTERNAL.Discord.href} target="_blank" rel="noreferrer">
						<LinkImg type={"Discord"} />
						<b>DISCORD</b>
					</a>{" "}
					when the maintenance is complete.
				</p>
			</div>
		</div>
	);
}

export default Maintenance;
