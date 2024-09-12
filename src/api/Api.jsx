import axios from "axios";

const api = axios.create(
  {// baseURL: "http://localhost:3000/"
    baseURL: "https://api-backend-s5jz.onrender.com/"
  }
)

export const postProducts = (productData) =>{
  return api.post("postProducts",productData)
}

export const editProducts = (id, productData) =>{
  return api.put(`editProducts/${id}`, productData);
}

export const getProducts = () =>{
  return api.get(`prod`)
}

export const deleteProducts = (id)=>{
  return api.delete(`products/${id}`)
}

