import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [photo, setPhoto] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPhoto(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!image) return;

    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'testImage');
    data.append('cloud_name', 'surbhisinghal');

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/surbhisinghal/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );
      const cloudData = await response.json();
      console.log('Cloudinary', cloudData);
      return cloudData.url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary', error);
      setMessage('Error uploading image to Cloudinary');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    
      const imageUrl = await uploadImage();
      if (!imageUrl) return;

      const userData = {
        name,
        price,
        description,
        image: imageUrl,
      };

      await axios.post('https://api-backend-s5jz.onrender.com/products', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMessage('User added successfully');
      setName('');
      setPrice('');
      setDescription('');
      setImage(null);
      setPhoto('');
    } catch (error) {
      console.error('Error', error);
      setMessage('Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='py-[3rem] px-[2rem]'>
      <h2>Add User</h2>
      <form className='flex flex-col gap-[1rem] mt-[2rem]' onSubmit={handleSubmit}>
        <div className='flex gap-[.5rem] items-center'>
          <label>Name - </label>
          <input
            className='shadow-sm shadow-black rounded px-[.5rem] py-[.2rem]'
            type="text"
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='flex gap-[.5rem] items-center'>
          <label>Price - </label>
          <input
            className='shadow-sm shadow-black rounded px-[.5rem] py-[.2rem]'
            type="number"
            placeholder='Enter Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className='flex gap-[.5rem] items-center'>
          <label>Description - </label>
          <input
            className='shadow-sm shadow-black rounded px-[.5rem] py-[.2rem]'
            type="text"
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className='flex gap-[.5rem] items-center'>
          <label>Upload Image -</label>
          <input
            type="file"
            className='shadow-sm shadow-black rounded px-[.5rem] py-[.2rem]'
            onChange={handleFileChange}
          />
          {photo && (
            <div>
              <img src={photo} alt="Preview" style={{ maxWidth: '300px' }} />
            </div>
          )}
        </div>
        <button
          type="submit"
          className={`bg-gray-800 text-white px-[1rem] py-[.5rem] rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </form>
      {message && <p>{message}</p>}
      <Link to="/getProducts">
        <button className='bg-black text-white px-[1rem] py-[.3rem] mt-[1rem] rounded-md'>
          Next
        </button>
      </Link>
    </div>
  );
};

export default Products;
