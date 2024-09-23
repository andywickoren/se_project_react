const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function addItem({ name, link, weatherType }) {
  console.log({ name, link, weatherType });
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, link, weatherType }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function deleteItem(id) {
  const url = `${baseUrl}/items/${id}`;
  console.log("Delete URL:", url);
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.ok
      ? Promise.resolve("Item deleted successfully")
      : Promise.reject(`Error: ${res.status}`);
  });
}

export { addItem };
export { getItems };
export { deleteItem };
