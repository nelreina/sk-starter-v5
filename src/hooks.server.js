/** @type {import('./$types').ParamMatcher */
import { redirect } from "@sveltejs/kit";

import { base } from "$app/paths";

import { getSessionUser } from "$lib/server/sessions";

export const handle = async ({ event, resolve }) => {
	const session = await getSessionUser(event.cookies);
	// if (!session) {
	// 	throw redirect(303, `${base}/login`);
	// }
	const { user, token } = session || {};
	event.locals.user = user;
	if (event.url.pathname.startsWith(`${base}/app`)) {
		if (!user) {
			throw redirect(303, `${base}/login`);
		}
	}

	const response = await resolve(event);
	return response;
};
