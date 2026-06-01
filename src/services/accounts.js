import { apiRequest } from "./api";

export function getAccounts() {
  return apiRequest("/api/v1/accounts", {
    method: "GET",
  });
}

export function getActiveAccount() {
  return apiRequest("/api/v1/accounts/active", {
    method: "GET",
  });
}

export function getAccountBadges() {
  return apiRequest("/api/v1/accounts/badges", {
    method: "GET",
  });
}

export function switchAccount(payload) {
  return apiRequest("/api/v1/accounts/switch", {
    method: "POST",
    body: payload,
  });
}

export function getAccountsHealth() {
  return apiRequest("/api/v1/accounts/health", { method: "GET" });
}
