import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Products from "./pages/Products.jsx"
import Cart from "./pages/Cart.jsx"
import Orders from "./pages/Orders.jsx"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CartProvider } from "./contexts/CartContext.jsx"
import { AuthProvider } from "./contexts/AuthContext.jsx"

import "./assets/css.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap-icons/font/bootstrap-icons.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/productos",
        element: <Products />
      },
      {
        path: "/",
        element: <Products />
      },
      {
        path: "/iniciar-sesion",
        element: <Login />
      },
      {
        path: "/registro",
        element: <Register />
      },
      {
        path: "/carrito",
        element: <Cart />
      },
      {
        path: "/ordenes",
        element: <Orders />
      },
      {
        path: "*",
        element: <Products />
      }
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <AuthProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </AuthProvider>
    </CartProvider>
  </React.StrictMode>
)
