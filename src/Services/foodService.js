import http from "./httpService";

export function getFoods() {
  return http.get("http://localhost:8000/api/foods");
}

export function getFood(id) {
  return http.get(`http://localhost:8000/api/foods/${id}`);
}

export function deleteFood(id) {
  return http.delete(`http://localhost:8000/api/foods/${id}`);
}

export function saveFood(food) {
  return http.post("http://localhost:8000/api/foods", food);
}
