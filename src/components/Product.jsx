import React, { useContext } from 'react'
import { ProductContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const product = ({product}) => {
const navigate = useNavigate()

  const {handleDelete} = useContext(ProductContext)
 
  const handleEdit = (product) => {
    if (product && product.id) {
      navigate(`/editProduct/${product.id}`, { state: { product } });
    } else {
      console.error('Product or product ID is undefined');
    }
  };
  
  return (
    <div>
       <li  className="mb-[1rem] gap-[1rem] shadow-md shadow-black bg-gray-200 text-black p-4 rounded-xl flex w-[18rem] flex-col h-[25rem] no-scrollbar overflow-auto">
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
            <p><span className="font-medium mr-1">Featured:</span> <span>{product.featured ? "true" : "false"}</span></p>

          <div className="flex my-[1rem] justify-center gap-[2rem]">

            <button
              onClick={() => handleEdit(product)}
              className=" bg-blue-900 text-white px-[1rem] py-[.4rem] rounded-lg   inline-block"
            >
              <FaEdit className='text-xl' />
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className=" bg-red-700 text-white px-[1rem] py-[.4rem] rounded-lg   inline-block"
            >
            <MdDeleteForever className='text-2xl' />
            </button>
          </div>

          </li>
    </div>
  )
}

export default product
