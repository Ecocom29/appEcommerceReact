import React, {Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetUpdateStatus } from "../../slices/securitySlice";
import MetaData from "../layout/MetaData";
import { update } from "../../actions/userAction";

const UpdateProfile = () => {
  const navigate = useNavigate();

  //variable local, persistir los dtos
  const [userSession, setUserSession] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
  });

  const [avatar, setAvatar] = useState();

  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const dispatch = useDispatch();

  const { errores, loading, isAuthenticated, user, isUpdated } = useSelector(
    (state) => state.security
  );

  useEffect(() => {
    if (isAuthenticated) {
      setUserSession({ ...user });
      setAvatarPreview(user.avatar);
    }

    if (errores) {
        errores.map((error) => alert(error));
      }

    if (isUpdated) {
      alert("Se actualizaron los datos del usuario.");
      console.log(isUpdated);

      navigate("/me");

      dispatch(resetUpdateStatus({}));
    }
  }, [dispatch, isAuthenticated, errores, user, isUpdated, navigate]);

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserSession({ ...userSession, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("nombre", userSession.nombre);
    formData.set("apellido", userSession.apellido);
    formData.set("telefono", userSession.telefono);
    formData.set("email", user.email);
    formData.set("username", userSession.username);
    // formData.set("password", password);
    formData.set("foto", userSession.avatar);

    dispatch(update(formData));
  };

  return (
    <Fragment>
      <MetaData titulo={"Actualizar perfil de Usuario"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <h1 className="mt-2 mb-5">Actualiar Perfil</h1>

            <div className="form-group">
              <label htmlFor="nombre_field">Nombre</label>
              <input
                type="text"
                id="nombre_field"
                className="form-control"
                value={userSession.nombre}
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
                value={userSession.apellido}
                name="apellido"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono_field">Teléfono</label>
              <input
                type="number"
                id="telefono_field"
                className="form-control"
                value={userSession.telefono}
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
                value={userSession.email}
                name="email"
                onChange={onChange}
                disabled={true}
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
                    Selecionar avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
