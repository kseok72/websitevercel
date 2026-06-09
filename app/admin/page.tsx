import Link from "next/link";
import { logoutAdmin } from "@/app/actions";
import { getAdminEntries } from "./data";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

function label(kind: string) {
  return kind === "tip" ? "수험 팁" : "익명 고민";
}

export default async function AdminPage() {
  const entries = await getAdminEntries();

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <header className="admin-header">
          <Link className="button" href="/">
            처음으로
          </Link>
          {entries ? (
            <form action={logoutAdmin}>
              <button className="button" type="submit">
                나가기
              </button>
            </form>
          ) : null}
        </header>

        {!entries ? (
          <LoginForm />
        ) : (
          <section className="section">
            <div className="section-header">
              <h1>관리자 보관함</h1>
              <p>방문자가 제출한 내용은 이 화면에서만 확인할 수 있습니다.</p>
            </div>

            <div className="admin-list">
              {entries.length === 0 ? (
                <div className="panel empty">아직 제출된 내용이 없습니다.</div>
              ) : (
                entries.map((entry) => (
                  <article className="panel" key={entry.id}>
                    <div className="panel-body">
                      <div className="entry-meta">
                        <span>{label(entry.kind)}</span>
                        <span>{new Date(entry.createdAt).toLocaleString("ko-KR")}</span>
                        {entry.nickname ? <span>{entry.nickname}</span> : null}
                      </div>
                      <p className="entry-content">{entry.body}</p>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
