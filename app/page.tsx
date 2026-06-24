import Link from "next/link";
import { BookOpen, LockKeyhole, MessageCircle, Sprout } from "lucide-react";
import { SubmissionForm } from "./home-client";
import HomeClient from "./home-client"; // 1. 이 줄을 추가합니다.

export const dynamic = "force-dynamic";

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

        <HomeClient />

<section className="section" id="tips">
  <div className="section-header">
    <h2>고민상담 답변!</h2>
  </div>

  <div className="panel">
    <div className="panel-body">

      <div className="tip-editor">
        <p>
          성적 부담이 있어요ㅠㅠ
        </p>
        <p>
           아무래도 지금까지 쌓아왔던 성적이 과거의 잔재로 남아있기에 자꾸만 앞으에 대한 걱정이 증가하는 경험을 해본 적이 있을 겁니다. 특히나 지금 시기의 특성상 마무리를 자신 인생 최고로 잘 하고 싶다는 욕심 또한 생길거고요. 하지만 이런 감정은 동기부여로서 좋은 역할을 할 수도 있지만, 과도하면 어느 순간부터 앞으로의 행동에 대한 장애물이 될 것이에요. 저의 이야기를 잠깐 해보자면, 저 역시 과거의 만족스럽지 못했던 경험들 때문에, 어쩌면 주제에 비해 운이 좋아서 높은 점수가 나왔던 경험 때문에, 이전보다 더 열심히하고, 더 좋은 성과를 내야 한다는 압박이 머리를 아프게 했던 적이 많았습니다. 혹여나 여기서 떨어지는 하락세를 타면 어쩌지, 여기서 더 떨어지면 가망이 없을 것 같은데, 여기서 조금만 더 올라가면 좋을 것 같은데. 여러 걱정과 욕심이 자꾸 쌓여가니까 결과적으로는 고민하는 그 순간에 있는 나의 행동을 지체시키더라고요. 결론적으로는, 이런 걱정이 과도해지면 오히려 걱정했던 바와 같이 상황을 더 악화시킬 수 밖에 없어요. 과거는 아무래도 미래를 위한 발판이 되어야지, 미래를 가리는 역할을 하면 안되잖아요. 
           따라서 제가 드리고 싶은 말은 ”나를 믿어라“ 입니다. 정확히는 노력하는 나를 믿고, 노력에 대한 성과를 믿으라는 소리입니다. ’노력하는 현재의 나‘ 자신이, ’걱정 속 최악의 상황의 나‘를 씹어먹을 정도로 강하다는 그 현실을 믿으시고 나아가시길 바랍니다.
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
