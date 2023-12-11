import { useContext, useState, useEffect } from "react"
import { Link, Outlet } from "react-router-dom"
import { AuthContext } from "./contexts/AuthContext"
import { CartContext } from "./contexts/CartContext"

function App() {
  const { user, token, logout } = useContext(AuthContext)
  const { cartItems } = useContext(CartContext)
  const [productsLength, setProductsLength] = useState(0);

  useEffect(() => {
    setProductsLength(
      cartItems?.reduce((previous, current) => previous + current.amount, 0)
    );
  }, [cartItems]);

  return (
    <>
      <nav className="navbar navbar-expand-lg shadow-sm" style={{ background: "#1E293B" }} >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/productos" className="nav-link">Productos</Link>
              </li>
            </ul>
            <ul className="navbar-nav me-0 mb-2 mb-lg-0">
              {token ? (
                <>
                  <li className="nav-item">
                    <button className="btn btn-danger mx-2"
                      onClick={logout}>Cerrar Sesión ({user?.email})</button>
                  </li>
                  <li className="nav-item">
                    <Link to="/ordenes" className="nav-link">Ver mis Compras</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/iniciar-sesion" className="nav-link">Iniciar Sesión</Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link to="/carrito" class="btn btn-primary position-relative link-carrito">
                  Carrito
                  <span class="position-absolute top-0 start-95 translate-middle m-1 bg-danger rounded-circle">
                    {productsLength}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main>
        <div className="container my-3">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default App
