import { apiRequest } from "./api";

export function getMyTeam() {
  return apiRequest("/api/v1/teams/my");
}

export function createTeam(body) {
  return apiRequest("/api/v1/teams", { method: "POST", body });
}

export function inviteMember(teamId, body) {
  return apiRequest(`/api/v1/teams/${teamId}/invite`, { method: "POST", body });
}

export function getTeamMembers(teamId) {
  return apiRequest(`/api/v1/teams/${teamId}/members`, { method: "GET" });
}

export function patchTeamMember(teamId, userId, body) {
  return apiRequest(`/api/v1/teams/${teamId}/members/${userId}`, { method: "PATCH", body });
}

export function getTeamActivity(teamId, params = {}) {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null)
  ).toString();
  return apiRequest(`/api/v1/teams/${teamId}/activity${qs ? `?${qs}` : ""}`, { method: "GET" });
}

export function getMyActivity(params = {}) {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null)
  ).toString();
  return apiRequest(`/api/v1/activity${qs ? `?${qs}` : ""}`, { method: "GET" });
}
