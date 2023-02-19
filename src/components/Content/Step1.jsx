import copy from "copy-to-clipboard";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { accountState } from "../../recoil/atom";
import { Copy, NewLink } from "../../utils/icons";
import { ellipsisHash } from "../../utils/util";
import { useWallet } from "../../utils/wallet";
import Button from "../Button";
import Step from "./Step";

export default function Step1({ completed, changeCompleted }) {
	const account = useRecoilValue(accountState);
	const { connect, scan } = useWallet();

	const check = useCallback(async () => {
		const success = async () => {
			changeCompleted({ wallet: true });
			toast.success("Connected successfully.");
		};

		const failure = () => {
			changeCompleted({ wallet: false });
			toast.error("Connection failed.");
		};

		await connect(success, failure);
	}, [changeCompleted]);

	const copyData = useCallback((address) => {
		copy(address);
		toast.success("Copied successfully.");
	}, []);

	return (
		<Step
			index="1"
			highlight={!completed}
			completed={completed}
			title="Connect Wallet"
			titleCompleted={
				<>
					{ellipsisHash(account.address)}
					<NewLink white size="1.02em" onClick={() => scan(account.address)} />
					<Copy white size="1.1em" onClick={() => copyData(account.address)} />
				</>
			}
			description={
				<>Connect the HAVAH Wallet you used to participate in the airdrop event.</>
			}
			form={
				<>
					<Button
						mint
						filled
						onClick={check}
						disabled={completed === true}
						title={completed ? "CONNECTED" : "CONNECT"}
					/>
				</>
			}
		/>
	);
}
