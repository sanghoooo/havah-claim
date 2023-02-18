import { classBind } from "../utils/util";
import "./Links.scss";

export const LinkImg = ({ src, type }) => {
	return (
		<img
			src={src || `https://content1.havah.io/image/svg/icon${type}.svg?auto=format&amp;fit=max&amp;w=64`}
			alt={type}
		/>
	);
};

const Link = ({ type, href, src, back }) => {
	return (
		<a href={href} target="_blank" rel="noreferrer" aria-label={type} className={classBind(back && "back")}>
			<LinkImg src={src} type={type} />
		</a>
	);
};

function Links({ list, className }) {
	return (
		<div className={classBind("Links", className)}>
			{Object.keys(list).map((key) => {
				const item = list[key];
				return <Link key={key} type={key} href={item.href} src={item.src} back={item.back} />;
			})}
		</div>
	);
}

export default Links;
