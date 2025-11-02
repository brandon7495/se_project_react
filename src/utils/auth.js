import { request, baseUrl } from "./api";

function signUp({ email, password, name, avatar }) {
  return request(`${baseUrl}/signup`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      name,
      avatar,
    }),
  });
}

function signIn({ email, password }) {
  return request(`${baseUrl}/signin`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export { signUp, signIn };
