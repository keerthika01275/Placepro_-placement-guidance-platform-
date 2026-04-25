"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { getAptitudeQuestions, submitAptitudeAttempt } from "@/lib/api";
import { toast } from "sonner";

const TOTAL_TIME = 300; // 5 minutes

export default function AptitudePage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);
  const [time, setTime] = useState(TOTAL_TIME);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function loadQuestions() {
      const data = await getAptitudeQuestions();
      setQuestions(data.questions || []);
    }

    loadQuestions();
  }, []);

  useEffect(() => {
    if (submitted) return;

    if (time <= 0) {
      handleSubmit(true);
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, submitted]);

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  function chooseAnswer(questionId: string, option: string) {
    if (submitted) return;

    setSelected({
      ...selected,
      [questionId]: option,
    });
  }

  async function handleSubmit(auto = false) {
    if (submitted) return;

    const answers = Object.keys(selected).map((questionId) => ({
      questionId,
      selected: selected[questionId],
    }));

    if (!auto && answers.length !== questions.length) {
      toast.error("Please answer all questions");
      return;
    }

    const timeSpent = TOTAL_TIME - time;

    const data = await submitAptitudeAttempt(
      answers,
      "Aptitude Test",
      timeSpent
    );

    setResult(data);
    setSubmitted(true);

    if (auto) toast.warning("Time up! Test auto-submitted");
    else toast.success("Test submitted successfully");
  }

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="premium-heading text-5xl">Aptitude Test</h1>
            <p className="mt-2 text-[var(--muted)]">
              Attempt all questions before time runs out.
            </p>
          </div>

          <div className="rounded-2xl bg-red-600 px-6 py-3 text-xl font-black text-white shadow-[0_0_25px_rgba(229,9,20,0.6)]">
            ⏳ {formatTime(time)}
          </div>
        </div>

        {result && (
          <div className="card p-6">
            <h2 className="text-2xl font-black">Result</h2>
            <p className="mt-2 text-lg">
              Score: {result.score}/{result.total}
            </p>
            <p className="text-lg">Accuracy: {result.accuracy}%</p>
            <p className="text-lg">Time Spent: {result.timeSpent || TOTAL_TIME - time}s</p>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-4">
          <div className="space-y-6 lg:col-span-3">
            {questions.map((q, index) => (
              <div id={`q-${q._id}`} key={q._id} className="card p-6">
                <h2 className="text-xl font-black">
                  {index + 1}. {q.question}
                </h2>

                <p className="mt-2 text-sm text-[var(--muted)]">
                  {q.category} • {q.topic} • {q.difficulty}
                </p>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {q.options.map((option: string) => (
                    <button
                      key={option}
                      disabled={submitted}
                      onClick={() => chooseAnswer(q._id, option)}
                      className={`rounded-2xl border p-4 text-left font-semibold transition ${
                        selected[q._id] === option
                          ? "border-red-600 bg-red-600 text-white"
                          : "border-[var(--border)] hover:bg-red-600 hover:text-white"
                      } ${submitted ? "cursor-not-allowed opacity-60" : ""}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {result && (
                  <div className="mt-5 rounded-2xl bg-black/5 p-4 dark:bg-white/5">
                    <p className="font-bold">
                      Correct Answer:{" "}
                      <span className="text-red-500">{q.answer}</span>
                    </p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="card sticky top-24 h-fit p-4">
            <h2 className="text-lg font-black">Question Palette</h2>

            <div className="mt-4 grid grid-cols-5 gap-2">
              {questions.map((q, index) => {
                const answered = selected[q._id];

                return (
                  <button
                    key={q._id}
                    onClick={() =>
                      document
                        .getElementById(`q-${q._id}`)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className={`rounded-lg p-2 text-sm font-bold ${
                      answered
                        ? "bg-green-500 text-white"
                        : "bg-black/10 text-[var(--text)] dark:bg-white/10 dark:text-white"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 space-y-2 text-sm">
              <p>
                <span className="mr-2 inline-block h-3 w-3 rounded bg-green-500" />
                Answered
              </p>
              <p>
                <span className="mr-2 inline-block h-3 w-3 rounded bg-black/20 dark:bg-white/20" />
                Not answered
              </p>
            </div>
          </div>
        </div>

        {!submitted && questions.length > 0 && (
          <button onClick={() => handleSubmit(false)} className="btn-primary">
            Submit Test
          </button>
        )}
      </div>
    </AppShell>
  );
}