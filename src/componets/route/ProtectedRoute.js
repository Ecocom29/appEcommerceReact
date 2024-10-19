import { Navigate, Outlet } from "react-router-dom";
import { parseToken } from "../../utilities/parseToken";

//Función para validar el acceso al perfil cuando esta logueado
const ProtectedRoute = ({existsRoles}) =>{
    const token = localStorage.getItem('token');

    if(!token){
        return <Navigate to="/Login"/>;
    }

    if(!existsRoles){
        return <Outlet />
    }

    //Obtener la estructura del token
    const payload = parseToken(token);

    const { role } = payload;

    console.log(role);

    if(Array.isArray(role))
    {
        //En caso de tener más de un role
        const isFounded = role.some(item => existsRoles.includes(item));
        return isFounded ? <Outlet/> : <Navigate to="/Login" />
    }else{
        //En caso de tener solo un rol
        return existsRoles.includes(role) ? <Outlet/> : <Navigate to="/login" />;
    }

}

export default ProtectedRoute;