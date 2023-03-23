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

export const fetchPublicReviews = async () => {
  const res = await fetch(`${APIURL}/reviews`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = res.json();
  return json;
};

export const createReview = async (productId, userId, title, description, rating,
  isPublic) => {
  const res = await fetch(`${APIURL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId: `${productId}`,
      userId: `${userId}`,
      title: `${title}`,
      description: `${description}`,
      rating: `${rating}`,
      isPublic: `${isPublic}`,
    }),
  });
  const json = await res.json();
  return json;
};

export const editReview = async (productId, userId, title, description, rating,
  isPublic) => {
  const res = await fetch(`${APIURL}/reviews/${reviewId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId: `${productId}`,
      userId: `${userId}`,
      title: `${title}`,
      description: `${description}`,
      rating: `${rating}`,
      isPublic: `${isPublic}`,
    }),
  });
  const json = await res.json();
  return json;
};

export const deleteReview = async (reviewId) => {
  const res = await fetch(`${APIURL}/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();
  return json;
};

export const createCart = async (userId) => {
  const res = await fetch(`${APIURL}/shoppingCart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: `${userId}`,
    }),
  });
  const json = await res.json();
  return json;
};

export const createCartItems = async (productId, productPrice, productQuantity, productImage, cartId) => {
  const res = await fetch(`${APIURL}/shoppingCart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId: `${productId}`,
      productPrice: `${productPrice}`,
      productQuantity: `${productQuantity}`,
      productImage: `${productImage}`,
      cartId: `${cartId}`,
    }),
  });
  const json = await res.json();
  return json;
};

export const fetchCurrentCart = async () => {
  const res = await fetch(`${APIURL}/shoppingCart`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = res.json();
  return json;
};

export const fetchCartItems = async ({userId}) => {
  const res = await fetch(`${APIURL}/shoppingCart`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = res.json();
  return json;
}

export const editCart = async (productId, productPrice, productQuantity, productImage, cartId) => {
  const res = await fetch(`${APIURL}/reviews/${cartId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId: `${productId}`,
      productPrice: `${productPrice}`,
      productQuantity: `${productQuantity}`,
      productImage: `${productImage}`,
      cartId: `${cartId}`,
    }),
  });
  const json = await res.json();
  return json;
};

export const deleteCart = async (cartId) => {
  const res = await fetch(`${APIURL}/reviews/${cartId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();
  return json;
};
