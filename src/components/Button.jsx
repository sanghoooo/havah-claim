import { classBind } from "../utils/util";
import "./Button.scss";

function Button({
	twitter,
	discord,
	white,
	black,
	mint,
	small,
	lined,
	filled,
	title,
	onClick,
	className,
	disabled,
}) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={classBind(
				className,
				"Button",
				white && "white",
				black && "black",
				mint && "mint",
				small && "small",
				lined && "lined",
				filled && "filled",
				discord && "discord",
				twitter && "twitter"
			)}
		>
			{title}
		</button>
	);
}

export default Button;
