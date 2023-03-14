import React, { useState, useEffect } from "react";
import { fetchAllProducts, createProducts } from "../apiFrontend/api";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        const allProducts = await fetchAllProducts();
        setProducts(allProducts);
      };
      fetchProducts();
    }, []);

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

                <h1 className="product">
                  {product.productImage}
                </h1>

              </div>
            ))}
          </div>
        </div>
      );
    };

export default Products;