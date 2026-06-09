import Link from "next/link";
import { BookOpen, LockKeyhole, MessageCircle, Sprout } from "lucide-react";
import { SubmissionForm } from "./home-client";

export default function Home() {
  return (
    <main className="page-shell">
      <div className="site-frame">
        <nav className="top-nav" aria-label="목차">
          <Link className="brand" href="#top">
            <span className="brand-mark">
              <Sprout size={20} aria-hidden="true" />
            </span>
            수험 쉼표
          </Link>
          <div className="nav-links">
            <a href="#tips">수험 팁</a>
            <a href="#ideas">의견 제출</a>
            <a href="#worries">익명 고민</a>
            <Link href="/admin">관리자</Link>
          </div>
        </nav>

        <section className="hero" id="top">
          <div>
            <h1>오늘도, 조금은 가볍게 공부하기.</h1>
          </div>
          <p>
            수험생활에 도움이 되는 팁을 정리하고, 말하기 어려운 고민을 로그인 없이 조용히 남길 수 있는 공간입니다.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#tips">
              <BookOpen size={18} aria-hidden="true" />
              팁 보기
            </a>
            <a className="button" href="#worries">
              <MessageCircle size={18} aria-hidden="true" />
              고민 남기기
            </a>
          </div>
        </section>

        <section className="section" id="tips">
          <div className="section-header">
            <h2>수험생활 팁</h2>
            <p>운영자가 직접 적는 공간입니다. 아래 칸의 문구는 배포 전 원하는 내용으로 바꿔 넣으면 됩니다.</p>
          </div>
          <div className="panel">
            <div className="panel-body">
              <h3>내가 직접 적는 팁</h3>
              <textarea
                className="tip-editor"
                defaultValue={
                  "예시) 하루 계획은 너무 빽빽하게 세우기보다, 반드시 지킬 수 있는 3가지를 먼저 정해 보세요.\n\n예시) 잠을 줄이는 공부보다, 같은 시간에 자고 일어나는 리듬이 오래 갑니다."
                }
                aria-label="운영자가 직접 적는 수험생활 팁"
              />
              <p className="hint">이 칸은 화면용 초안입니다. 실제 운영 문구는 코드에서 원하는 글로 고정해 둘 수 있습니다.</p>
            </div>
          </div>
        </section>

        <section className="section" id="ideas">
          <div className="grid two">
            <div className="section-header">
              <h2>여러분들이 생각하는 수험생활에 도움이 되는 팁은 무엇이 있나요?</h2>
              <p>
                제출된 의견은 공개되지 않고 관리자 보관함에만 저장됩니다. 다른 방문자는 이 내용을 볼 수 없습니다.
              </p>
            </div>
            <SubmissionForm
              kind="tip"
              label="나의 팁 제출"
              placeholder="예: 집중이 안 될 때는 25분만 하겠다고 정하고 책상에 앉아 봅니다."
            />
          </div>
        </section>

        <section className="section" id="worries">
          <div className="grid two">
            <div>
              <div className="section-header">
                <h2>익명 고민상담 올리기</h2>
                <p>로그인 없이 작성할 수 있고, 고민 내용은 공개 게시판에 노출되지 않습니다.</p>
              </div>
              <ul className="privacy-list" aria-label="개인정보 보호 안내">
                <li>
                  <span className="privacy-dot" aria-hidden="true" />
                  이름, 연락처, 학교명 같은 개인정보는 적지 않아도 됩니다.
                </li>
                <li>
                  <span className="privacy-dot" aria-hidden="true" />
                  제출된 고민은 관리자 화면에서만 확인됩니다.
                </li>
                <li>
                  <span className="privacy-dot" aria-hidden="true" />
                  다른 방문자는 다른 사람의 고민을 볼 수 없습니다.
                </li>
              </ul>
            </div>
            <SubmissionForm
              kind="worry"
              label="익명 고민 작성"
              placeholder="지금 가장 고민되는 일을 편하게 적어 주세요. 개인정보는 쓰지 않는 편이 좋습니다."
            />
          </div>
        </section>

        <section className="section">
          <div className="panel">
            <div className="panel-body">
              <h3>
                <LockKeyhole size={20} aria-hidden="true" /> 관리자만 확인
              </h3>
              <p className="hint">
                제출 목록은 관리자 비밀번호가 있어야 열립니다. Vercel 배포 시 환경변수와 Redis 저장소가 설정되어야 안전하게 보관됩니다.
              </p>
              <Link className="button" href="/admin">
                관리자 보관함
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
