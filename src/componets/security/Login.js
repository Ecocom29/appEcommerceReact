import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userAction";
import Loading from "../layout/Loading";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const { errores, isAuthenticated, loading } = useSelector(
    state => state.security
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (errores) {
      errores.map((error) => alert(error));
    }
  }, [dispatch, isAuthenticated, errores, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email, password);
    dispatch(login({ email, password }));
  };


  if(loading){
    return(<Loading/>);
  }

  return (
    <Fragment>
      <MetaData titulo={"Login"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Iniciar sesión</h1>
            
            
            <div className="form-group">
              <label htmlFor="email_field">Correo electrónico</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Contraseña</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
            </div>

            <Link to="/password/forgot" className="float-right mb-4">
              ¿Olvidaste tu contraseña?
            </Link>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              Entrar
            </button>

            <Link to="/register" className="float-right mt-3">
              Registrar nuevo usuario
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
