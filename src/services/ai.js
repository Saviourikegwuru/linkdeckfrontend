import { apiRequest } from "./api";

export function suggestReplies(body) {
  return apiRequest("/api/v1/ai/suggest-replies", { method: "POST", body });
}

export function getProfileSummary(profileId) {
  return apiRequest(`/api/v1/ai/profile-summary/${profileId}`, { method: "GET" });
}

export function suggestComments(body) {
  return apiRequest("/api/v1/ai/suggest-comments", { method: "POST", body });
}
