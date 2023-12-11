import { createContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(null);

  const getProducts = async () => {
    await axios
      .get("http://localhost:3000/api/products")
      .then(({ data }) => setProducts(data.products));
  };

  const getProductsCart = async () => {
    return await axios
      .get("http://localhost:3000/api/cart/products-cart")
      .then(({ data }) => setCartItems(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getProducts();
    getProductsCart();
  }, []);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }, [message])


  const addItemToCart = async (product) => {
    const { name, image, price } = product;

    await axios.post("http://localhost:3000/api/cart/products-cart", { name, image, price });

    setMessage("Producto agregado al carrito.")

    getProducts();
    getProductsCart();
  };

  const editItemToCart = async (id, query, amount) => {
    console.log(query)
    if (query == "del" && amount == 1) {
      await axios
        .delete(`http://localhost:3000/api/cart/products-cart/${id}`)
        .then(({ data }) => console.log(data));

      setMessage("Se modificó un producto del carrito.")
    } else {
      await axios
        .put(`http://localhost:3000/api/cart/products-cart/${id}?query=${query}`, {
          amount,
        })
        .then(({ data }) => console.log(data));

      setMessage("Se modificó un producto del carrito.")
    }

    getProducts();
    getProductsCart();
  };

  const generateOrder = async (cartItems, total, user) => {
    fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cartItems, total, user })
    }).then(res => res.json())
      .then(data => {
        setMessage("Orden generada correctamente.")

        if (data) {
          fetch('http://localhost:3000/api/cart/products-cart', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
            .then(data => {
              console.log(data)
            })
            .catch(err => console.log(err))

            setCartItems([])
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <CartContext.Provider
      value={{ cartItems, products, addItemToCart, editItemToCart, message, setMessage, generateOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};

export {
  CartContext,
  CartProvider
}