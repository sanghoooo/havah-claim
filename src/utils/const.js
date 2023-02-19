import medium from "../assets/medium.svg";
import logo_small from "../assets/logo_small.svg";
import mobile from "is-mobile";

export const IS_PRD = window.location.origin.includes("havah.io");
export const IS_DEV = !IS_PRD;
export const IS_LOCAL = ["localhost", "127.0.0.1"].some((host) =>
	window.location.origin.includes(host)
);

export const EMAIL_SERVER = IS_LOCAL
	? ""
	: IS_DEV
	? "https://dev-openapi.havah.io"
	: "https://openapi.havah.io";
export const X_CLIENT_ID = IS_DEV ? "dev" : "cL7m2onhGiDReOS0";
export const X_CLIENT_SECRET = IS_DEV ? "dev" : "74523893133904843467523313408055";
export const DISCORD_CLIENT_ID = "1075705706356936796";
export const DISCORD_CLIENT_SECRET = "Ug228F8e3p_HRVxM7xRXebibu0t6ip8s";
export const DISCORD_LOGIN_LINK = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${window.location.origin}&response_type=code&scope=identify%20guilds`;
export const TWITTER_CLIENT_ID = "ZDdOa0RjWlJYLWZQUHFHa0tCMmw6MTpjaQ";
export const TWITTER_CLIENT_SECRET = "7rcHOz5wZH41cUwgeZt0KNJeqbeECviRa3ZzrQRFkvgIcYjWYu";
export const HAVAH_GUILD_ID = "988047406266466366";
export const DISCORD_SERVER = "https://discord.gg/havahofficial";
export const HAVAH_FOLLOW_LINK =
	"https://twitter.com/intent/follow?original_referer=http%3A%2F%2Flocalhost%3A3000%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5EHAVAHofficial&screen_name=HAVAHofficial";

export const SCAN_HOST = IS_PRD ? `https://scan.havah.io` : `https://scan.vega.havah.io`;
export const SCAN_ADDRESS_LINK = `${SCAN_HOST}/address/`;
export const SCAN_TX_HASH_LINK = `${SCAN_HOST}/txn/`;

export const EMAIL_ERROR = {
	E001: "INVALID_EMAIL",
	E002: "INVALID_TOKEN",
	E003: "ALREADY_VERIFIED_EMAIL",
	E004: "WRONG_ACCESS",
};

export const CLAIM_ERROR = {
	[9999]: "Unknown error.",
	[1000]: "Already claimed to HAVAH wallet address.",
	[1001]: "No rewards found.",
	[1002]: "Too many errors. No more try allowed.",
	[2000]: "Already claimed to Discord ID",
	[2001]: "Discord ID not subscribe to HAVAH",
	[2002]: "Discord ID check error",
	[3000]: "Already claimed to Twitter ID",
	[3001]: "Twitter ID not following to HAVAH",
	[3002]: "Twitter ID check error",
	[4000]: "Wrong HAVAH account",
	[4001]: "Already claimed to HAVAH account",
	[4002]: "HAVAH email auth failure",
	[4003]: "HAVAH email check error",
};

export const INITIAL_CONTENTS_COMPLETED = {
	wallet: false,
	discord: false,
	twitter: false,
	email: false,
	claim: false,
};

export const EXTERNAL = {
	Intro: {
		href: "https://havah.io",
		src: logo_small,
		back: true,
		social: true,
	},
	Twitter: {
		href: "https://twitter.com/havahofficial",
		social: true,
	},
	Medium: {
		href: "https://medium.com/havahofficial",
		src: medium,
		social: true,
	},
	Discord: {
		href: "https://discord.com/invite/havahofficial",
		social: true,
	},
	Telegram: {
		href: "https://t.me/havahofficial",
		social: true,
	},
	Gitbook: {
		href: "https://docs.havah.io/havah/",
	},
};

//////////

export const INSTALL_LINK =
	"https://chrome.google.com/webstore/detail/havah-wallet/cnncmdhjacpkmjmkcafchppbnpnhdmon";
export const WEBSITE_LINK = "https://havah.io";
export const SIGN_UP_LINK = "https://havah.io/?PageName=signup";
export const MITTER_LINK = "https://mitter.vega.havah.io/bridge/nft";
export const COPYRIGHT = "Copyright © 2023 WEB3 SOLUTIONS PTE. LTD. All Rights Reserved.";
export const MINIMUM_BALANCE = 10;

export const IS_MOBILE = mobile();
export const IS_FIREBASEAPP = ["firebaseapp.com"].some((host) =>
	window.location.origin.includes(host)
);
export const IS_WEBAPP = ["web.app"].some((host) => window.location.origin.includes(host));

export const MOCK_ADDRESS = "hx13cef81ed4c1dc077ccabf9661aa44350cdabdd4";
export const MOCK_EMAIL = "sanghoo@me.com";
export const NFT_CONTRACT = "cx60b19bca4e222c6181f025c6eabb9d1e81909b83";
export const NFT_METHOD = "mint";
export const FAUCET_ADDRESS = "hx7a64ee31a357f808440a5b75b187983b3d4450c0";

export const MAINNET_NID = "0x100";
export const TESTNET_NID = "0x101";

export const ERROR_MESSAGE = {
	[-1]: "An error occured. Please try again.",
	[10]: "An error occured. Please try again.",
	[11]: "An error occured. Please try again.",
	[20]: "An error occured. Please try again.",
	[1]: "You have already participated in this event.",
	[2]: "This email is already in use. Please use another email.",
	[3]: "This email has not been registered at HAVAH.io",
	[4]: "No balance in the faucet.\nPlease try again later.",
};

export const NFT_METADATA_LIST = [
	{
		uri: "ipfs://bafkreifm6tdik3aac4ladibe6ev23d3ifmlhnci6mtueoghqv3ebvnz2te",
		image: "https://nftstorage.link/ipfs/bafkreibfiehrdmdr5nl2je27i3s672a3ie3fvekfkgmjb3ptflphvhwgry",
	},
	{
		uri: "ipfs://bafkreiacj42t6ux5vcxn3ewtmxxo5dj75ova5vgkn56o4hceiwnyucd26i",
		image: "https://nftstorage.link/ipfs/bafkreiabs4ehrd4rp4evj6fpjda7siq6tp3dw63edipfss75fvbay7apdm",
	},
	{
		uri: "ipfs://bafkreihiw33th5tciya4wwkbxm7ne46n6cnqcmnbzcllifq5sw3zrl7coa",
		image: "https://nftstorage.link/ipfs/bafkreibexjtpgkktthcatuy5hwh3n4txyikvqmv4du5rcsr6svf42rh7ii",
	},
	{
		uri: "ipfs://bafkreifixe5npp2u7nvjc6mcuvu3yrihlcfvf44cem5zplyecga5ata4i4",
		image: "https://nftstorage.link/ipfs/bafkreicfy4pd5ndefbr6f6qwktcrclqbr276mwtf6bjhfwjzpfog6s452i",
	},
];
