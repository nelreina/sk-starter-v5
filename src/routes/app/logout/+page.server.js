import { deleteSession } from "$lib/server/sessions.js";
import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies }) => {
    await deleteSession(cookies);
    redirect(303, "/");
};
