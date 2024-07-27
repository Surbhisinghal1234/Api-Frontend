import React, { useState, useEffect } from 'react';
import Products from './components/Products';
import GetProducts from './components/GetProducts';
import {RouterProvider, createBrowserRouter} from "react-router-dom"
// import EditProduct from './components/EditProduct';

function App() {
 const router = createBrowserRouter(
  [
    {
      path: "/",
      element:(
        <Products/>
      )
    },
    {
      path: "/getProducts",
      element:(
        
        <GetProducts/>
      ),
    },
    // {
    //   path: '/editProduct/:id',
    //   element:(
        
    //     <EditProduct/>
    //   ),
    // },
  ]
 )

  return (
<>
<RouterProvider router={router}/>
</>
  );
}

export default App;
