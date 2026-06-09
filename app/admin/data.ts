import { isAdmin } from "@/app/lib/session";
import { listSubmissions } from "@/app/lib/submissions";

export async function getAdminEntries() {
  if (!(await isAdmin())) {
    return null;
  }

  return listSubmissions();
}
