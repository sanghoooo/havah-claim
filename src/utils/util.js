import hash from "hash.js";

export function classBind() {
	const list = Array.prototype.slice.call(arguments);

	let _list = [];
	list.forEach((element) => {
		if (Array.isArray(element)) _list = [..._list, ...element];
		else _list.push(element);
	});

	const __list = [];
	_list.forEach((element) => {
		if (element) __list.push(element);
	});

	return __list.join(" ");
}

export function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function validateEmail(value) {
	return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value);
}

export function ellipsisHash(text = "", size = 10) {
	if (!text) {
		return "";
	}

	return `${text.substring(0, size + 2)}...${text.slice(0 - size)}`;
}

export function getHash(text) {
	return hash.sha256().update(text).digest("hex");
}
