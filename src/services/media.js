import { apiRequest } from "./api";

/** Upload a file. Pass a FormData instance as body. Returns { url, mediaId } */
export function uploadMedia(formData) {
  return apiRequest("/api/v1/media/upload", { method: "POST", body: formData });
}
