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
}) {
	return (
		<div
			className={classBind(
				"step",
				last && "last",
				highlight && "highlight",
				completed && "completed"
			)}
		>
			{!last && <div className="line"></div>}
			<div className="title">
				<div className="circle">
					{completed === false && index}
					{completed === undefined && <Loader />}
					{completed === true && <Confirm white />}
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
