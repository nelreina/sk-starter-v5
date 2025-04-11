import { client } from "./redis-client.js";
import { redirect } from "@sveltejs/kit";
import "dotenv/config";

import { base } from "$app/paths";
import { pbAdmin } from "./pocketbase.js";

const redis = client.getConnection();

const STREAM = process.env["STREAM"];
console.log("LOG:  ~ file: sessions.js:9 ~ STREAM:", STREAM);
const SERVICE = process.env["SERVICE_NAME"] || "unknown";

const SESSION_EXPIRED = process.env["SESSION_EXPIRED"] || 604800;
const cookieName = "auth";

export const saveSession = async (token, authUser) => {
	await redis.set(token, JSON.stringify(authUser)); // 1 week
	await redis.expire(token, SESSION_EXPIRED);
};

export const login = async (username, password, cookies) => {
	try {
		const user = await pbAdmin.collection("users").authWithPassword(
			username,
			password,
		);
		if (!user) {
			throw new Error("Invalid username or password");
		}
		const authData = { ...user.record, token: user.token };
		await createSession(authData, cookies);
		return authData;
	} catch (error) {
		// console.log(error);
		throw new Error("Invalid username or password");
	}
};

export const createSession = async (authUser, cookies) => {
	try {
		const token = crypto.randomUUID();
		await saveSession(token, authUser);
		cookies.set(cookieName, token, {
			httponly: true,
			sameSite: "lax",
			path: "/",
			maxAge: SESSION_EXPIRED, 
			secure: import.meta.env.PROD ? true : false,
		});
	} catch (error) {
		console.log(error);
	}
};


export const getToken = (cookies) => {
	return cookies.get(cookieName);
};

export const deleteSession = async (cookies) => {
	// Delete token from redis
	const token = getToken(cookies);
	await redis.del(token);
	// Delete cookie
	cookies.set(cookieName, "", {
		httponly: true,
		sameSite: "lax",
		path: "/",
		maxAge: 0,
		// Secure when in production

		secure: import.meta.env.PROD ? true : false,
	});
	throw redirect(303, `${base}/login`);
};

export const getSessionUser = async (cookies) => {
	const token = getToken(cookies);
	if (!token) return;
	const user = await redis.get(token);
	if (!user) {
		await deleteSession(cookies);
		return;
	}
	return { token, user: JSON.parse(user) };
};

export const addToSessionStream = async (event, aggregateId, payload) => {
	const streamData = {
		streamKeyName: `${STREAM}:sessions`,
		aggregateId,
		payload,
		event: `${event}`,
		serviceName: SERVICE,
	};
	await redis.publishToStream(streamData);
};
