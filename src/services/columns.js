import { apiRequest } from "./api";

export function getColumns() {
  return apiRequest("/api/v1/columns", { method: "GET" });
}

export function createColumn(payload) {
  return apiRequest("/api/v1/columns", { method: "POST", body: payload });
}

export function updateColumn(id, payload) {
  return apiRequest(`/api/v1/columns/${id}`, { method: "PATCH", body: payload });
}

export function deleteColumn(id) {
  return apiRequest(`/api/v1/columns/${id}`, { method: "DELETE" });
}

export function reorderColumns(payload) {
  return apiRequest("/api/v1/columns/reorder", { method: "PATCH", body: payload });
}
