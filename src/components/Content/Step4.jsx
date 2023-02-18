import EmailVerifier from "./EmailVerifier";
import Step from "./Step";

export default function Step4({ previous, completed, changeCompleted }) {
	return (
		<Step
			index="4"
			highlight={previous && !completed}
			completed={completed}
			title="Verify Email"
			description={<>Verify email registered on HAVAH.io</>}
			form={<EmailVerifier completed={completed} changeCompleted={changeCompleted} />}
		/>
	);
}
