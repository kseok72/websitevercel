import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "study_shelter_admin";

function secret() {
  return process.env.SESSION_SECRET || "local-development-secret-change-me";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function createSessionToken() {
  const value = "admin";
  return `${value}.${sign(value)}`;
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return false;
  }

  const [value, signature] = token.split(".");
  if (!value || !signature) {
    return false;
  }

  const expected = sign(value);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(signatureBuffer, expectedBuffer);
}

export function validAdminPassword(password: string) {
  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (!configuredPassword) {
    return process.env.NODE_ENV !== "production" && password === "admin";
  }

  const left = Buffer.from(password);
  const right = Buffer.from(configuredPassword);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}
