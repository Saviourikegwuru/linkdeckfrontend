import { apiRequest } from "./api";

export function getAnalyticsSummary(params = {}) {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null)
  ).toString();
  return apiRequest(`/api/v1/analytics/summary${qs ? `?${qs}` : ""}`, { method: "GET" });
}

export function getAnalyticsTimeseries(params = {}) {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null)
  ).toString();
  return apiRequest(`/api/v1/analytics/timeseries${qs ? `?${qs}` : ""}`, { method: "GET" });
}

export function getProfileAnalytics() {
  return apiRequest("/api/v1/analytics/profile", { method: "GET" });
}

export function getAccountHealth() {
  return apiRequest("/api/v1/accounts/health", { method: "GET" });
}

export function getPostAnalytics(postId) {
  return apiRequest(`/api/v1/analytics/posts/${postId}`, { method: "GET" });
}

export function getWidgets() {
  return apiRequest("/api/v1/analytics/widgets", { method: "GET" });
}

export function getWidgetData(id) {
  return apiRequest(`/api/v1/analytics/widgets/${id}/data`, { method: "GET" });
}

export function createWidget(payload) {
  return apiRequest("/api/v1/analytics/widgets", { method: "POST", body: payload });
}

export function updateWidget(id, payload) {
  return apiRequest(`/api/v1/analytics/widgets/${id}`, { method: "PATCH", body: payload });
}

export function deleteWidget(id) {
  return apiRequest(`/api/v1/analytics/widgets/${id}`, { method: "DELETE" });
}

export function reorderWidgets(payload) {
  return apiRequest("/api/v1/analytics/widgets/reorder", { method: "PATCH", body: payload });
}
