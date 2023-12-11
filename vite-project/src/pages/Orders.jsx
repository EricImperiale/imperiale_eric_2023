import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Orders() {
    const [orders, setOrders] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        fetch("http://localhost:3000/api/orders", {
            headers: {
                "token": token
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setOrders(data)
            })
    }, []);

    return (
        <section>
            <header>
                <h2>Tus ordenes </h2>
                {orders.length ? (
                    <div className="bg-white p-2 my-3 border">
                        <ul>
                            {orders.map(order => (
                                <li key={order._id}>
                                    <h3>Orden: {order._id}</h3>
                                    <p style={{color: "green"}}>Estado: Completada</p>
                                    <p>Total: ${order.total}</p>
                                    <ul>
                                        {order.products.map(product => (
                                            <li key={product._id}>
                                                <h4>{product.name}</h4>
                                                <p>Precio: ${product.price}</p>
                                                <p>Precio unitario: ${(product.price / product.amount)}</p>
                                                <p>Cantidad: {product.amount}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <span>Aún no tenés ordenes.</span>
                )}
            </header>
        </section>
    )
}

export default Orders;