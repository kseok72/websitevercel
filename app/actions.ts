"use server";

import { redirect } from "next/navigation";
import { clearAdminSession, setAdminSession, validAdminPassword } from "./lib/session";

export type LoginState = {
  ok: boolean;
  message: string;
} | null;

export async function loginAdmin(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") || "");

  if (!validAdminPassword(password)) {
    return { ok: false, message: "비밀번호가 올바르지 않습니다." };
  }

  await setAdminSession();
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
}
