import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://api-backend-s5jz.onrender.com';

function GetProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/prod`);
      console.log("data aa gya", response)
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-gradient-one h-auto px-[2rem] py-[3rem] container mx-auto ' >
      <h1 className='flex justify-center text-[2rem] font-bold pb-[3rem]' >Products</h1>
      <div className='flex gap-[3rem] justify-center flex-wrap' >
        {products.map((product) => (
           <div key={product._id}   className='h-[20rem] w-[15rem] shadow-md shadow-black p-[1rem] rounded-md flex flex-col gap-4 bg-transparent font-bold'>
              <img src={product.image} alt={product.name} className='shadow-sm h-[10rem] rounded-md  overflow-hidden' />
              <h2 className='overflow-hidden' >{product.name}</h2>
              <p>Price: {product.price}</p>
           </div>
            ))}
      </div>
    </div>
  );

}

export default GetProducts;

