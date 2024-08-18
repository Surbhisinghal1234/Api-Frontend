import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Email from "./Email";
import { v4 as uuid } from 'uuid';


const Products = () => {

  const baseUrl = import.meta.env.VITE_APP_API_URL || "http://localhost:3000" ;

  const [product, setProduct] = useState({
    id: uuid(),
    name: "",
    price: "",
    description: "",
    image: null,
    category: "", 
   
  });
  const [photo, setPhoto] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProduct((prev) => ({ ...prev, image: file }));
    setPhoto(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!product.image) return;
    const data = new FormData();
    data.append("file", product.image);
    data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const cloudData = await response.json();
      console.log("Cloudinary", cloudData);
      return cloudData.url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary", error);
      setMessage("Error uploading image to Cloudinary");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage();
      if (!imageUrl) return;

      const productData = {
        ...product,
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        image: imageUrl,
        category: product.category, 
      };

      await axios.post(
        `${baseUrl}/products` ,
        // "http://localhost:3000/products",
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("Product added successfully");
      console.log(productData,"Product added successfully")
      setProduct((prev) => ({
        ...prev,
        
        name: "",
        price: "",
        description: "",
        image: "",
        category: "",  
      }));
      setPhoto("");
      // setMessage("")
    } catch (error) {
      console.error("error", error);
      setMessage("Error adding product");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="py-[3rem] px-[2rem] flex justify-center flex-col items-center border-2 md:border-gray-400  md:w-[50%] m-auto my-[3rem] rounded-md">
        <h2 className="text-2xl font-bold">Add Products</h2>
        <form
          className="flex flex-col gap-[1rem] mt-[2rem]"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-[.5rem] items-center">
            <label>Name - </label>
            <input
              className="shadow-sm shadow-black rounded px-[.5rem] py-[.2rem]"
              type="text"
              placeholder="Enter Name"
              value={product.name}
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>
          <div className="flex gap-[.5rem] items-center">
            <label>Price - </label>
            <input
              className="shadow-sm shadow-black rounded px-[.5rem] py-[.2rem]"
              type="text"
              placeholder="Enter Price"
              value={product.price}
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, price: e.target.value }))
              }
              required
            />
          </div>
          <div className="flex gap-[.5rem] items-center">
            <label>Description - </label>
            <input
              className="shadow-sm shadow-black rounded px-[.5rem] py-[.2rem]"
              type="text"
              placeholder="Description"
              value={product.description}
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, description: e.target.value }))
              }
              required
            />
          </div>
          <div className="flex gap-[.5rem] items-center">
            <label>Upload Image -</label>
            <input
              type="file"
              className="rounded px-[.5rem] py-[.2rem]"
              onChange={handleFileChange}
            />
            {photo && (
              <div>
                <img src={photo} alt="Preview" style={{ maxWidth: "300px" }} />
              </div>
            )}
          </div>
          <div className="flex gap-[.5rem] items-center">
            <label>Category - </label>
            <input
              className="shadow-sm shadow-black rounded px-[.5rem] py-[.2rem]"
              type="text"
              placeholder="Enter Category"
              value={product.category}
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, category: e.target.value }))
              }
              required
            />
          </div>
          <button
            type="submit"
            className={`bg-gray-800 w-[7rem] text-white px-[1rem] py-[.5rem] rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </form>
        {message && <p>{message}</p>}
        <Link to="/getProducts">
          <button className="bg-black text-white px-[1rem] py-[.3rem] mt-[1rem] rounded-md">
            Get Products
          </button>
        </Link>
      </div>

      <Email />
    </>
  );
};

export default Products;




