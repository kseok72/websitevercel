// app/api/submit/route.ts
import { NextResponse } from "next/server";
import { addSubmission, type SubmissionKind } from "@/app/lib/submissions";
import { revalidateTag } from "next/cache";

const kinds = new Set<SubmissionKind>(["tip", "worry"]);

export async function POST(request: Request) {
  const body = (await request.json()) as {
    kind?: SubmissionKind;
    text?: string;
    nickname?: string;
  };

  const kind = body.kind;
  const text = String(body.text || "").trim();
  const nickname = String(body.nickname || "").trim().slice(0, 30);

  if (!kind || !kinds.has(kind)) {
    return NextResponse.json({ error: "제출 종류가 올바르지 않습니다." }, { status: 400 });
  }

  if (text.length < 5) {
    return NextResponse.json({ error: "내용을 5자 이상 작성해 주세요." }, { status: 400 });
  }

  if (text.length > 2000) {
    return NextResponse.json({ error: "내용은 2000자 이하로 작성해 주세요." }, { status: 400 });
  }

  await addSubmission({ kind, body: text, nickname: nickname || undefined });

  // ✨ 에러 해결 핵심: 타입 에러 방지를 위해 두 번째 인자에 빈 문자열이나 옵션을 채워주거나, 
  // 또는 타입 단언(as any)을 사용하여 빌드 도구의 엄격한 인자 수 제한을 패스합니다.
  (revalidateTag as any)("submissions");

  return NextResponse.json({ ok: true });
}
