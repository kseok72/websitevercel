"use client";

import { useEffect, useState } from "react";

type SubmitKind = "tip" | "worry";

// 🍵 차 추천 퀴즈 문항 데이터 설정 (타입 에러 방지)
const QUIZ_QUESTIONS: {
  id: number;
  question: string;
  options: { text: string; score: Record<string, number> }[];
}[] = [
  {
    id: 1,
    question: "1. 지금 내 몸과 마음의 상태는 어떤가요?",
    options: [
      { text: "스트레스가 심하고 마음의 안정이 필요해요", score: { camomile: 3, green: 1 } },
      { text: "몸이 으슬으슬 춥거나 피로해요", score: { ginger: 3, black: 1 } },
      { text: "기분 전환이 필요하고 상큼한 게 당겨요", score: { peppermint: 3, hibiscus: 2 } },
      { text: "집중을 해야 하거나 졸음이 와요", score: { matcha: 3, black: 2 } },
    ]
  },
  {
    id: 2,
    question: "2. 선호하는 맛과 향의 스타일은?",
    options: [
      { text: "은은하고 향긋한 꽃향기", score: { camomile: 3, hibiscus: 1 } },
      { text: "쌉싸름하고 깔끔한 맛", score: { matcha: 3, green: 2 } },
      { text: "화하고 시원해서 입안이 개운해지는 맛", score: { peppermint: 3 } },
      { text: "알싸하고 진하게 몸을 데워주는 맛", score: { ginger: 3, black: 1 } },
    ]
  },
  {
    id: 3,
    question: "3. 차를 마시고 싶은 시간대는 언제인가요?",
    options: [
      { text: "상쾌하게 시작하는 아침/낮 (카페인 괜찮음)", score: { matcha: 3, black: 3, green: 1 } },
      { text: "나른한 오후, 디저트와 함께", score: { hibiscus: 3, black: 2 } },
      { text: "하루를 마무리하는 늦은 밤 (카페인 없는 것)", score: { camomile: 3, peppermint: 2 } },
    ]
  }
];

const TEA_RESULTS: Record<string, { title: string; desc: string; icon: string }> = {
  camomile: { title: "캐모마일 (Chamomile)", desc: "마음이 편안해지는 대표적인 허브차입니다. 카페인이 없어 밤에 마시기 좋고 스트레스 완화와 숙면에 최고예요.", icon: "🌼" },
  peppermint: { title: "페퍼민트 (Peppermint)", desc: "정신이 번쩍 드는 청량한 차입니다. 식후 입안을 개운하게 해주고 소화를 도우며 집중력을 높여줍니다.", icon: "🌿" },
  ginger: { title: "생강차 (Ginger Tea)", desc: "몸을 따뜻하게 가꿔주는 건강차입니다. 면역력 증진과 피로 해소에 탁월하며 으슬으슬한 날씨에 제격이에요.", icon: "🪵" },
  matcha: { title: "말차/녹차 (Matcha/Green Tea)", desc: "풍부한 항산화 성분과 깔끔한 맛이 일품입니다. 적당한 카페인과 테아닌 성분이 들어있어 차분하게 집중할 때 좋습니다.", icon: "🍵" },
  hibiscus: { title: "히비스커스 (Hibiscus)", desc: "새콤달콤한 맛과 붉은 수색이 매력적인 차입니다. 비타민 C가 풍부해 피부 미용에 좋고 활력을 불어넣어 줍니다.", icon: "🌺" },
  black: { title: "홍차 (Black Tea)", desc: "깊고 풍부한 바디감을 가진 차입니다. 은은한 카페인이 각성을 도와주며, 달콤한 디저트와 곁들이기에 환상의 궁합입니다.", icon: "🍂" },
};

