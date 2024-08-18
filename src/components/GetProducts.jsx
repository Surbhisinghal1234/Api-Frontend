import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import "../App.css";

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const baseUrl = "https://api-backend-s5jz.onrender.com";
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/prod`);
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
      await axios.delete(`${baseUrl}/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error", error);
      alert("Failed to delete product");
    }
  };

  const handleEdit = (product) => {
    navigate("/", { state: { product } }); 
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="py-[3rem] px-[2rem] bg-gradient-one">

      <h2 className="text-3xl font-bold text-center mb-[2rem]">Product List</h2>
     <p className="bg-slate-800  text-white px-4 text-center flex m-auto md:mx-0 py-2 rounded-md  w-[11rem] mb-4"><Link to="/" 
      > back to home page
      </Link></p> 
      <ul className="list-disc flex flex-wrap gap-[3rem] justify-center">
        {products.map((product) => (
          <li key={product.id} className="mb-[1rem] gap-[1rem] shadow-md shadow-black bg-gray-200 text-black p-4 rounded-xl flex w-[18rem] flex-col h-[25rem] no-scrollbar overflow-auto">
            <p><span className="font-medium mr-1">ID:</span> <span>{product.id}</span></p>
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="rounded-sm h-[13rem]"
              />
            )}
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p><span className="font-medium">Price:</span> <span className="ml-1">{product.price}</span></p>
            <p><span className="font-medium mr-1">Description:</span> <span>{product.description}</span></p>
            <p><span className="font-medium mr-1">Category:</span> <span>{product.category}</span></p>
          <div className="flex my-[1rem] justify-center gap-[2rem]">

            <button
              onClick={() => handleEdit(product)}
              className=" bg-blue-800 text-white px-[1rem] py-[.4rem] rounded-lg w-[5rem]  inline-block"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className=" bg-red-700 text-white px-[1rem] py-[.4rem] rounded-lg w-[5rem]  inline-block"
            >
              Delete
            </button>
          </div>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetProducts;
