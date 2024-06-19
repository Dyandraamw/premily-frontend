export function saveToken(token) {
  localStorage.setItem("authToken", token);
}

export function saveRefreshToken(refreshToken) {
  localStorage.setItem("refreshToken", refreshToken);
}

export function getToken() {
  return localStorage.getItem("authToken");
}

export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

export function removeToken() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
}
