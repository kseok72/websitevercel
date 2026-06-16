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
            꾸준한 수험 생활!
          </Link>
          <div className="nav-links">
            <a href="#tips">수험 팁</a>
            <a href="#ideas">의견 제출</a>
            <a href="#worries">익명 고민</a>
          </div>
        </nav>

        <section className="hero" id="top">
          <div>
            <h1>꾸준한 수험생활에 도움이 되길.</h1>
          </div>
          <p>
            수험생활에 도움이 되는 팁을 정리하고, 수험생활 고민을 익명으로 남길 수 있는 공간입니다.
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
  </div>

  <div className="panel">
    <div className="panel-body">

      <div className="tip-editor">
        <p>
          1. 남들을 자신과 비교하지 말고 자신의 페이스대로 공부하세요!
        </p>
        <p>
          2. 잠을 줄이는 공부보다, 같은 시간에 자고 일어나는 리듬이 오래 갑니다.
        </p>
         <p>
          3. 싫어하는 과목이 내 발목을 이후에 잡는다고 생각하고 열심히 하는 마음!
        </p>
         <p>
          4. 자만하지 않기!
        </p>
         <p>
          5. 공부를 핑계로 주변사람들을 힘들게 하지 않기!
        </p>
         <p>
          6. 복습을 꾸준히 하기!
        </p>
         <p>
          7. 쉴 때도 막 쉬지 말고 쉬어야 할 때를 정하기!
        </p>
      </div>

      <p className="hint">
        잘 지켜서 건강하고 성적 오르는 수험생활 보내세요~
      </p>
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
                <p>로그인 없이 작성할 수 있고, 고민 내용은 익명을 보장합니다.</p>
              </div>
              <ul className="privacy-list" aria-label="개인정보 보호 안내">
                <li>
                  <span className="privacy-dot" aria-hidden="true" />
                  모든 개인정보는 보호됩니다.
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
              placeholder="지금 가장 고민되는 일을 편하게 적어 주세요."
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
                관리자만 확인할 수 있습니다.
              </p>
              <Link className="button" href="/admin">
                관리자 사이트 접근
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
