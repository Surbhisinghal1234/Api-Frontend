import React, { useState, useEffect } from 'react';
import GetProducts from './pages/GetProducts';
import { RouterProvider, createBrowserRouter} from "react-router-dom"
import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import PostProducts from './pages/PostProducts';
import { ProductProvider } from './context/ContextProvider';

function App() {
 const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />, 
      children: [
        {
          index: true, 
          element: <PostProducts />, 
        },
       
        {
          path: 'getProducts',
          element: <GetProducts />, 
        },
        {
          path: 'featuredProducts',
          element: < Home/>, 
        },
        {
          path: 'editProduct/:id',
          element: <PostProducts />, 
        },
        {
          path: 'contact',
          element: <Contact/>,
        },
      ],
    },
   
  ]
 )

  return (
<>
<ProductProvider>
<RouterProvider router={router} /> 
</ProductProvider>



</>
  );
}

export default App;
