import { EVENT_SERVER, IS_LOCAL, IS_WEBAPP, MOCK_SERVER } from "./const";
import axios from "axios";
import queryString from "query-string";

const URL = IS_LOCAL || IS_WEBAPP ? MOCK_SERVER : EVENT_SERVER;

export const eventStatus = async () => {
	try {
		const { data } = await axios.get(`${URL}/v1/event/status`);
		return data;
	} catch (e) {
		return {
			result: true,
		};
	}
};

export const checkAddress = async (address) => {
	try {
		const { data } = await axios.get(`${URL}/v1/event/check?addr=${address}`);
		return data;
	} catch (e) {
		return {
			error: -1,
		};
	}
};

export const checkEmail = async (email) => {
	try {
		const { data } = await axios.get(`${URL}/v1/event/check?email=${email}`);
		const { result, error } = data;
		return { result, error };
	} catch (e) {
		return {
			error: -1,
		};
	}
};

export const hvhAddress = async (address) => {
	try {
		const { data } = await axios.get(`${URL}/v1/event/hvh?addr=${address}`);
		const { result, error } = data;
		return { result, error };
	} catch (e) {
		return {
			error: -1,
		};
	}
};

export const getReferral = async (address) => {
	const { referral } = await checkAddress(address);
	return referral || "";
};

export const getEventComplete = async (addr, referral, email) => {
	const stringified = queryString.stringify(
		{
			addr,
			referral,
			email,
		},
		{
			skipNull: true,
			skipEmptyString: true,
		}
	);
	try {
		const { data } = await axios.get(`${URL}/v1/event/complete?${stringified}`);
		return data;
	} catch (e) {
		return {
			error: -1,
		};
	}
};

export const getDiscordOauthToken = async (code) => {
	// const body = queryString.stringify({
	// 	client_id: "1075705706356936796",
	// 	client_secret: "Ug228F8e3p_HRVxM7xRXebibu0t6ip8s",
	// 	grant_type: "authorization_code",
	// 	redirect_uri: window.location.href,
	// 	code,
	// });

	// const response = await axios.post(uri, body, {
	// 	headers: {
	// 		"Content-Type": "application/x-www-form-urlencoded",
	// 	},
	// });

	// console.log(response);

	const url = `https://discord.com/api/oauth2/token`;
	const response = await axios({
		url,
		method: "POST",
		headers: { "content-type": "application/x-www-form-urlencoded" },
		data: queryString.stringify({
			client_id: "1075705706356936796",
			client_secret: "Ug228F8e3p_HRVxM7xRXebibu0t6ip8s",
			grant_type: "authorization_code",
			code,
			redirect_uri: "http://localhost:3000",
			scope: "identify",
		}),
	});

	console.log(response);
};
