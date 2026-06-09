"use client";

import { useEffect, useState } from "react";

type SubmitKind = "tip" | "worry";

export function SubmissionForm({
  kind,
  label,
  placeholder,
  includeNickname = false,
}: {
  kind: SubmitKind;
  label: string;
  placeholder: string;
  includeNickname?: boolean;
}) {
  const [toast, setToast] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeout = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const text = String(formData.get("text") || "");
    const nickname = String(formData.get("nickname") || "");

    setPending(true);

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, text, nickname }),
    });

    setPending(false);

    if (!response.ok) {
      const result = (await response.json()) as { error?: string };
      setToast(result.error || "제출 중 문제가 생겼습니다.");
      return;
    }

    form.reset();
    setToast("제출이 완료되었습니다.");
  }

  return (
    <>
      {toast ? <div className="toast" role="status">{toast}</div> : null}
      <form className="panel" onSubmit={handleSubmit}>
        <div className="panel-body">
          <h3>{label}</h3>
          {includeNickname ? (
            <div className="field">
              <label htmlFor={`${kind}-nickname`}>표시 이름</label>
              <input id={`${kind}-nickname`} name="nickname" placeholder="비워두면 익명으로 저장됩니다." />
            </div>
          ) : null}
          <div className="field">
            <label htmlFor={`${kind}-text`}>내용</label>
            <textarea id={`${kind}-text`} name="text" placeholder={placeholder} required />
          </div>
          <div className="submit-row">
            <button className="submit-button" type="submit" disabled={pending}>
              {pending ? "제출 중" : "제출하기"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
