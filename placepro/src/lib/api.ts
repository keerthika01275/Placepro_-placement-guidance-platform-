export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function getToken() {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("token");
}

/* =========================================================
   AUTH
========================================================= */

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

/* =========================================================
   APTITUDE
========================================================= */

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
    body: JSON.stringify({
      answers,
      topic,
      timeSpent,
    }),
  });

  return res.json();
}

/* =========================================================
   MOCK TEST
========================================================= */

export async function getMockTestQuestions() {
  const token = getToken();

  const res = await fetch(`${API_URL}/api/aptitude/questions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

export async function submitMockTest(
  answers: any[],
  topic = "Mock Test",
  timeSpent = 0
) {
  const token = getToken();

  const res = await fetch(`${API_URL}/api/aptitude/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      answers,
      topic,
      timeSpent,
    }),
  });

  return res.json();
}

/* =========================================================
   GD MODULE
========================================================= */

export async function getGDTopics(params?: {
  category?: string;
  difficulty?: string;
  search?: string;
}) {
  const token = getToken();

  const query = new URLSearchParams();

  if (params?.category && params.category !== "All") {
    query.append("category", params.category);
  }

  if (params?.difficulty && params.difficulty !== "All") {
    query.append("difficulty", params.difficulty);
  }

  if (params?.search) {
    query.append("search", params.search);
  }

  const res = await fetch(
    `${API_URL}/api/gd/topics?${query.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.json();
}

export async function getGDTopicById(id: string) {
  const token = getToken();

  const res = await fetch(`${API_URL}/api/gd/topics/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

/* =========================================================
   FAVORITES (LOCAL STORAGE)
========================================================= */

export function getFavoriteGDTopics(): string[] {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem("favoriteGDTopics");

  return saved ? JSON.parse(saved) : [];
}

export function saveFavoriteGDTopic(id: string) {
  if (typeof window === "undefined") return;

  const favorites = getFavoriteGDTopics();

  if (!favorites.includes(id)) {
    const updated = [...favorites, id];

    localStorage.setItem(
      "favoriteGDTopics",
      JSON.stringify(updated)
    );
  }
}

export function removeFavoriteGDTopic(id: string) {
  if (typeof window === "undefined") return;

  const favorites = getFavoriteGDTopics();

  const updated = favorites.filter((item) => item !== id);

  localStorage.setItem(
    "favoriteGDTopics",
    JSON.stringify(updated)
  );
}

export function isFavoriteGDTopic(id: string) {
  const favorites = getFavoriteGDTopics();

  return favorites.includes(id);
}