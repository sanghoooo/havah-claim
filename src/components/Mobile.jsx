import "./Mobile.scss";
import logo from "../assets/logo.svg";
import { Bad } from "../utils/icons";

function Mobile() {
	return (
		<div className="Mobile">
			<div className="backdrop">
				<div>
					<Bad white size={60} />
					<h3>
						HAVAH Event Reward Claim page restricts access to mobile devices.
						<br />
					</h3>
					<h4>
						Please access the web page with <u>PC</u>.
					</h4>
				</div>
				<img src={logo} alt="logo" />
			</div>
		</div>
	);
}

export default Mobile;
