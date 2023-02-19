import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, X_CLIENT_ID, X_CLIENT_SECRET } from "./const";
import axios from "axios";
import queryString from "query-string";

export const getDiscordOauthToken = async (code) => {
	try {
		const url = `https://discord.com/api/oauth2/token`;
		const { data } = await axios({
			url,
			method: "POST",
			headers: { "content-type": "application/x-www-form-urlencoded" },
			data: queryString.stringify({
				code,
				client_id: DISCORD_CLIENT_ID,
				client_secret: DISCORD_CLIENT_SECRET,
				grant_type: "authorization_code",
				redirect_uri: window.location.origin,
			}),
		});

		return {
			data,
		};
	} catch (e) {
		console.error(e);
		return {
			error: true,
		};
	}
};

export const getUsersGuilds = async (accessToken) => {
	try {
		const url = `https://discord.com/api/v9/users/@me/guilds`;
		const { data } = await axios({
			url,
			method: "GET",
			headers: { Authorization: `Bearer ${accessToken}` },
		});

		return {
			data,
		};
	} catch (e) {
		console.error(e);
		return {
			error: true,
		};
	}
};

export const getUserMe = async (accessToken) => {
	try {
		const url = `https://discord.com/api/v9/users/@me`;
		const { data } = await axios({
			url,
			method: "GET",
			headers: { Authorization: `Bearer ${accessToken}` },
		});

		return {
			data,
		};
	} catch (e) {
		console.error(e);
		return {
			error: true,
		};
	}
};

export const postSendToken = async (email) => {
	try {
		const { data } = await axios.post(
			`/email-valid/send-token`,
			{
				email,
			},
			{
				headers: {
					"X-CLIENT-ID": X_CLIENT_ID,
					"X-CLIENT-SECRET": X_CLIENT_SECRET,
				},
			}
		);

		return {
			data,
		};
	} catch (e) {
		const { code } = e.response.data;
		return {
			error: code,
		};
	}
};

export const postCheckToken = async (email, token) => {
	try {
		const { data } = await axios.post(
			`${EMAIL_SERVER}/email-valid/check-token`,
			{
				email,
				token,
			},
			{
				headers: {
					"X-CLIENT-ID": X_CLIENT_ID,
					"X-CLIENT-SECRET": X_CLIENT_SECRET,
				},
			}
		);

		return {
			data,
		};
	} catch (e) {
		const { code } = e.response.data;
		return {
			error: code,
		};
	}
};

export const postRequestClaim = async ({ address, discord, twitter, email, verificationCode }) => {
	try {
		const { data } = await axios.post(
			`https://reward.vega.havah.io/v1/claim`,
			{
				address,
				discord,
				twitter,
				email,
				verificationCode,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		return { data };
	} catch (e) {
		console.error(e);
		return {
			error: true,
		};
	}
};

export const getTwitterOauthToken = async (code) => {
	try {
		const url = `https://reward.vega.havah.io/v1/oauth/twitter/token?code=${code}&redirect_uri=${window.location.origin}`;
		const { data } = await axios({
			url,
			method: "GET",
		});

		return {
			data,
		};
	} catch (e) {
		console.error(e);
		return {
			error: true,
		};
	}
};
