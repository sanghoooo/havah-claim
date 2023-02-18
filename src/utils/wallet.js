import { useCallback, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { accountState } from "../recoil/atom";
import { INSTALL_LINK, SCAN_ADDRESS_LINK, SCAN_TX_HASH_LINK } from "./const";
import IconService from "icon-sdk-js";
import toast from "react-hot-toast";

const HttpProvider = IconService.HttpProvider;
const IconAmount = IconService.IconAmount;
const IconValidator = IconService.IconValidator;
const IconConverter = IconService.IconConverter;
const httpProvider = new HttpProvider("https://ctz.vega.havah.io/api/v3");
const iconService = new IconService(httpProvider);

export async function getBalance(address) {
	try {
		const balance = await iconService.getBalance(address).execute();
		const converted = IconAmount.of(balance, IconAmount.Unit.LOOP).convertUnit(
			IconAmount.Unit.ICX
		);
		return IconConverter.toNumber(converted);
	} catch (e) {
		return 0;
	}
}

export async function sendTransaction(data) {
	try {
		const result = await window.havah.sendTransaction(data);
		return result;
	} catch (e) {
		return { type: "error" };
	}
}

export async function connectWallet() {
	return {
		address: "hx13cef81ed4c1dc077ccabf9661aa44350cdabdd4",
	};

	try {
		const { ok, body, address } = await window.havah.connect();
		if (address) {
			return { address }; // 1.0.0
		} else if (ok) {
			return body || {}; // 2.0.0
		} else {
			throw Error();
		}
	} catch (e) {
		return { error: true };
	}
}

export function useWallet() {
	const setAccount = useSetRecoilState(accountState);
	const previous = useRef({});
	const connected = useRef(false);

	const install = useCallback(async () => {
		if (window.confirm("You do not have HAVAH Wallet installed.\nPlease confirm to install.")) {
			window.open(INSTALL_LINK);
		}
	}, []);

	const disconnect = useCallback(
		async (notification) => {
			setAccount({});
			previous.current = {};
			if (notification) {
				toast.success("Disconnected.");
			}
		},
		[setAccount]
	);

	const handleChanged = useCallback(() => {
		if (!connected.current) {
			connected.current = true;
			window.havah.on("accountsChanged", (changed) => {
				if (!previous.current.address) {
					return;
				}

				if (!changed.address) {
					alert(
						"The wallet has been locked.\nIt will be diconnected and all processes will be initialized."
					);
					disconnect(false);
					return;
				}

				if (previous.current.address !== changed.address) {
					alert(
						"The wallet has been change.\nIt will be diconnected and all processes will be initialized."
					);
					disconnect(false);
				} else {
					setAccount(changed);
					previous.current = changed;
				}
			});
		}
	}, [setAccount, disconnect]);

	const connect = useCallback(
		async (success, failure) => {
			// if (!window.havah) {
			// 	install();
			// 	failure && failure();
			// 	return;
			// }

			const account = await connectWallet();

			if (account.error) {
				failure && failure();
				!failure && toast.error("Connection failed.");
				return;
			}

			setAccount(account);
			previous.current = account;
			success && success(account.address);
			!success && toast.success("Connected.");

			handleChanged();
		},
		[setAccount]
	);

	const scan = useCallback(async (data) => {
		if (IconValidator.isAddress(data)) {
			window.open(`${SCAN_ADDRESS_LINK}${data}`);
		} else if (IconValidator.isValidHash(data)) {
			window.open(`${SCAN_TX_HASH_LINK}${data}`);
		}
	}, []);

	return {
		install,
		connect,
		disconnect,
		scan,
	};
}
