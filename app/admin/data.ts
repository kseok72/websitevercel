// app/admin/data.ts
import { isAdmin } from "@/app/lib/session";
import { listSubmissions } from "@/app/lib/submissions";
import { unstable_cache } from "next/cache";

export async function getAdminEntries() {
  if (!(await isAdmin())) {
    return null;
  }

  // 빌드 에러 방지를 위해 listSubmissions()의 실행 결과를 확실하게 반환하도록 수정했습니다.
  const cachedList = unstable_cache(
    async () => {
      const data = await listSubmissions();
      return data;
    },
    ["admin-submissions-list"],
    { tags: ["submissions"] }
  );

  return cachedList();
}
