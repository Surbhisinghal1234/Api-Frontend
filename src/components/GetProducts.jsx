import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetProducts = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://api-backend-s5jz.onrender.com/prod');
        setUsers(response.data);
      } catch (error) {
        console.error('Error', error);
        setError('Failed');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='py-[3rem] px-[2rem]'>
      <h2>Product List</h2>
      <ul className='list-disc'>
        {users.map((user) => (
          <li key={user._id} className='mb-[1rem]'>
            <h3 className='text-xl font-bold'>{user.name}</h3>
            <p>Price: {user.price}</p>
            <p>Description: {user.description}</p>
            {user.image && (
              <img
                src={user.image}
                alt={user.name}
                style={{ maxWidth: '300px', marginTop: '1rem' }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetProducts;


