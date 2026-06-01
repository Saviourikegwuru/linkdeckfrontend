import { apiRequest } from "./api";

export function getMe() {
  return apiRequest("/api/v1/profiles/me", { method: "GET" });
}

export function updateMe(payload) {
  return apiRequest("/api/v1/profiles/me", { method: "PATCH", body: payload });
}

export function getProfiles() {
  return apiRequest("/api/v1/profiles", {
    method: "GET",
  });
}

export function connectProfile(payload) {
  return apiRequest("/api/v1/profiles/connect", {
    method: "POST",
    body: payload,
  });
}

export function deleteProfile(id) {
  return apiRequest(`/api/v1/profiles/${id}`, {
    method: "DELETE",
  });
}
