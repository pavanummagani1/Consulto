import { Navigate} from "react-router-dom";

const RestrictedRoute = ({children}) => {
    // const token = localStorage.getItem('user') || localStorage.getItem('Admin') || localStorage.getItem('Doctor');
    const currentUrl = sessionStorage.getItem("referrer")

    if(!localStorage.getItem('user') && !localStorage.getItem('Admin') && !localStorage.getItem('Doctor')){
        return children
    }else{
      return  <Navigate to={currentUrl}/>
    }
}

export default RestrictedRoute