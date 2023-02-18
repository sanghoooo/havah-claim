import { Confirm } from "../../utils/icons";
import { classBind } from "../../utils/util";
import Loader from "../Loader";

function Step({
	index,
	highlight,
	completed,
	title,
	titleCompleted,
	description,
	form,
	formCompleted,
	last,
	className,
	discord,
	twitter,
}) {
	return (
		<div
			className={classBind(
				className,
				"step",
				last && "last",
				highlight && "highlight",
				completed && "completed"
			)}
		>
			{!last && <div className="line"></div>}
			<div className="title">
				<div
					className="circle"
					style={{
						display: "inline-flex",
						alignContent: "center",
						justifyContent: "center",
					}}
				>
					<span
						style={{
							position: "relative",
							top: completed === false ? 1 : 0,
							lineHeight: 0,
						}}
					>
						{completed === false && index}
						{completed === undefined && <Loader discord={discord} twitter={twitter} />}
						{completed === true && <Confirm white />}
					</span>
				</div>
				{completed && titleCompleted ? titleCompleted : title}
			</div>
			<div className={classBind("form")}>
				<p>{description}</p>
				{form}
				{completed && formCompleted}
			</div>
		</div>
	);
}

export default Step;
