import { cookies } from "next/headers";
import { COOKIE_NAME, verifySessionToken } from "./auth";

// Only import this from Route Handlers / Server Components - it relies on
// next/headers, which isn't available inside middleware.

export async function getSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function isAdmin() {
  const session = await getSession();
  return !!session;
}
