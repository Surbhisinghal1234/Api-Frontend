import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'https://api-backend-s5jz.onrender.com';

const EditProduct = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [product, setProduct] = useState({
    name: '',
    description:'',
    price: '',
    image: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL}/prod/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product', error);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/products/${id}`, product);
      setMessage('Product updated successfully');
      navigate('/getProducts');
    } catch (error) {
      console.error('Error updating product', error);
      setMessage('Error updating product');
    }
  };

  return (
    <div className='py-[3rem] px-[2rem]'>
      <h2>Edit Product</h2>
      <form className='flex flex-col gap-[1rem]' onSubmit={handleSubmit}>
        <div className='flex gap-[.5rem] items-center'>
          <label>Product Name:</label>
          <input
            className='shadow-sm shadow-black rounded px-[.5rem] py-[.2rem]'
            type='text'
            name='name'
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex gap-[.5rem] items-center'>
          <label>Product description:</label>
          <input
            className='shadow-sm shadow-black rounded px-[.5rem] py-[.2rem]'
            type='text'
            name='description'
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex gap-[.5rem] items-center'>
          <label>Price:</label>
          <input
            className='shadow-sm shadow-black rounded px-[.5rem] py-[.2rem]'
            type='text'
            name='price'
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex gap-[.5rem] items-center'>
          <label>Image URL:</label>
          <input
            className='shadow-sm shadow-black rounded px-[.5rem] py-[.2rem]'
            type='text'
            name='image'
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='bg-gray-800 text-white px-[1rem] py-[.5rem] rounded-md'>
          Update Product
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditProduct;
