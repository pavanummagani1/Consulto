import { Navigate} from "react-router-dom";

const RestrictedRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.userToken
    const currentUrl = sessionStorage.getItem("referrer")

    if(!token){
        return children
    }else{
      return  <Navigate to={currentUrl}/>
    }
}

export default RestrictedRoute