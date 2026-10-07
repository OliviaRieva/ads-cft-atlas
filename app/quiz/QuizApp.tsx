"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { QUIZ_TOPICS, type PublicQuestion, type PublicTest, type QuizDashboard, type QuizSettings, type QuizTopic } from "../../lib/quiz-types";
import "./quiz.css";

type Reply = { dashboard?: QuizDashboard; test?: PublicTest; code?: string; error?: string };
async function api(body?: Record<string, unknown>, query = "") {
  const result = await fetch(`/api/quiz${query}`, { method: body ? "POST" : "GET", credentials: "same-origin", cache: "no-store", ...(body ? { headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : {}) });
  const data = await result.json() as Reply;
  if (!result.ok) throw new Error(data.error ?? "Could not connect to saved progress. Please try again.");
  return data;
}
import QuizText from "./QuizText";
const defaults: QuizSettings = { topics: [...QUIZ_TOPICS], count: 10, hardOnly: false, mistakesOnly: false, feedback: "immediate" };
const percent = (correct: number, total: number) => total ? `${Math.round(100 * correct / total)}%` : "—";
const when = (time: number) => new Date(time).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

function Source({ question }: { question: PublicQuestion }) {
  return <div className="q-sources"><a className="q-source" href={`/learn?page=${question.pages[0]}`}>Related GGD pp. {question.pages[0]}{question.pages[1] !== question.pages[0] ? `–${question.pages[1]}` : ""}</a>{question.reference && <a className="q-source" href={question.reference.url} target="_blank" rel="noreferrer">{question.reference.label}</a>}</div>;
}
function Explanation({ question }: { question: PublicQuestion }) {
  return <div className={`q-explanation ${question.correct ? "is-right" : "is-wrong"}`}><strong>{question.correct ? "Correct — here is why." : "The reasoning"}</strong><p><QuizText text={question.explanation ?? ""}/></p><Source question={question} /></div>;
}

export default function QuizApp() {
  const [dashboard, setDashboard] = useState<QuizDashboard | null>(null);
  const [settings, setSettings] = useState<QuizSettings>(defaults);
  const [test, setTest] = useState<PublicTest | null>(null);
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [recovery, setRecovery] = useState("");
  const [restoreCode, setRestoreCode] = useState("");
  const [recoverMessage, setRecoverMessage] = useState("");
  const [endConfirm, setEndConfirm] = useState(false);
  const current = useRef<PublicTest | null>(null);
  const profile = useRef<string | null>(null);
  const processing = useRef(false);
  const channel = useRef<BroadcastChannel | null>(null);
  const adopt = useCallback((saved: PublicTest, reset = false) => {
    const changed = current.current?.id !== saved.id;
    current.current = saved;
    setTest(saved);
    if (reset || changed) { setIndex(Math.min(saved.answered, saved.questions.length - 1)); setChosen(null); }
  }, []);
  const refresh = useCallback(async () => {
    if (processing.current) return;
    try {
      const data = await api();
      if (profile.current && profile.current !== data.dashboard!.profileId) {
        current.current = null; setTest(null); setRecovery(""); setRestoreCode(""); setRecoverMessage("");
      }
      profile.current = data.dashboard!.profileId;
      setDashboard(data.dashboard!);
      if (data.dashboard!.activeTest) adopt(data.dashboard!.activeTest);
      else if (current.current && !current.current.finished) {
        const saved = await api(undefined, `?test=${encodeURIComponent(current.current.id)}`);
        if (saved.test?.finished) adopt(saved.test);
        else { current.current = null; setTest(null); }
      }
      setError("");
    } catch (problem) { setError((problem as Error).message); }
    finally { setLoaded(true); }
  }, [adopt]);
  useEffect(() => {
    const initial = setTimeout(() => void refresh(), 0);
    const timer = setInterval(() => { if (!document.hidden) void refresh(); }, 15000);
    const focus = () => { if (!document.hidden) void refresh(); };
    window.addEventListener("focus", focus);
    document.addEventListener("visibilitychange", focus);
    if ("BroadcastChannel" in window) { channel.current = new BroadcastChannel("atlas-quiz-progress"); channel.current.onmessage = () => void refresh(); }
    return () => { clearTimeout(initial); clearInterval(timer); window.removeEventListener("focus", focus); document.removeEventListener("visibilitychange", focus); channel.current?.close(); channel.current = null; };
  }, [refresh]);

  async function mutate(body: Record<string, unknown>, apply: (data: Reply) => void) {
    if (processing.current) return;
    processing.current = true; setBusy(true); setError("");
    try {
      const data = await api(body);
      apply(data);
      channel.current?.postMessage("changed");
    } catch (problem) { setError((problem as Error).message); }
    finally { processing.current = false; setBusy(false); }
  }
  function toggleTopic(topic: QuizTopic) { setSettings(s => ({ ...s, topics: s.topics.includes(topic) ? s.topics.filter(t => t !== topic) : [...s.topics, topic] })); }
  async function start() {
    await mutate({ action: "start", settings }, data => { adopt(data.test!, true); setEndConfirm(false); });
  }
  async function answer() {
    if (!test || chosen === null) return;
    await mutate({ action: "answer", testId: test.id, questionId: test.questions[index].id, chosen }, data => {
      const saved = data.test!;
      adopt(saved);
      setChosen(null);
      if (saved.settings.feedback === "end") setIndex(Math.min(saved.answered, saved.questions.length - 1));
    });
    if (current.current?.finished) await refresh();
  }
  async function restore() {
    await mutate({ action: "restore", code: restoreCode }, data => {
      current.current = null; setTest(null); setRecovery(""); setRestoreCode("");
      profile.current = data.dashboard!.profileId;
      setDashboard(data.dashboard!);
      if (data.dashboard!.activeTest) adopt(data.dashboard!.activeTest, true);
      setRecoverMessage("Your saved profile is connected. This browser now uses the same progress.");
    });
  }
  async function openHistory(id: string) {
    setError(""); setBusy(true);
    try { const data = await api(undefined, `?test=${encodeURIComponent(id)}`); adopt(data.test!, true); document.getElementById("q-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" }); }
    catch (problem) { setError((problem as Error).message); }
    finally { setBusy(false); }
  }
  const question = test?.questions[index];
  const answered = question?.chosen !== undefined;
  const correctInTest = test?.questions.filter(q => q.correct).length ?? 0;

  return <div className="q-shell">
    <div className="q-intro"><div><div className="eyebrow">PHYSICS PRACTICE</div><h1>Practice physics.</h1><p>Three correct answers in a row, across separate tests, marks a question mastered.</p></div><div className="q-save-label"><span aria-hidden="true">◉</span> {dashboard ? "Progress saved to your profile" : "Connecting to saved progress…"}</div></div>
    {error && <div className="q-alert" role="alert"><span>{error}</span><button onClick={() => void refresh()} disabled={busy}>Reconnect</button></div>}
    {!loaded && <div className="q-loading" role="status">Opening your practice room…</div>}
    {loaded && !dashboard && <div className="q-empty"><h2>Let’s reconnect your progress.</h2><p>The practice room needs a connection to save your answers.</p><button className="primary" onClick={() => void refresh()}>Try again</button></div>}
    {dashboard && <>
      <section className="q-totals" aria-label="Your saved progress"><div><strong>{dashboard.attempts}</strong><span>Answers saved</span></div><div><strong>{percent(dashboard.correct, dashboard.attempts)}</strong><span>Overall accuracy</span></div><div><strong>{dashboard.mastered}<small> / {dashboard.totalQuestions}</small></strong><span>Questions mastered</span></div><div><strong>{dashboard.mistakes}</strong><span>Previously missed</span></div></section>
      <div className="q-layout"><section id="q-workspace" className="q-workspace">
        {!test && <>
          <div className="q-section-heading"><span>01 / YOUR NEXT TEST</span><h2>Build a test</h2><p>{dashboard.totalQuestions} questions · {QUIZ_TOPICS.length} topics · {dashboard.hardQuestions} hard</p></div>
          <form onSubmit={event => { event.preventDefault(); void start(); }}>
            <fieldset disabled={busy}><legend>Topics</legend><div className="q-topic-buttons">{QUIZ_TOPICS.map(topic => <button key={topic} type="button" className={settings.topics.includes(topic) ? "selected" : ""} aria-pressed={settings.topics.includes(topic)} onClick={() => toggleTopic(topic)}><span aria-hidden="true">{settings.topics.includes(topic) ? "✓" : "+"}</span> {topic}</button>)}</div><button className="q-text-button" type="button" onClick={() => setSettings(s => ({ ...s, topics: s.topics.length === QUIZ_TOPICS.length ? [] : [...QUIZ_TOPICS] }))}>{settings.topics.length === QUIZ_TOPICS.length ? "Clear selection" : "Select all topics"}</button></fieldset>
            <div className="q-settings-row"><label>Number of questions<input type="number" min="1" max="100" step="1" required value={settings.count} disabled={busy} onChange={e => setSettings(s => ({ ...s, count: Number(e.target.value) }))}/><small>1–100, limited to unique matching questions</small></label><label>Show the answer<select disabled={busy} value={settings.feedback} onChange={e => setSettings(s => ({ ...s, feedback: e.target.value as QuizSettings["feedback"] }))}><option value="immediate">After each question</option><option value="end">At the end of the test</option></select><small>Explanations included in both modes</small></label></div>
            <div className="q-filters"><label><input type="checkbox" checked={settings.hardOnly} disabled={busy} onChange={e => setSettings(s => ({ ...s, hardOnly: e.target.checked }))}/><span><b>Hard questions only</b></span></label><label><input type="checkbox" checked={settings.mistakesOnly} disabled={busy} onChange={e => setSettings(s => ({ ...s, mistakesOnly: e.target.checked }))}/><span><b>Questions I’ve missed</b><small>Frequent mistakes first</small></span></label></div>
            <div className="q-start-row"><button className="primary" disabled={busy || !settings.topics.length}>{busy ? "Preparing…" : "Start my test"}</button><p>No repeats within a test.</p></div>
          </form>
        </>}
        {test && !test.finished && question && <div className="q-active">
          <div className="q-test-meta"><span>{test.settings.feedback === "immediate" ? "LEARN AS YOU GO" : "ANSWERS AT THE END"}</span><span>{test.answered} / {test.questions.length} saved</span></div>
          <progress className="q-progress" value={test.answered} max={test.questions.length} aria-label="Test completion" />
          {test.notice && <p className="q-notice">{test.notice}</p>}
          <div className="q-question-meta"><span>{question.topic}</span><span>{question.difficulty}</span><span>Question {index + 1} of {test.questions.length}</span></div>
          <h2 className="q-question-title"><QuizText text={question.prompt}/></h2>
          <div className="q-answers" role="radiogroup" aria-label="Choose your answer">{question.options.map((option, i) => <button key={i} type="button" role="radio" aria-checked={answered ? question.chosen === i : chosen === i} disabled={busy || answered} onClick={() => setChosen(i)} className={`${(answered ? question.chosen === i : chosen === i) ? "chosen" : ""} ${answered && question.answer === i ? "right" : ""} ${answered && question.correct === false && question.chosen === i ? "wrong" : ""}`}><span className="q-letter">{String.fromCharCode(65 + i)}</span><span><QuizText text={option}/></span>{answered && question.answer === i && <b className="q-answer-tag">Correct</b>}{answered && question.correct === false && question.chosen === i && <b className="q-answer-tag">Your answer</b>}</button>)}</div>
          {answered && question.explanation && <Explanation question={question}/>}
          {answered && !question.explanation && <p className="q-notice">Answer saved. The explanation and score will appear when you finish the test.</p>}
          <div className="q-answer-actions">{!answered ? <button className="primary" disabled={busy || chosen === null} onClick={() => void answer()}>{busy ? "Saving answer…" : "Save my answer"}</button> : <button className="primary" disabled={busy} onClick={() => { setIndex(Math.min(test.answered, test.questions.length - 1)); setChosen(null); }}>{test.answered < test.questions.length ? "Next question" : "See results"}</button>}<span>Saved answers cannot be changed.</span></div>
          {test.answered > 0 && <details className="q-in-test-review"><summary>Review your {test.answered} saved answer{test.answered !== 1 ? "s" : ""}</summary>{test.questions.filter(q => q.chosen !== undefined).map(q => <div key={q.id}><b><QuizText text={q.prompt}/></b><p>Your answer: <QuizText text={q.options[q.chosen!]}/></p>{q.explanation && <Explanation question={q}/>}</div>)}</details>}
          <div className="q-end-test">{!endConfirm ? <button className="q-text-button" disabled={busy} onClick={() => setEndConfirm(true)}>End this test early</button> : <><p>Your {test.answered} saved answer{test.answered !== 1 ? "s" : ""} will count toward progress. Unanswered questions will stay available for later tests.</p><button className="secondary" disabled={busy} onClick={() => void mutate({ action: "abandon", testId: test.id }, data => { current.current = null; setTest(null); setDashboard(data.dashboard!); setEndConfirm(false); })}>End and keep saved answers</button><button className="q-text-button" onClick={() => setEndConfirm(false)}>Keep going</button></>}</div>
        </div>}
        {test?.finished && <div className="q-results"><div className="q-section-heading"><span>TEST COMPLETE · {when(test.finishedAt!)}</span><h2>{correctInTest} of {test.questions.length} correct.</h2><p>Score: {percent(correctInTest, test.questions.length)}.</p></div><button className="primary" onClick={() => { current.current = null; setTest(null); void refresh(); }}>Build another test</button><h3>Review the reasoning</h3>{test.questions.map((q, i) => <details key={`${test.id}-${q.id}`} className={`q-result-item ${q.correct ? "is-right" : "is-wrong"}`} open={!q.correct}><summary><span className="q-result-symbol" aria-hidden="true">{q.correct ? "✓" : "×"}</span><span><small>{i + 1} · {q.topic} · {q.correct ? "Correct" : "Revisit"}</small><b><QuizText text={q.prompt}/></b></span><span aria-hidden="true">+</span></summary><div className="q-result-content"><p><strong>Your answer:</strong> <QuizText text={q.options[q.chosen!]}/></p>{!q.correct && <p><strong>Correct answer:</strong> <QuizText text={q.options[q.answer!]}/></p>}<Explanation question={q}/></div></details>)}</div>}
      </section>
      <aside className="q-sidebar"><section className="q-topic-progress"><span className="q-kicker">02 / YOUR PROGRESS</span><h2>Topic accuracy</h2><p>Includes repeat attempts in completed or ended tests.</p>{dashboard.topics.map(topic => <div key={topic.topic} className="q-topic-stat"><div><b>{topic.topic}</b><strong>{topic.accuracy === null ? "—" : `${topic.accuracy}%`}</strong></div><progress value={topic.accuracy ?? 0} max={100} aria-label={`${topic.topic} accuracy`}/><small>{topic.correct} / {topic.attempts} correct · {topic.mastered} / {topic.available} mastered</small></div>)}<div className="q-mastery-note"><b>What counts as mastered?</b><p>Three consecutive correct answers to the same question across different tests. A wrong answer resets the streak. Mastered questions remain available for revision.</p></div></section></aside></div>
      <div className="q-bottom-grid"><section className="q-trouble"><div className="q-section-heading"><span>03 / RETURN TO THESE</span><h2>Frequent mistakes</h2></div>{!dashboard.trouble.length ? <p>No missed questions yet.</p> : <><p>Priority questions for your next test.</p><ul>{dashboard.trouble.map(q => <li key={q.id}><span>{q.topic} · {q.wrong} miss{q.wrong !== 1 ? "es" : ""}</span><p><QuizText text={q.prompt}/></p><small>{Math.min(q.streak, 3)} / 3 consecutive correct {q.streak >= 3 ? "· Mastered" : ""}</small></li>)}</ul></>}</section><div className="q-account-column"><section className="q-history"><div className="q-section-heading"><span>04 / RECENT TESTS</span><h2>Recent tests</h2></div>{!dashboard.recentTests.length ? <p>No completed tests yet.</p> : dashboard.recentTests.map(t => <button key={t.id} disabled={busy || !!dashboard.activeTest} title={dashboard.activeTest ? "Finish or end your current test to review earlier tests" : "Review this test"} onClick={() => void openHistory(t.id)}><span>{when(t.finishedAt)}<small>{t.correct} of {t.count} correct</small></span><strong>{percent(t.correct, t.count)}</strong></button>)}{dashboard.activeTest && dashboard.recentTests.length > 0 && <small className="q-muted">Finish or end this test to reopen earlier results.</small>}</section>
      <section className="q-recovery"><span className="q-kicker">KEEP YOUR PROGRESS WITH YOU</span><h2>Recovery code</h2><p>This browser remembers your profile automatically. Save a recovery code to reconnect from another browser or device, or after clearing cookies. Anyone with the code can access this quiz profile.</p><details><summary>{dashboard.hasRecovery ? "Replace my recovery code" : "Create a recovery code"}</summary>{dashboard.hasRecovery && <p>Creating a new code replaces the previous code. Already connected browsers stay connected.</p>}<button className="secondary" disabled={busy} onClick={() => void mutate({ action: "recovery" }, data => { setRecovery(data.code!); setDashboard(d => d ? { ...d, hasRecovery: true } : d); setRecoverMessage(""); })}>{recovery ? "Generate a replacement code" : "Generate my code"}</button>{recovery && <div className="q-secret"><label>Save this code somewhere private<textarea readOnly value={recovery} spellCheck={false} onFocus={e => e.currentTarget.select()}/></label><p>The code is only shown after you create it.</p><button className="q-text-button" onClick={async () => { try { await navigator.clipboard.writeText(recovery); setRecoverMessage("Recovery code copied."); } catch { setRecoverMessage("Select the code above and copy it manually."); } }}>Copy code</button></div>}</details><details><summary>Connect an existing profile</summary><p>Use the code from your other browser. This switches the current browser to that profile. Save a code for this profile first if you want to return to it.</p><form onSubmit={e => { e.preventDefault(); void restore(); }}><label>Saved recovery code<textarea value={restoreCode} onChange={e => setRestoreCode(e.target.value)} placeholder="ATLAS-…" autoComplete="off" spellCheck={false} required maxLength={100}/></label><button className="secondary" disabled={busy || !restoreCode.trim()}>Connect my saved progress</button></form></details>{recoverMessage && <p role="status" className="q-recovery-message">{recoverMessage}</p>}</section></div></div>
    </>}
  </div>;
}
