"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/app/actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAdmin, null);

  return (
    <form className="panel" action={formAction}>
      <div className="panel-body">
        <h3>관리자 확인</h3>
        <p className="hint">제출된 팁과 고민은 관리자 비밀번호를 입력한 뒤에만 볼 수 있습니다.</p>
        <div className="field">
          <label htmlFor="password">비밀번호</label>
          <input id="password" name="password" type="password" autoComplete="current-password" />
        </div>
        {state?.message ? <p className="hint">{state.message}</p> : null}
        <button className="submit-button" type="submit" disabled={pending}>
          {pending ? "확인 중" : "입장하기"}
        </button>
      </div>
    </form>
  );
}
