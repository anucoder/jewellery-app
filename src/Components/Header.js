import HeaderCartButton from "./HeaderCartButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Header = (props) => {

  let getTokendetails = () =>{
    let token = localStorage.getItem('auth-token');
    if(token==null) return false
    else return true
    }

  let logout = () =>{
    localStorage.removeItem('auth-token');
    alert('User Logout successfully')
    setUserLogin(false);
  }  

  let [userLogin, setUserLogin] = useState(getTokendetails())
  let onSuccess = (credentialResponse) => {
    let token = jwt_decode(credentialResponse.credential);
    localStorage.setItem('auth-token',token)
    setUserLogin(true);
  };

  let onError = () => {
    alert("Login failed");
  };
  let navigate = useNavigate();
  return (
    <>
      <GoogleOAuthProvider clientId="73799834581-guoauolq9irgmqraqvep8gchc322nsos.apps.googleusercontent.com">
        <header className="header">
          <h1
            className="hand"
            onClick={() => {
              navigate("/");
            }}
          >
            Fantasy
          </h1>
            {userLogin ? ( <div className="right"><HeaderCartButton onClick={() => {navigate("/cart")}} cartItem={props.cartItem}/>
            <button className="logout" onClick={logout}>Logout</button></div>
            ):(
              <GoogleLogin onSuccess={onSuccess} onError={onError} />
            )}
         
        </header>
      </GoogleOAuthProvider>
    </>
  );
};

export default Header;
