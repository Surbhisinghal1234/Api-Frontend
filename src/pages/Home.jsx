import React, { useContext, useEffect, useState } from 'react';
import Product from "../components/Product"
import { ProductContext } from '../context/ContextProvider';
import { getProducts } from '../api/Api';

const Home = () => {
  const {products,setProducts} = useContext(ProductContext)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts()
        setProducts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter 
  const featuredProducts = Array.isArray(products) ? products.filter(product => product.featured) : [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="py-[3rem] min-h-screen max-h-auto  px-[2rem] bg-gradient-one">
      <h2 className="text-3xl font-bold text-center mb-[2rem]">Featured Products</h2>
      <ul className="list-disc flex flex-wrap gap-[3rem] justify-center">
        {featuredProducts.map((product) => (
        <Product key={product.id}  product={product}/>
        ))}
      </ul>
    </div>
  );
};

export default Home;
