import { randomUUID } from "crypto";

export type SubmissionKind = "tip" | "worry";

export type Submission = {
  id: string;
  kind: SubmissionKind;
  body: string;
  nickname?: string;
  createdAt: string;
};

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = "study-shelter:submissions";

const memoryStore: Submission[] = [];

function hasRedis() {
  return Boolean(REDIS_URL && REDIS_TOKEN);
}

async function redisCommand(command: unknown[]) {
  if (!hasRedis()) {
    throw new Error("Redis environment variables are missing.");
  }

  const response = await fetch(`${REDIS_URL}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([command]),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Redis request failed.");
  }

  const [result] = (await response.json()) as Array<{ result: unknown }>;
  return result?.result;
}

export async function addSubmission(input: {
  kind: SubmissionKind;
  body: string;
  nickname?: string;
}) {
  const submission: Submission = {
    id: randomUUID(),
    kind: input.kind,
    body: input.body,
    nickname: input.nickname,
    createdAt: new Date().toISOString(),
  };

  if (hasRedis()) {
    await redisCommand(["LPUSH", KEY, JSON.stringify(submission)]);
    return submission;
  }

  memoryStore.unshift(submission);
  return submission;
}

export async function listSubmissions() {
  if (hasRedis()) {
    const rows = (await redisCommand(["LRANGE", KEY, 0, 200])) as string[];
    return rows.map((row) => JSON.parse(row) as Submission);
  }

  return memoryStore;
}
