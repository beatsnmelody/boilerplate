import React, { useState, useEffect } from "react";
import { createCart, createCartItems, fetchCurrentCart, fetchCartItems, editCart, deleteCart } from "../apiFrontend/api";
import tinyTopHat from "./../assets/tinyTopHatNew.png"

const Cart = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (props.isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [props.isLoggedIn, props.setIsLoggedIn]);
  const [products, setProducts] = useState([]);

  return (
    <div>
      {products.filter((product) => product.id === cartItems.product.id).map((product) => (
        <div
          key={product.id}
          className="product"
        >

          <h1 className="product">
            {product.productName}
          </h1>

          <h1 className="product">
            {product.productCategory}
          </h1>

          <h1 className="product">
            {product.description}
          </h1>

          <h1 className="product">
            {product.price}
          </h1>
    </div>
      ))};
  <div>
    <h1 className="header">Shopping Cart</h1>
      <h2 className="header">My Order</h2>
      <img src={tinyTopHat} height="300px" width="300px"></img>
        <div class="bdy">Tiny Top Hat x1
        $20</div>
        <div class="header">Subtotal: $40</div>
         <button className="button">CHECKOUT</button>
         </div>
    </div>
  );
}

export default Cart;