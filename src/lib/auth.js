// Minimal signed-cookie session, good enough for a single-admin portfolio.
//
// Uses the Web Crypto API (not node:crypto) so the exact same code works
// both in Next.js middleware (edge runtime) and in normal route handlers.

export const COOKIE_NAME = "portfolio_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    // Don't crash local dev if someone forgot to set it, but make it loud.
    console.warn(
      "[auth] SESSION_SECRET is not set. Using an insecure fallback - set SESSION_SECRET in your .env.local before deploying."
    );
    return "insecure-dev-secret-change-me";
  }
  return secret;
}

function toBase64Url(bytes) {
  let str = btoa(String.fromCharCode(...new Uint8Array(bytes)));
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str) {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/").padEnd(str.length + ((4 - (str.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function hmacKey() {
  const enc = new TextEncoder().encode(getSecret());
  return crypto.subtle.importKey("raw", enc, { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

async function sign(payloadStr) {
  const key = await hmacKey();
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payloadStr));
  return toBase64Url(sig);
}

// Creates a signed session token: base64url(json).base64url(signature)
export async function createSessionToken() {
  const payload = JSON.stringify({
    admin: true,
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  });
  const payloadB64 = toBase64Url(new TextEncoder().encode(payload));
  const signature = await sign(payloadB64);
  return `${payloadB64}.${signature}`;
}

// Verifies a token and returns the payload, or null if invalid/expired.
export async function verifySessionToken(token) {
  if (!token || !token.includes(".")) return null;
  const [payloadB64, signature] = token.split(".");
  const expectedSig = await sign(payloadB64);
  if (signature !== expectedSig) return null;

  try {
    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(payloadB64)));
    if (!payload.admin || Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}
