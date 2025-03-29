// import { pbAdmin } from '$lib/server/pb-admin';
// import { serializePOJO } from '$lib/utils';

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {

	return {
		user: locals.user,
		inbox: []
	};
}
