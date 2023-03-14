const APIURL = "http://localhost:4000/api";
const token = localStorage.getItem("token");
//POST register user
export const fetchRegister = async (username, email, password, phoneNumber) => {
  const res = await fetch(`${APIURL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: `${username}`,
      email: `${email}`,
      password: `${password}`,
      phoneNumber: `${phoneNumber}`
    }),
  });
  const json = await res.json();
  console.log(json);
  return json;
};

export const fetchLogin = async (username, password) => {
  const res = await fetch(`${APIURL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: `${username}`,
      password: `${password}`,
    }),
  });
  const json = await res.json();
  console.log(json);
  return json;
};

export const fetchUser = async (token) => {
  const res = await fetch(`${APIURL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();
  return json;
};

export const fetchAllProducts = async () => {
  const res = await fetch(`${APIURL}/products`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  return json;
};

export const createProducts = async (productName, productCategory, description, price, productImage) => {
  const res = await fetch(`${APIURL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productName: `${productName}`,
      productCategory: `${productCategory}`,
      description: `${description}`,
      price: `${price}`,
      productImage: `${productImage}`
    }),
  });
  const json = await res.json();
  return json;
};