import HeaderCartButton from "./HeaderCartButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import Modal from "react-modal";

const Header = (props) => {
  let getTokendetails = () => {
    let token = localStorage.getItem("auth-token");
    // console.log(token);
    if (token == null) return false;
    else return true;
  };

  let logout = () => {
    Swal.fire({
      title: "Are you sure to Logout?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("auth-token");
        window.location.reload("/`");
        setUserLogin(false);
      }
    });
  };

  //Login

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  let [userLogin, setUserLogin] = useState(getTokendetails());
  let onSuccess = (credentialResponse) => {
    let token = jwt_decode(credentialResponse.credential);
    // console.log(token);
    localStorage.setItem("auth-token", JSON.stringify(token));
    Swal.fire({
      icon: "success",
      title: "User Logged in successfully",
      text: "",
    }).then(() => {
      window.location.reload("/");
    });
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
          {userLogin ? (
            <div className="right">
              <HeaderCartButton
                onClick={() => {
                  navigate("/cart");
                }}
                cartItem={props.cartItem}
              />
              <button className="logout" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            // <GoogleLogin onSuccess={onSuccess} onError={onError} />
            <>
              <button className="login" onClick={openModal}>
                Login
              </button>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                  Google login
                </h2>
                <hr></hr>
                <GoogleLogin onSuccess={onSuccess} onError={onError} />
              </Modal>
            </>
          )}
        </header>
      </GoogleOAuthProvider>
    </>
  );
};

export default Header;
