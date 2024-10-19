import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../actions/userAction";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    username: "",
    password: "",
  });

  const { nombre, apellido, password, telefono, email, username } = user;
  const [avatar, setAvatar] = useState("");

  const [avatarPreview, setAvatarPreview] = useState(
    "images/default_avatar.jpg"
  );

  const dispatch = useDispatch();
  const { loading, isAuthenticated, errores } = useSelector(
    (state) => state.security
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (errores) {
        errores.map((error) => alert(error));
      }
  }, [dispatch, errores, loading, isAuthenticated, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("nombre", nombre);
    formData.set("apellido", apellido);
    formData.set("telefono", telefono);
    formData.set("email", email);
    formData.set("username", username);
    formData.set("password", password);
    formData.set("foto", avatar);

    dispatch(register(formData));
  };

  const onChange = (e) => {
    if (e.target.name == "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          console.log(reader.result);
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <MetaData titulo={"Registro de usuario"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <h1 className="mb-3">Registrar usuario</h1>

            <div className="form-group">
              <label htmlFor="nombre_field">Nombre</label>
              <input
                type="text"
                id="nombre_field"
                className="form-control"
                value={nombre}
                name="nombre"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido_field">Apellido</label>
              <input
                type="text"
                id="apellido_field"
                className="form-control"
                value={apellido}
                name="apellido"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="username_field">Nombre usuario</label>
              <input
                type="text"
                id="username_field"
                className="form-control"
                value={username}
                name="username"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono_field">Teléfono</label>
              <input
                type="number"
                id="telefono_field"
                className="form-control"
                value={telefono}
                name="telefono"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email_field">Correo electrónico</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                name="email"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Contraseña</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                name="password"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Imagen Previa"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Subir Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
