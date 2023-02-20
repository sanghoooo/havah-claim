import { useRecoilState, useSetRecoilState } from "recoil";
import { claimErrorState, retryState } from "../recoil/atom";
import "./ClaimError.scss";
import { useCallback } from "react";
import close_white from "../assets/close_white.svg";
import Button from "./Button";
import { v4 as uuidv4 } from "uuid";
import { Bad } from "../utils/icons";

function ClaimError() {
	const [claimError, setClaimError] = useRecoilState(claimErrorState);
	const setRetry = useSetRecoilState(retryState);

	const close = useCallback(() => {
		setClaimError(false);
	}, [setClaimError]);

	if (!claimError) return null;

	return (
		<div className="ClaimError" onClick={close}>
			<div className="box" onClick={(e) => e.stopPropagation()}>
				<div className="top">
					<Bad mint size={20} />
					<img className="close" src={close_white} alt="logo" onClick={close} />
				</div>
				<p className="text">{claimError}</p>
				<div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 25 }}>
					<Button small mint lined title="CANCEL" onClick={close} />
					<Button
						small
						mint
						filled
						title="DISCONNECT & RETRY from the first"
						onClick={() => {
							close();
							setRetry(uuidv4());
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default ClaimError;
