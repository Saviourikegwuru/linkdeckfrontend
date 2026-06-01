import { apiRequest } from "./api";

export function getRecentConversations() {
  return apiRequest("/api/v1/messages/recent", { method: "GET" });
}

export function getConversation(params = {}) {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null)
  ).toString();
  return apiRequest(`/api/v1/messages/conversation${qs ? `?${qs}` : ""}`, { method: "GET" });
}

export function sendMessage(body) {
  return apiRequest("/api/v1/messages", { method: "POST", body });
}

export function markConversationRead(body) {
  return apiRequest("/api/v1/messages/mark-read", { method: "POST", body });
}
