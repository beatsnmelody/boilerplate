import React, { useState } from "react";
import { fetchAllProducts } from "../apiFrontend/api";
import { createProducts } from "../apiFrontend/api";


const Products = (props) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const allProducts = await fetchAllProducts();
            setProducts(allProducts);
          }; fetchProducts();
    }, [props.isLoggedIn, props.setIsLoggedIn]);
    return(

    );
};

export default Products;