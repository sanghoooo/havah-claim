import "./index.scss";
import Button from "../Button";
import { ArrowBottom, NewLink } from "../../utils/icons";
import { useCallback, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { accountState, discordCodeState } from "../../recoil/atom";
import { INITIAL_CONTENTS_COMPLETED, WEBSITE_LINK } from "../../utils/const";
import { useEffect } from "react";
import queryString from "query-string";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

function Content() {
	const [completed, setCompleted] = useState(INITIAL_CONTENTS_COMPLETED);
	const scrollRef = useRef();
	const codeRef = useRef();
	const account = useRecoilValue(accountState);
	const setDiscordCode = useSetRecoilState(discordCodeState);

	const changeCompleted = useCallback(
		(changed) => {
			setCompleted({
				...completed,
				...changed,
			});
		},
		[completed]
	);

	const goHavah = useCallback(() => {
		window.open(WEBSITE_LINK);
	}, []);

	const goScrollRef = useCallback(() => {
		scrollRef.current.scrollIntoView({ behavior: "smooth" });
	}, []);

	useEffect(() => {
		const { address } = account;

		if (address) {
			const { search } = window.location;
			const parsed = queryString.parse(search);

			changeCompleted({
				...INITIAL_CONTENTS_COMPLETED,
				wallet: true,
			});

			if (parsed.code && codeRef.current) {
				setDiscordCode(parsed.code);
				codeRef.current.scrollIntoView({ behavior: "smooth" });
			}
		} else {
			changeCompleted({ wallet: false });
		}
	}, [account]);

	return (
		<div className="Content">
			<section className="introduction">
				<div className="background"></div>
				<div className="background reflection"></div>
				<h1>
					<span>HAVAH</span>
					Claim HAVAH Airdrop
				</h1>
				<p>
					Join the official Discord server and follow the official Twitter account.
					<br />
					Claim airdrop using HAVAH.io account.
				</p>
				<Button white filled onClick={goScrollRef} title="LET'S CLAIM" />
				<Button
					white
					lined
					onClick={goHavah}
					title={
						<>
							<span>HAVAH.io</span>
							<NewLink white />
						</>
					}
				/>
				<ArrowBottom white onClick={goScrollRef} />
			</section>
			<section className="progress">
				<div className="background"></div>
				<div ref={scrollRef} className="scroll_position"></div>
				<h2>STEPS</h2>
				<Step1 completed={completed.wallet} changeCompleted={changeCompleted} />
				<div ref={codeRef} style={{ position: "relative", top: -100 }} />
				<Step2
					previous={completed.wallet}
					completed={completed.discord}
					changeCompleted={changeCompleted}
				/>
				<Step3
					previous={completed.discord}
					completed={completed.twitter}
					changeCompleted={changeCompleted}
				/>
				<Step4
					previous={completed.twitter}
					completed={completed.email}
					changeCompleted={changeCompleted}
				/>
				<Step5
					previous={completed.email}
					completed={completed.claim}
					changeCompleted={changeCompleted}
				/>
			</section>
		</div>
	);
}

export default Content;
