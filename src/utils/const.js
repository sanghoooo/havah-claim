import medium from "../assets/medium.svg";
import logo_small from "../assets/logo_small.svg";
import mobile from "is-mobile";

export const IS_DEV = !window.location.origin.includes("havah.io");
export const IS_LOCAL = ["localhost", "127.0.0.1"].some((host) =>
	window.location.origin.includes(host)
);

export const EMAIL_SERVER = IS_DEV ? "https://dev-openapi.havah.io" : "https://openapi.havah.io";
export const X_CLIENT_ID = IS_DEV ? "dev" : "";
export const X_CLIENT_SECRET = IS_DEV ? "dev" : "";

export const DISCORD_CLIENT_ID = "1075705706356936796";
export const DISCORD_CLIENT_SECRET = "Ug228F8e3p_HRVxM7xRXebibu0t6ip8s";
export const DISCORD_LOGIN_LINK = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${window.location.origin}&response_type=code&scope=identify%20guilds`;
export const HAVAH_GUILD_ID = "988047406266466366";

export const DISCORD_SERVER = "https://discord.gg/havahofficial";

export const EMAIL_ERROR = {
	E001: "INVALID_EMAIL",
	E002: "INVALID_TOKEN",
	E003: "ALREADY_VERIFIED_EMAIL",
	E004: "WRONG_ACCESS",
};

export const INITIAL_CONTENTS_COMPLETED = {
	wallet: false,
	discord: false,
	twitter: false,
	email: false,
	claim: false,
};

//////////

export const INSTALL_LINK =
	"https://chrome.google.com/webstore/detail/havah-wallet/cnncmdhjacpkmjmkcafchppbnpnhdmon";
export const WEBSITE_LINK = "https://havah.io";
export const SCAN_ADDRESS_LINK = "https://scan.vega.havah.io/address/";
export const SCAN_TX_HASH_LINK = "https://scan.vega.havah.io/txn/";
export const SIGN_UP_LINK = "https://havah.io/?PageName=signup";
export const MITTER_LINK = "https://mitter.vega.havah.io/bridge/nft";
export const COPYRIGHT = "Copyright © 2022 WEB3 SOLUTIONS PTE. LTD. All Rights Reserved.";
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

export const EXTERNAL = {
	Intro: {
		href: "https://intro.havah.io",
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
