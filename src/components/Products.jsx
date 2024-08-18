import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Email from "./Email";
import { v4 as uuid } from 'uuid';

const Products = () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.product) {
      setProduct(location.state.product);
      setPhoto(location.state.product.image);
    }
  }, [location.state]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProduct((prev) => ({ ...prev, image: file }));
      setPhoto(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!product.image) return null;
    const data = new FormData();
    data.append("file", product.image);
    data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const cloudData = await response.json();
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
        image: imageUrl,
      };

      if (product.id) {
        await axios.put(`${baseUrl}/products/${product.id}`, productData, {
          headers: { "Content-Type": "application/json" },
        });
        setMessage("Product updated successfully");
        alert("Product updated successfully")
      } else {
        await axios.post(`${baseUrl}/products`, productData, {
          headers: { "Content-Type": "application/json" },
        });
        setMessage("Product added successfully");
        alert("Product added successfully")

      }

      setProduct({
        id: uuid(),
        name: "",
        price: "",
        description: "",
        image: null,
        category: "",
      });
      setPhoto("");
      navigate("/getProducts");
    } catch (error) {
      console.error("Error saving product", error);
      setMessage("Error saving product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="py-[3rem] px-[2rem] flex justify-center flex-col items-center border-2 md:border-gray-400 md:w-[50%] m-auto my-[3rem] rounded-md">
        <h2 className="text-2xl font-bold">{product.id ? "Edit Product" : "Add Product"}</h2>
        <form className="flex flex-col gap-[1rem] mt-[2rem]" onSubmit={handleSubmit}>
          <div className="flex gap-[.5rem] items-center">
            <label>Name - </label>
            <input
              className="shadow-sm shadow-black rounded px-[.5rem] py-[.2rem]"
              type="text"
              placeholder="Enter Name"
              value={product.name}
              onChange={(e) => setProduct((prev) => ({ ...prev, name: e.target.value }))}
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
              onChange={(e) => setProduct((prev) => ({ ...prev, price: e.target.value }))}
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
              onChange={(e) => setProduct((prev) => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-[.5rem] items-center">
          <div className="flex gap-4">  <label>Upload Image - </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            </div>
            {photo && <img src={photo} alt="Preview" className="w-[100px] h-[100px] mt-[1rem]" />}
          </div>
          <div className="flex gap-[.5rem] items-center">
            <label>Category - </label>
            <input
              className="shadow-sm shadow-black rounded px-[.5rem] py-[.2rem]"
              type="text"
              placeholder="Category"
              value={product.category}
              onChange={(e) => setProduct((prev) => ({ ...prev, category: e.target.value }))}
              required
            />
          </div>
          <button
            type="submit"
            className="mt-[1rem] bg-slate-500 text-white px-[1rem] py-[.4rem] rounded-lg w-[5rem] m-auto inline-block"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
        {message && <p className="mt-[1rem] text-red-500">{message}</p>}
      </div>
      <Link to="/getProducts" className=" m-auto rounded-md py-2 px-4  text-center text-white w-[11rem] block bg-slate-900 my-[2rem]">Go to Product List</Link>
      <Email />
    </>
  );
};

export default Products;



