import { apiRequest } from "./api";

// Saved searches
export function getSearches() {
  return apiRequest("/api/v1/searches", { method: "GET" });
}

export function createSearch(body) {
  return apiRequest("/api/v1/searches", { method: "POST", body });
}

export function updateSearch(id, body) {
  return apiRequest(`/api/v1/searches/${id}`, { method: "PATCH", body });
}

export function deleteSearch(id) {
  return apiRequest(`/api/v1/searches/${id}`, { method: "DELETE" });
}

// Prospect lists
export function getProspects() {
  return apiRequest("/api/v1/prospects", { method: "GET" });
}

export function createProspectList(body) {
  return apiRequest("/api/v1/prospects", { method: "POST", body });
}

export function updateProspectList(id, body) {
  return apiRequest(`/api/v1/prospects/${id}`, { method: "PATCH", body });
}

export function deleteProspectList(id) {
  return apiRequest(`/api/v1/prospects/${id}`, { method: "DELETE" });
}

export function addProspect(listId, body) {
  return apiRequest(`/api/v1/prospects/${listId}/members`, { method: "POST", body });
}

export function removeProspect(listId, prospectId) {
  return apiRequest(`/api/v1/prospects/${listId}/members/${prospectId}`, { method: "DELETE" });
}
