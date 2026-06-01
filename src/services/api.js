const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

let refreshPromise = null;

export class ApiError extends Error {
  constructor(message, { status, code, data } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status ?? 500;
    this.code = code ?? null;
    this.data = data ?? null;
  }
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  if (contentType.startsWith("text/")) {
    return response.text();
  }

  return null;
}

async function refreshSessionRequest() {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new ApiError(data?.message || "Unable to refresh your session.", {
      status: response.status,
      code: data?.code,
      data,
    });
  }

  return data;
}

export async function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = refreshSessionRequest().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export async function apiRequest(path, options = {}) {
  const { body, headers = {}, retryOnAuth = true, ...rest } = options;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(isFormData ? {} : body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  const data = await parseResponse(response);

  if (
    response.status === 401 &&
    retryOnAuth &&
    data?.code === "TOKEN_EXPIRED" &&
    path !== "/api/v1/auth/refresh"
  ) {
    await refreshSession();
    return apiRequest(path, { ...options, retryOnAuth: false });
  }

  if (!response.ok) {
    throw new ApiError(data?.message || "Something went wrong.", {
      status: response.status,
      code: data?.code,
      data,
    });
  }

  return data;
}

export { API_BASE_URL };
