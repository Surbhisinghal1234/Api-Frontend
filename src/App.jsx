import React, { useState, useEffect } from 'react';
import Products from './components/Products';
import GetProducts from './components/GetProducts';
import {RouterProvider, createBrowserRouter} from "react-router-dom"

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
  ]
 )

  return (
<>
<RouterProvider router={router}/>
</>
  );
}

export default App;
