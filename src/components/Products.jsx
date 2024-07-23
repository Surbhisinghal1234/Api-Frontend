import React, { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom"

const Products = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      image: imageUrl, 
    };

    try {
      const response = await axios.post('http://localhost:3000/products', productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMessage('Product added successfully');
      setImageUrl(''); 
    } catch (error) {
      console.log('Error uploading product', error);
      setMessage('Error uploading product');
    }
  };

  return (
    <div  className='py-[3rem] px-[2rem] '>
      <h2>Add Product</h2>
      <form  className='flex gap-[3rem] mt-[2rem] ' onSubmit={handleSubmit}>
        <div className='flex gap-[.5rem] items-center ' >
          <label>Product Name - </label>
          <input className='shadow-sm shadow-black rounded px-[.5rem] py-[.2rem]'
            type="text" placeholder='Enter Name'
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className='flex gap-[.5rem] items-center ' >
          <label>Price -</label>
          <input className='shadow-sm shadow-black rounded px-[.5rem] py-[.2rem]'
            type="text" placeholder='Price'
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </div>
        <div className='flex gap-[.5rem] items-center ' >
          <label>Image URL -</label>
          <input className='shadow-sm shadow-black rounded px-[.5rem] py-[.2rem]'
            type="text" 
            value={imageUrl} 
            onChange={handleUrlChange} 
            placeholder="Enter Cloudinary URL"
            required 
          />
        </div>
        <button type="submit" className='bg-gray-800 text-white px-[1rem] py-[.5rem] rounded-md' >Add Product</button>
      </form>
      {message && <p>{message}</p>}
      {imageUrl && (
        <div>
          <h3>Uploaded Image - </h3>
          <img src={imageUrl} alt="Uploaded product" style={{ maxWidth: '300px' }} />
        </div>
      )}
<Link to="/getProducts" ><button className='bg-black text-white px-[1rem] py-[.3rem] mt-[1rem] rounded-md' >Next</button></Link>
      
    </div>
  );
};

export default Products;
