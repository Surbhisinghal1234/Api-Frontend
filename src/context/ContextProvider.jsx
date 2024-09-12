import { createContext, useState } from "react";
import { deleteProducts } from "../api/Api";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const handleDelete = async (id) => {
    try {
      await deleteProducts(id);
      setProducts(products.filter((product) => product.id !== id));
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error", error);
      alert("Failed to delete product");
    }
  };

  return (
    <ProductContext.Provider value={{ handleDelete,  products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
