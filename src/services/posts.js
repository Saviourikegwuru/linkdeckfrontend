import { apiRequest } from "./api";

export function getPosts(params = {}) {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null)
  ).toString();
  return apiRequest(`/api/v1/posts${qs ? `?${qs}` : ""}`, { method: "GET" });
}

export function createPost(payload) {
  return apiRequest("/api/v1/posts", { method: "POST", body: payload });
}

export function updatePost(id, payload) {
  return apiRequest(`/api/v1/posts/${id}`, { method: "PATCH", body: payload });
}

export function deletePost(id) {
  return apiRequest(`/api/v1/posts/${id}`, { method: "DELETE" });
}

export function publishPost(id) {
  return apiRequest(`/api/v1/posts/${id}/publish-now`, { method: "POST" });
}
