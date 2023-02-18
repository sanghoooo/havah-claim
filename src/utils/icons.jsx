import download_white from "../assets/icons/download_white.svg";
import download_black from "../assets/icons/download_black.svg";
import download_mint from "../assets/icons/download_mint.svg";
import copy_white from "../assets/icons/copy_white.svg";
import copy_black from "../assets/icons/copy_black.svg";
import copy_mint from "../assets/icons/copy_mint.svg";
import new_link_white from "../assets/icons/new_link_white.svg";
import new_link_black from "../assets/icons/new_link_black.svg";
import new_link_mint from "../assets/icons/new_link_mint.svg";
import new_link_discord from "../assets/icons/new_link_discord.svg";
import new_link_twitter from "../assets/icons/new_link_twitter.svg";
import arrow_bottom_white from "../assets/icons/arrow_bottom_white.svg";
import arrow_bottom_black from "../assets/icons/arrow_bottom_black.svg";
import arrow_bottom_mint from "../assets/icons/arrow_bottom_mint.svg";
import confirm_check_white from "../assets/icons/confirm_check_white.svg";
import confirm_check_black from "../assets/icons/confirm_check_black.svg";
import confirm_check_mint from "../assets/icons/confirm_check_mint.svg";
import bad_white from "../assets/icons/bad_white.svg";
import bad_black from "../assets/icons/bad_black.svg";
import bad_mint from "../assets/icons/bad_mint.svg";
import logo_white from "../assets/icons/logo_white.svg";
import logo_black from "../assets/icons/logo_black.svg";
import logo_mint from "../assets/icons/logo_mint.svg";
import refresh_white from "../assets/icons/refresh_white.svg";
import refresh_black from "../assets/icons/refresh_black.svg";
import refresh_mint from "../assets/icons/refresh_mint.svg";
import { classBind } from "./util";

const src = {
	download_white,
	download_black,
	download_mint,
	copy_white,
	copy_black,
	copy_mint,
	new_link_white,
	new_link_black,
	new_link_mint,
	new_link_discord,
	new_link_twitter,
	arrow_bottom_white,
	arrow_bottom_black,
	arrow_bottom_mint,
	confirm_check_white,
	confirm_check_black,
	confirm_check_mint,
	bad_white,
	bad_black,
	bad_mint,
	logo_white,
	logo_black,
	logo_mint,
	refresh_black,
	refresh_white,
	refresh_mint,
};

const Icon = ({
	className,
	name,
	black,
	white,
	mint,
	discord,
	twitter,
	size = 40,
	css,
	onClick = () => {},
}) => {
	const style = { width: size, height: size, ...css };
	if (black)
		return (
			<img
				className={classBind(className, "black")}
				src={src[`${name}_black`]}
				style={style}
				onClick={onClick}
				alt={name}
			/>
		);
	if (white)
		return (
			<img
				className={classBind(className, "white")}
				src={src[`${name}_white`]}
				style={style}
				onClick={onClick}
				alt={name}
			/>
		);
	if (mint)
		return (
			<img
				className={classBind(className, "mint")}
				src={src[`${name}_mint`]}
				style={style}
				onClick={onClick}
				alt={name}
			/>
		);
	if (discord)
		return (
			<img
				className={classBind(className, "discord")}
				src={src[`${name}_discord`]}
				style={style}
				onClick={onClick}
				alt={name}
			/>
		);
	if (twitter)
		return (
			<img
				className={classBind(className, "twitter")}
				src={src[`${name}_twitter`]}
				style={style}
				onClick={onClick}
				alt={name}
			/>
		);
	return null;
};

export const Download = (props) => {
	return Icon({ name: "download", ...props });
};

export const Copy = (props) => {
	return Icon({ name: "copy", ...props });
};

export const NewLink = (props) => {
	return Icon({ name: "new_link", ...props });
};

export const ArrowBottom = (props) => {
	return Icon({ name: "arrow_bottom", ...props });
};

export const Confirm = (props) => {
	return Icon({ name: "confirm_check", ...props });
};

export const Bad = (props) => {
	return Icon({ name: "bad", ...props });
};

export const Logo = (props) => {
	return Icon({ name: "logo", ...props });
};

export const Refresh = (props) => {
	return Icon({ name: "refresh", ...props });
};
