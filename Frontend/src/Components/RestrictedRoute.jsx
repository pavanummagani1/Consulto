import { Navigate} from "react-router-dom";

const RestrictedRoute = ({children}) => {
    const token = localStorage.getItem('userToken');
    const currentUrl = sessionStorage.getItem("referrer")

    if(!token){
        return children
    }else{
      return  <Navigate to={currentUrl}/>
    }
}

export default RestrictedRoute