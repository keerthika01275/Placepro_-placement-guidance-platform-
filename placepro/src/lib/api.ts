export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export async function getCurrentUser() {
  const token = getToken();

  if (!token) return null;

  try {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) return null;

    return data.user;
  } catch {
    return null;
  }
}

export async function getAptitudeQuestions() {
  const token = getToken();

  const res = await fetch(`${API_URL}/api/aptitude/questions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

export async function submitAptitudeAttempt(
  answers: any[],
  topic = "Mixed",
  timeSpent = 0
) {
  const token = getToken();

  const res = await fetch(`${API_URL}/api/aptitude/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ answers, topic, timeSpent }),
  });

  return res.json();
}