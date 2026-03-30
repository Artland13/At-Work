export const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const API_ENDPOINTS = {
  USERS: "/users",
  USER: (id: number) => `/users/${id}`,
} as const;

export const QUERY_KEYS = {
  USERS: "users",
  USER: (id: number) => ["user", id],
} as const;
