import { apiRequest } from "./api";

export function getNotifications(params = {}) {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null)
  ).toString();
  return apiRequest(`/api/v1/notifications${qs ? `?${qs}` : ""}`, { method: "GET" });
}

export function markNotificationRead(id) {
  return apiRequest(`/api/v1/notifications/${id}/read`, { method: "PATCH" });
}

export function markAllNotificationsRead() {
  return apiRequest("/api/v1/notifications/mark-all-read", { method: "PATCH" });
}

export function deleteNotification(id) {
  return apiRequest(`/api/v1/notifications/${id}`, { method: "DELETE" });
}
