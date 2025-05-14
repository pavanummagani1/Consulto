import { Navigate} from "react-router-dom";

const RestrictedRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.userToken


    if(!token){
        return  <Navigate to="/" replace />
    }
    return children
}

export default RestrictedRoute
