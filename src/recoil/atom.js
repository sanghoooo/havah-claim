import { recoilPersist } from "recoil-persist";
import { atom } from "recoil";

const { persistAtom } = recoilPersist({
	key: "HAVAH_CLAIM_STORAGE",
	storage: sessionStorage,
});

export const accountState = atom({
	key: "accountState",
	default: {},
	effects: [persistAtom],
});

export const congratulatedState = atom({
	key: "congratulatedState",
	default: false,
});

export const referralState = atom({
	key: "referralState",
	default: "",
});

export const completionTimeState = atom({
	key: "completionTimeState",
	default: "",
});

export const maintenanceState = atom({
	key: "maintenanceState",
	default: false,
});
