import { classBind } from "../utils/util";
import "./Cube.scss";
import { Logo } from "../utils/icons";
import { forwardRef } from "react";

const Cube = forwardRef(({ src, className, onClick }, ref) => {
	return (
		<div ref={ref} className={classBind("Cube", className)} onClick={onClick}>
			<div className={classBind("box")}>
				<div style={{ background: `url(${src})` }} className="cube__face cube__face--front">
					<b>임영광</b>
				</div>
				<div style={{ background: `url(${src})` }} className="cube__face cube__face--back">
					GLORY
				</div>
				<div style={{ background: `url(${src})` }} className="cube__face cube__face--right">
					<Logo mint size={className === "small" ? 40 : 300} />
				</div>
				<div style={{ background: `url(${src})` }} className="cube__face cube__face--left">
					HAVAH
				</div>
				<div style={{ background: `url(${src})` }} className="cube__face cube__face--top">
					HVH
				</div>
				<div
					style={{ background: `url(${src})` }}
					className="cube__face cube__face--bottom"
				>
					하바
				</div>
			</div>
		</div>
	);
});

export default Cube;
