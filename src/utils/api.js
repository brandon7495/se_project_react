const baseUrl = "http://localhost:3001";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function request(url, options = {}) {
  return fetch(url, options).then(checkResponse);
}

function getItems() {
  return request(`${baseUrl}/items`);
}

function postItems({ name, imageUrl, weather }) {
  return request(`${baseUrl}/items`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
}

function deleteItems(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
}

export { getItems, postItems, deleteItems, request, baseUrl };
