import { apiRequest } from "./api";

export function signUp(payload) {
  return apiRequest("/api/v1/auth/signup", {
    method: "POST",
    body: payload,
  });
}

export function signIn(payload) {
  return apiRequest("/api/v1/auth/signin", {
    method: "POST",
    body: payload,
  });
}

export function logout() {
  return apiRequest("/api/v1/auth/logout", {
    method: "POST",
  });
}

export function forgotPassword(payload) {
  return apiRequest("/api/v1/auth/forgot-password", {
    method: "POST",
    body: payload,
  });
}

export function resetPassword(payload) {
  return apiRequest("/api/v1/auth/reset-password", {
    method: "POST",
    body: payload,
  });
}

export function changePassword(payload) {
  return apiRequest("/api/v1/auth/password", {
    method: "PATCH",
    body: payload,
  });
}

export function getCurrentUser() {
  return apiRequest("/api/v1/profiles/me", {
    method: "GET",
  });
}

async function startOAuth(provider) {
  const data = await apiRequest(`/api/v1/auth/${provider}/start`, {
    method: "GET",
  });

  if (!data?.redirectUrl) {
    throw new Error(`Missing ${provider} redirect URL.`);
  }

  window.location.assign(data.redirectUrl);
}

export function startGoogleAuth() {
  return startOAuth("google");
}

export function startLinkedInAuth() {
  return startOAuth("linkedin");
}
