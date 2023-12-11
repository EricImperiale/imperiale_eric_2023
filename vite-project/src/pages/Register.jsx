import { Link } from "react-router-dom"
import { useState, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { useFormik } from "formik"
import * as Yup from "yup"

function Register() {
    const [message, setMessage] = useState(null)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("El email no es válido.")
                .required("El email es obligatorio."),
            password: Yup.string()
                .required("La contraseña es obligatoria.")
        }),
        onSubmit: (formData) => {
            fetch(`http://localhost:3000/api/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            }).then(res => res.json())
                .then(data => {
                    if (data.type === "danger") {
                        setMessage({
                            type: "danger",
                            message: data.message
                        })
                    } else {
                        setMessage({
                            type: "success",
                            message: data.message
                        })

                        formik.resetForm()
                    }
                })
        }
    })

    return (
        <>
            <section>
                <header>
                    <h1>Crear Cuenta</h1>
                    <span>
                        ¿Ya tenés cuenta?
                        <Link to="/iniciar-sesion"
                            className="mx-1">Iniciar Sesión</Link>
                    </span>
                    {message && (
                        <div className={`alert alert-${message.type} my-2`}>
                            {message.message}
                        </div>
                    )}
                </header>

                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="my-3">
                        <label htmlFor="email"
                            className="form-label">Email</label>
                        {formik.errors.email && formik.touched.email ? (
                            <div className="alert alert-danger">
                                {formik.errors.email}
                            </div>
                        ) : null}
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="form-control"
                            value={formik.values.email}
                            onChange={formik.handleChange} />
                    </div>
                    <div className="my-3">
                        <label htmlFor="password"
                            className="form-label">Contraseña</label>
                        {formik.errors.password && formik.touched.password ?  (
                            <div className="alert alert-danger">
                                {formik.errors.password}
                            </div>
                        ) : null}
                        <input type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={formik.values.password}
                            onChange={formik.handleChange} />
                    </div>
                    <div className="my-3">
                        <button type="sumbit" className="btn btn-primary w-100 my-2">Crear Cuenta</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register