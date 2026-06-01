import { apiRequest } from "./api";

export function getOnboarding() {
  return apiRequest("/api/v1/onboarding", { method: "GET" });
}

export function updateOnboarding(body) {
  return apiRequest("/api/v1/onboarding", { method: "PATCH", body });
}
