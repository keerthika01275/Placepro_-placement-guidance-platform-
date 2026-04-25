"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import StatCard from "@/components/StatCard";
import { getAptitudeQuestions, submitAptitudeAttempt } from "@/lib/api";
import { toast } from "sonner";

export default function MockTestsPage() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    async function loadQuestions() {
      const data = await getAptitudeQuestions();
      setQuestions(data.questions || []);
    }

    loadQuestions();
  }, []);

  function chooseAnswer(questionId: string, option: string) {
    setSelected({ ...selected, [questionId]: option });
  }

  async function submitTest() {
    const answers = Object.keys(selected).map((questionId) => ({
      questionId,
      selected: selected[questionId],
    }));

    if (answers.length !== questions.length) {
      toast.error("Please answer all questions");
      return;
    }

    const data = await submitAptitudeAttempt(answers, "Full Mock Test");
    setResult(data);
    toast.success("Mock test submitted");
  }

  if (!started) {
    return (
      <AppShell>
        <div className="space-y-8">
          <div>
            <h1 className="premium-heading text-5xl">Mock Tests</h1>
            <p className="mt-2 text-[var(--muted)]">
              Take full-length placement-style tests with score analysis.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <StatCard title="Questions" value={`${questions.length}`} subtitle="Total questions" />
            <StatCard title="Time" value="30m" subtitle="Demo timer" />
            <StatCard title="Negative Marking" value="No" subtitle="Beginner friendly" />
            <StatCard title="Level" value="Mixed" subtitle="All topics" />
          </div>

          <div className="card p-8">
            <h2 className="text-3xl font-black">Instructions</h2>
            <ul className="mt-5 space-y-3 text-[var(--muted)]">
              <li>• Read each question carefully.</li>
              <li>• Select one option for every question.</li>
              <li>• Submit only after completing all questions.</li>
              <li>• Your score and accuracy will be saved.</li>
            </ul>

            <button
              onClick={() => setStarted(true)}
              className="btn-primary mt-8"
            >
              Start Mock Test
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-8">
        <div>
          <h1 className="premium-heading text-5xl">Full Mock Test</h1>
          <p className="mt-2 text-[var(--muted)]">
            Answer all questions and submit to view result.
          </p>
        </div>

        {result && (
          <div className="card p-6">
            <h2 className="text-2xl font-black">Result Analysis</h2>
            <div className="mt-4 grid gap-6 md:grid-cols-3">
              <StatCard title="Score" value={`${result.score}/${result.total}`} subtitle="Correct answers" />
              <StatCard title="Accuracy" value={`${result.accuracy}%`} subtitle="Performance" />
              <StatCard title="Status" value="Saved" subtitle="Stored in MongoDB" />
            </div>
          </div>
        )}

        {questions.map((q, index) => (
          <div key={q._id} className="card p-6">
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
                  onClick={() => chooseAnswer(q._id, option)}
                  className={`rounded-2xl border p-4 text-left font-semibold transition ${
                    selected[q._id] === option
                      ? "border-red-600 bg-red-600 text-white"
                      : "border-[var(--border)] hover:bg-red-600 hover:text-white"
                  }`}
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

        {!result && questions.length > 0 && (
          <button onClick={submitTest} className="btn-primary">
            Submit Mock Test
          </button>
        )}
      </div>
    </AppShell>
  );
}