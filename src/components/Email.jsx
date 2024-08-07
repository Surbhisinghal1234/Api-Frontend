import React, { useState } from 'react';
import axios from 'axios';

const Email = () => {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({
      ...emailData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api-backend-s5jz.onrender.com/send-email', emailData);
      alert(response.data);
    } catch (error) {
      console.error('There was an error sending the email!', error);
      alert('Failed to send email');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-[2rem]  md:w-[50%] m-auto md:border-2 border-gray-400 p-[2rem] rounded-lg mb-[3rem]' >
      <div  className='flex gap-[4rem]' >
        <label className='font-medium' >
          To </label>
          <input className="bg-gray-400 w-[100%] sm:w-[80%] rounded-sm p-2 text-black focus:outline-none placeholder-gray-600"   type="email" name="to" value={emailData.to} onChange={handleChange} required />
       
      </div>
      <div  className='flex gap-[1.8rem]' >
        <label className='font-medium'>
          Subject  </label>
          <input className="bg-gray-400 w-[100%] sm:w-[80%] rounded-sm p-2 text-black focus:outline-none placeholder-gray-600"    type="text" name="subject" value={emailData.subject} onChange={handleChange} required />
       
      </div>
      <div  className='flex gap-[1rem]' >
        <label className='font-medium'>
          Message  </label>
          <textarea className="bg-gray-400 w-[100%] sm:w-[80%] rounded-sm p-2 text-black focus:outline-none placeholder-gray-600"  name="message" value={emailData.message} onChange={handleChange} required />
       
      </div>
      <button type="submit" className='bg-gray-800 text-white w-[10rem] rounded-full px-[1rem] py-[.6rem] text-xl' >Send Email</button>
    </form>
  );
};

export default Email;
