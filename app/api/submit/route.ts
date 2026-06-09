// app/api/submit/route.ts
import { NextResponse } from "next/server";
import { addSubmission, type SubmissionKind } from "@/app/lib/submissions";
import { revalidateTag } from "next/cache"; // 1. 임포트 추가

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

  // 2. 글이 제출되면 'submissions'라는 이름의 캐시를 무효화시킵니다.
  revalidateTag("submissions");

  return NextResponse.json({ ok: true });
}
