import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css"

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api-backend-s5jz.onrender.com/prod"
          // "http://localhost:3000/prod"
        );
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api-backend-s5jz.onrender.com/products/${id}`);
      // await axios.delete(`http://localhost:3000/products/${id}`);

      setProducts(products.filter((product) => product.id !== id));
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error", error);
      alert("Failed to delete product");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="py-[3rem] px-[2rem]">
      <h2>Product List</h2>
      <ul className="list-disc flex flex-wrap gap-[2rem] justify-center">
        {products.map((product) => (
          <li key={product.id} className="mb-[1rem] gap-[1rem] bg-gradient-to-b from-red-300  to-pink-200 text-black p-4 rounded-lg  flex w-[20rem] flex-col h-[25rem] no-scrollbar overflow-auto" >
            <p>ID: {product.id}</p>
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="rounded-sm h-[13rem]"
              />
            )}
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
           
            <button
              onClick={() => handleDelete(product.id)}
              className="mt-[1rem] bg-red-500 text-white px-[1rem] py-[.5rem] rounded-md"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetProducts;
