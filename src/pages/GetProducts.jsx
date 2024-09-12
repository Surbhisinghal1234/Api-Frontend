import React, { useContext, useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import "../App.css";
import Product from "../components/Product"
import { getProducts } from "../api/Api";
import { ProductContext } from "../context/ContextProvider";

const GetProducts = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 
 const {products,setProducts} = useContext(ProductContext)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts()
        setProducts(response.data);
      } catch (error) {
        console.error("Error", error);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="py-[3rem] px-[2rem] bg-gradient-one">
      <h2 className="text-3xl font-bold text-center mb-[2rem]">Product List</h2>
      <ul className="list-disc flex flex-wrap gap-[3rem] justify-center">
        {products.map((product) => (
          <Product key={product.id}  product={product} />
        ))}
      </ul>
    </div>
  );
};

export default GetProducts;
