import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Loading from "../layout/Loading";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.security);

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <h2 className="mt-5 ml-5">Mi Profile</h2>
      <div className="row justify-content-around mt-5 user-info">
        <div className="col-12 col-md-3">
          <figure className="avatar avatar-profile">
            <img
              className="rounded-circle img-fluid"
              src={user && user.avatar}
              alt=""
            />
          </figure>
          <Link
            to="/me/update"
            id="edit_profile"
            className="btn btn-primary btn-block my-5"
          >
            Editar perfil
          </Link>
        </div>

        <div className="col-12 col-md-5">
          <h4>Nombres</h4>
          <p>{user && user.nombre}</p>

          <h4>Apelido</h4>
          <p>{user && user.apellido}</p>

          <h4>Telefono</h4>
          <p>{user && user.telefono}</p>

          <h4>Nombre de usuario</h4>
          <p>{user && user.username}</p>

          <h4>Correo electrónico</h4>
          <p>{user && user.email}</p>

          {user && !user.roles.includes("ADMIN") && (
            <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
              Mis ordenes
            </Link>
          )}

          <Link
            to="/password/update"
            className="btn btn-primary btn-block mt-3"
          >
            Cambiar Password
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
