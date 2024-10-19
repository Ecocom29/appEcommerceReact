import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { forgotSendPassword } from "../../actions/userAction";
import { resetError } from "../../slices/forgotPasswordSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { errores, message, loading } = useSelector(
    state => state.forgotPassword
  );

  useEffect(() => {
    if (errores) {
      errores.map((error) => alert(error));
      dispatch(resetError());
    }

    if (message) {
      alert(message);
    }
  }, [dispatch, errores, message]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotSendPassword({ email }));
  };

  return (
    <Fragment>
      <MetaData titulo={"Recuperar contraseña"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Resetear Password</h1>
            <div className="form-group">
              <label htmlFor="email_field">Ingresa Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={ e => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={ loading ? true : false}
            >
              Enviar Email
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
