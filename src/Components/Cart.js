import Header from "./Header";
import Container from "./Container";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = () => {
  let navigate = useNavigate();

  let getTokenDetails = () => {
    // read the data from localStorage
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      return false;
    } else {
      // console.log(token)
      return JSON.parse(token);
      // return true;
    }
  };
  let [userDetails, setUserDetails] = useState(getTokenDetails());
  let [cartItems, setCartItems] = useState([]);
  let [showForm, setShowForm] = useState(false);

  let totalPrice = cartItems.reduce((curNumber, item) => {
    return curNumber + item.productPrice * item.quantity;
  }, 0);

  let getCartItems = async () => {
    let user = { email: userDetails.email };
    // console.log(JSON.parse(userDetails))
    try {
      let { data } = await axios.post(
        "https://jewellry-app-be.up.railway.app/cart/items",
        user
      );
      //console.log(data)
      if (data.status === true) {
        setCartItems([...data.items]);

        //console.log(data)
      } else setCartItems([]);
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
    // console.log(categoryDetails);
  };

  //Empty cart
  let emptyCartItems = async () => {
    let user = { email: userDetails.email };
    console.log(user);
    try {
      let { data } = await axios.post(
        "https://jewellry-app-be.up.railway.app/cart/empty-cart",
        user
      );
      console.log(data);
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };
  // Payment

  async function loadScript() {
    let status = false;
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    window.document.body.appendChild(script);

    script.onload = () => {
      //console.log("returning true")
      status = true;
    };
    script.onerror = () => {
      //console.log("returning false")
      status = false;
    };
  }

  let displayRazorpay = async (event) => {
    event.preventDefault();
    let isLoaded = await loadScript();
    //console.log(isLoaded)
    if (isLoaded === false) {
      alert("sdk not loaded");
      return false;
    }
    var serverData = {
      // amount : totalPrice
      amount: 10,
    };
    var { data } = await axios.post(
      "https://jewellry-app-be.up.railway.app/api/payment/gen-order",
      serverData
    );
    var order = data.order;

    var options = {
      key: "rzp_test_rrlnhLgPkYoMK8", // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "Fantasy",
      description: "Paying for selected items",
      image:
        "https://branditechture.agency/brand-logos/wp-content/uploads/wpdm-cache/Screenshot_20220621-202824-900x0.png",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        var sendData = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };
        var { data } = await axios.post(
          "https://jewellry-app-be.up.railway.app/api/payment/verify",
          sendData
        );
        if (data.status === true) {
          Swal.fire({
            icon: "success",
            title: "Payment done successfully",
            text: "",
          }).then(() => {
            emptyCartItems();
            setTimeout(()=>{
            window.location.replace("/");},1000);
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Payment failed !! Try again.",
            text: "",
          });
        }
      },
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    // function loadingScript() {
    //   var razorpayObject = window.Razorpay(options);
    //   razorpayObject.open();
    // }

    // new Promise(resolve=>{setTimeout(()=>resolve(loadingScript()), 1000);});

    var razorpayObject = window.Razorpay(options);
    razorpayObject.open();
  };

  useEffect(() => {
    getTokenDetails();
    getCartItems();
  }, []);

  return (
    <>
      <Header cartChanged={-1} />
      <Container>
        <div className="cart-inner-container">
          {cartItems.length > 0 ? (
            <div className="cart">
              {cartItems.map((item, index) => {
                return (
                  <div key={index} className="cartItem">
                    <div className="image">
                      <img
                        src={item.productImage}
                        onClick={() => {
                          navigate("/item/" + item.productId);
                        }}
                        alt="cartItem"
                        className="hand"
                      />
                    </div>
                    <div className="item-desc">
                      <p>{item.productName}</p>
                      <p>Price : {item.productPrice}</p>
                      <p> Quantity : {item.quantity}</p>
                      {/* <div className="button-group">
                <button className="hand inc-btn">-</button>
                <button className="counter-btn">{item.quantity}</button>
                <button className="hand inc-btn">+</button>
              </div> */}
                    </div>
                    <div className="item-price">
                      <p>Total Price</p>
                      <p>{item.productPrice * item.quantity}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <h1>Cart is Empty</h1>
          )}
          {cartItems.length > 0 ? (
          <div className="totalprice">
            <p>Total Price : {totalPrice}</p>
            <button
              className="button"
              onClick={() => {
                setShowForm(true);
              }}
            >
              Place order
            </button>
          </div>
          ) : (
            <p>Add items to place an order</p>
          )}
          {showForm ? (
            <div className="order-form">
              <form
                className="myForm"
                method="get"
                encType="application/x-www-form-urlencoded"
                action="/html/codes/html_form_handler.cfm"
              >
                <p>
                  <label>
                    Name
                    <input type="text" name="customer_name" required />
                  </label>
                </p>

                <p>
                  <label>
                    Phone
                    <input type="tel" name="phone_number" />
                  </label>
                </p>

                <p>
                  <label>
                    Email
                    <input type="email" name="email_address" />
                  </label>
                </p>

                <p>
                  <label>
                    Address
                    <textarea name="comments" maxLength="500"></textarea>
                  </label>
                </p>
                <p>Total Price : {totalPrice}</p>
                <button
                  className="order"
                  onClick={(event) => {
                    displayRazorpay(event);
                  }}
                >
                  Order now
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </Container>
    </>
  );
};

export default Cart;
