import { isAdmin } from "@/app/lib/session";
import { listSubmissions } from "@/app/lib/submissions";
import { unstable_noStore as noStore } from "next/cache"; // 1. 상단에 noStore 임포트 추가

export async function getAdminEntries() {
  noStore(); // 2. 함수가 호출될 때마다 새로 데이터를 불러오도록 캐시 비활성화
  
  if (!(await isAdmin())) {
    return null;
  }

  return listSubmissions();
}
