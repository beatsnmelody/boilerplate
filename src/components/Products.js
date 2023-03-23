import React, { useState, useEffect } from "react";
import { fetchAllProducts, createProducts } from "../apiFrontend/api";
import Reviews from "./Reviews";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        const allProducts = await fetchAllProducts();
        setProducts(allProducts);
      };
      fetchProducts();
    }, []);
    console.log(products);
    return (
        <div>
          <h1 className="header">
            ALL PRODUCTS
          </h1>
          <div className="products">
            {products.map((product) => (
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
                
                <img src={product.productImage} width="300px" height="300px">
                </img>
                <Reviews productId = {product.id}/>
              </div>
            ))}
          </div>
        </div>
      );
    };

export default Products;