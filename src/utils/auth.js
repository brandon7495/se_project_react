import { request, baseUrl } from "./api";

function signup({ email, password, name, avatar }) {
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

function signin({ email, password }) {
  return request(`${baseUrl}/signin`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export { signup, signin };
