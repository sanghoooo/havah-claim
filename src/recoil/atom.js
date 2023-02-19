import { recoilPersist } from "recoil-persist";
import { atom } from "recoil";
import { INITIAL_CONTENTS_COMPLETED } from "../utils/const";

const { persistAtom } = recoilPersist({
	key: "HAVAH_CLAIM_STORAGE",
	storage: sessionStorage,
});

export const completedState = atom({
	key: "completedState",
	default: INITIAL_CONTENTS_COMPLETED,
	effects: [persistAtom],
});

export const accountState = atom({
	key: "accountState",
	default: {},
	effects: [persistAtom],
});

export const discordAccessTokenState = atom({
	key: "discordAccessTokenState",
	default: "",
	effects: [persistAtom],
});

export const twitterAccessTokenState = atom({
	key: "twitterAccessTokenState",
	default: "",
	effects: [persistAtom],
});

export const emailState = atom({
	key: "emailState",
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