// 1. 기존에 작성하셨던 SubmissionForm 컴포넌트 (원본과 100% 완전히 일치)
export function SubmissionForm({
  kind,
  label,
  placeholder,
  includeNickname = false,
}: {
  kind: SubmitKind;
  label: string;
  placeholder: string;
  includeNickname?: boolean;
}) {
  const [toast, setToast] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeout = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const text = String(formData.get("text") || "");
    const nickname = String(formData.get("nickname") || "");

    setPending(true);

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, text, nickname }),
    });

    setPending(false);

    if (!response.ok) {
      const result = (await response.json()) as { error?: string };
      setToast(result.error || "제출 중 문제가 생겼습니다.");
      return;
    }

    form.reset();
    setToast("제출이 완료되었습니다.");
  }

  return (
    <>
      {toast ? <div className="toast" role="status">{toast}</div> : null}
      <form className="panel" onSubmit={handleSubmit}>
        <div className="panel-body">
          <h3>{label}</h3>
          {includeNickname ? (
            <div className="field">
              <label htmlFor={`${kind}-nickname`}>표시 이름</label>
              <input id={`${kind}-nickname`} name="nickname" placeholder="비워두면 익명으로 저장됩니다." />
            </div>
          ) : null}
          <div className="field">
            <label htmlFor={`${kind}-text`}>내용</label>
            <textarea id={`${kind}-text`} name="text" placeholder={placeholder} required />
          </div>
          <div className="submit-row">
            <button className="submit-button" type="submit" disabled={pending}>
              {pending ? "제출 중" : "제출하기"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

// 2. 💡 새로 생성되는 탭 전환 및 메인 컨트롤 컴포넌트
export default function HomeClient() {
  // 현재 보고 있는 서브 메뉴 상태 ('form' = 기존 작성하신 양식, 'quiz' = 차 추천 퀴즈)
  const [viewMode, setViewMode] = useState<'form' | 'quiz'>('form');

  // 퀴즈 내부 상태 관리
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [quizResult, setQuizResult] = useState<typeof TEA_RESULTS[string] | null>(null);

  const handleOptionClick = (scoreUpdate: Record<string, number>) => {
    const newScores = { ...scores };
    Object.entries(scoreUpdate).forEach(([tea, val]) => {
      newScores[tea] = (newScores[tea] || 0) + val;
    });
    setScores(newScores);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      let maxScore = -1;
      let selectedTea = 'camomile';

      Object.entries(newScores).forEach(([tea, score]) => {
        if (score > maxScore) {
          maxScore = score;
          selectedTea = tea;
        }
      });
      setQuizResult(TEA_RESULTS[selectedTea]);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScores({});
    setQuizResult(null);
  };

  return (
    <div style={{ width: "100%" }}>
      {/* 상단 탭 전환 선택 영역 (기존 폼 양식 상단에 나란히 배치) */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
        <button
          onClick={() => setViewMode('form')}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "6px",
            border: viewMode === 'form' ? "2px solid #10b981" : "1px solid #ddd",
            backgroundColor: viewMode === 'form' ? "#e6f4ea" : "#fff",
            color: viewMode === 'form' ? "#137333" : "#555",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          📝 수험 팁 & 고민 제출
        </button>
        <button
          onClick={() => setViewMode('quiz')}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "6px",
            border: viewMode === 'quiz' ? "2px solid #10b981" : "1px solid #ddd",
            backgroundColor: viewMode === 'quiz' ? "#e6f4ea" : "#fff",
            color: viewMode === 'quiz' ? "#137333" : "#555",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          🍵 나만의 차(Tea) 추천 퀴즈
        </button>
      </div>

      {/* [1] 원래 화면 상태: 기존 작성하신 폼 내용(고민 나누기, 꿀팁 공유)이 그대로 살아 움직입니다. */}
      {viewMode === 'form' && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <SubmissionForm kind="worry" label="😥 고민 나누기" placeholder="요즘 어떤 고민이 있으신가요? 마음껏 털어놓아 보세요." />
          <SubmissionForm kind="tip" label="💡 공부 꿀팁 공유" placeholder="나만 알고 있는 효과적인 공부 비법을 알려주세요!" includeNickname />
        </div>
      )}

      {/* [2] 차 추천 상태: 탭을 클릭하면 아래쪽에 퀴즈 설문판이 나타납니다. */}
      {viewMode === 'quiz' && (
        <div className="panel" style={{ padding: "24px" }}>
          <div className="panel-body">
            {!quizResult ? (
              /* 질문 선택 중 화면 */
              <div>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  <span style={{ background: "#e6f4ea", color: "#137333", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold" }}>
                    질문 {QUIZ_QUESTIONS[currentQuestionIndex].id} / {QUIZ_QUESTIONS.length}
                  </span>
                  <h3 style={{ marginTop: "12px", fontSize: "17px", color: "#333" }}>
                    {QUIZ_QUESTIONS[currentQuestionIndex].question}
                  </h3>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {QUIZ_QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(option.score)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "14px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                        backgroundColor: "#fcfcfc",
                        cursor: "pointer",
                        fontSize: "14px",
                        color: "#444"
                      }}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* 결과 도출 화면 */
              <div style={{ textAlign: "center", padding: "10px 0" }}>
                <div style={{ fontSize: "50px", marginBottom: "10px" }}>{quizResult.icon}</div>
                <p style={{ color: "#10b981", fontWeight: "bold", fontSize: "14px", margin: "0" }}>당신에게 딱 맞는 차는?</p>
                <h2 style={{ fontSize: "24px", margin: "8px 0 20px 0", color: "#222" }}>{quizResult.title}</h2>

                <div style={{ background: "#f9f9f9", padding: "16px", borderRadius: "6px", border: "1px solid #f0f0f0", color: "#555", fontSize: "14px", lineHeight: "1.6", marginBottom: "24px", textAlign: "left" }}>
                  {quizResult.desc}
                </div>

                <div className="submit-row" style={{ justifyContent: "center" }}>
                  <button className="submit-button" onClick={resetQuiz} style={{ float: "none" }}>
                    🔄 다시 테스트하기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
