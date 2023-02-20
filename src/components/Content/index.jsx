import "./index.scss";
import Button from "../Button";
import { ArrowBottom, NewLink } from "../../utils/icons";
import { useCallback, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
	accountState,
	completedState,
	discordAccessTokenState,
	retryState,
	twitterAccessTokenState,
} from "../../recoil/atom";
import { INITIAL_CONTENTS_COMPLETED, WEBSITE_LINK } from "../../utils/const";
import { useEffect } from "react";
import queryString from "query-string";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import { getDiscordOauthToken, getTwitterOauthToken } from "../../utils/api";
import { toast } from "react-hot-toast";
import _ from "lodash";

function Content() {
	const [completed, setCompleted] = useRecoilState(completedState);
	const scrollRef = useRef();
	const discordRef = useRef();
	const twitterRef = useRef();
	const account = useRecoilValue(accountState);
	const setDiscordAccessToken = useSetRecoilState(discordAccessTokenState);
	const setTwitterAccessToken = useSetRecoilState(twitterAccessTokenState);
	const retry = useRecoilValue(retryState);

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

	const checkDiscordAccessToken = useCallback(async (code) => {
		window.history.replaceState({}, "", "/");
		discordRef.current.scrollIntoView({ behavior: "smooth" });

		const { data, error } = await getDiscordOauthToken(code);
		if (error || !data.access_token) {
			toast.error("Failed to authorize with Discord.");
			return;
		}

		toast.success("Discord authorized.");
		setDiscordAccessToken(data.access_token);
	}, []);

	const checkTwitterAccessToken = useCallback(async (code) => {
		window.history.replaceState({}, "", "/");
		twitterRef.current.scrollIntoView({ behavior: "smooth" });

		const { data, error } = await getTwitterOauthToken(code);

		if (error || !(data.result && data.result.accessToken)) {
			toast.error("Failed to authorize with Twitter.");
			return;
		}

		toast.success("Twitter authorized.");
		setTwitterAccessToken(data.result.accessToken);
	}, []);

	const refreshCompleted = useCallback(() => {
		const copied = _.cloneDeep(completed);
		Object.keys(INITIAL_CONTENTS_COMPLETED).forEach((key) => {
			copied[key] = copied[key] === undefined ? false : copied[key];
		});

		changeCompleted(copied);
	}, [changeCompleted]);

	useEffect(() => {
		if (account.address) {
			const { search } = window.location;
			const parsed = queryString.parse(search);
			if (parsed.state && parsed.code && twitterRef) {
				checkTwitterAccessToken(parsed.code);
			} else if (parsed.code && discordRef.current) {
				checkDiscordAccessToken(parsed.code);
			}

			if (completed.claim) {
				changeCompleted(INITIAL_CONTENTS_COMPLETED);
			}

			refreshCompleted();
		} else {
			changeCompleted(INITIAL_CONTENTS_COMPLETED);
		}
	}, [account.address]);

	useEffect(() => {
		if (retry) {
			changeCompleted(INITIAL_CONTENTS_COMPLETED);
			scrollRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [retry]);

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
				<div ref={discordRef} style={{ position: "relative", top: -100 }} />
				<Step2
					previous={completed.wallet}
					completed={completed.discord}
					changeCompleted={changeCompleted}
				/>
				<div ref={twitterRef} style={{ position: "relative", top: -100 }} />
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
					goScrollRef={goScrollRef}
				/>
			</section>
		</div>
	);
}

export default Content;
