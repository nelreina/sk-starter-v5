import PocketBase from "pocketbase";
import "dotenv/config";

const POCKETBASE = process.env.POCKETBASE_URL;
const POCKETBASE_ADMIN_TOKEN = process.env.POCKETBASE_ADMIN_TOKEN;
const POCKETBASE_ADMIN = process.env.POCKETBASE_ADMIN;

console.info("• POCKETBASE URL:", POCKETBASE);

export const pbAdmin = new PocketBase(POCKETBASE);

const checkAuth = async () => {
  try {
    // This is a workaround to check if the admin is authenticated
    await pbAdmin.collection("_superusers").getList(1, 1);
    return true;
  } catch (_error) {
    return false;
  }
};

export const connectToPocketbase = async () => {
  let isAuthenticated = false;
  pbAdmin.authStore.save(POCKETBASE_ADMIN_TOKEN);
  isAuthenticated = await checkAuth();
  if (isAuthenticated) {
    console.info(
      "✅ PocketBase admin authenticated for admin user: " + POCKETBASE_ADMIN,
    );
    pbAdmin.autoCancellation(false);
  } else {
    console.error(
      "❗️ PocketBase admin authentication failed:  ",
    );
  }
  return isAuthenticated;
};

connectToPocketbase();
