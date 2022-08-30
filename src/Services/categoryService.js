import http from "./httpService";

export function getCategories() {
  return http.get("http://localhost:8000/api/categories");
}
