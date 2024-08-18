import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css"

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const baseUrl = import.meta.env.VITE_APP_API_URL || "http://localhost:3000" ;



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/prod`
         
        //  "http://localhost:3000/prod?sort=price&orderby=desc"
        // "http://localhost:3000/prod"

         


        );
        console.log(response.data,"abc")
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
    <div className="py-[3rem] px-[2rem] bg-gradient-one">
      <h2 className="text-3xl font-bold text-center mb-[2rem]" >Product List</h2>
      <ul className="list-disc flex flex-wrap gap-[3rem] justify-center">
        {products.map((product) => (
          <li key={product.id} className="mb-[1rem] gap-[1rem] shadow-md shadow-black bg-gray-200  text-black p-4 rounded-xl  flex w-[18rem] flex-col h-[25rem] no-scrollbar overflow-auto" >
            <p> <span className="font-medium mr-1" >ID:</span> <span>{product.id}</span> </p>
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="rounded-sm h-[13rem]"
              />
            )}
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p  > <span className="font-medium" >Price:</span> <span className="ml-1"> {product.price}</span> </p>
            <p> <span  className="font-medium mr-1" >Description:</span> <span  >{product.description}</span>  </p>
            <p> <span  className="font-medium mr-1" >Category:</span> <span  >{product.category}</span>  </p>

           
            <button
              onClick={() => handleDelete(product.id)}
              className="mt-[1rem] bg-red-500 text-white px-[1rem] py-[.4rem] rounded-lg w-[5rem] m-auto inline-block"
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
