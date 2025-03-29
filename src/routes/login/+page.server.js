import { login } from "$lib/server/sessions.js";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password");
        const rememberMe = data.get("rememberMe") === "on";
        let authData = null;
        if (!email || !password) {
            return fail(400, {
                error: "Missing username/email or password",
            });
        }

        try {
            authData = await login(email, password, cookies);
            // console.log("LOG:  ~ file: login.js:18 ~ authData:", authData);
            if (!authData) {
                return fail(401, {
                    error: "Invalid username/email or password",
                });
            }
        } catch (error) {
            return fail(401, {
                error: "Invalid username/email or password",
            });
        }
        throw redirect(303, "/app/dashboard");
    },
};
