import Header from "./Header";
import Container from "./Container";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  let [showForm,setShowForm] = useState(false);

  let totalPrice = cartItems.reduce((curNumber, item) => {
    return curNumber + (item.productPrice*item.quantity);
  }, 0);

  let getCartItems = async () => {
    let user = {email:userDetails.email}
    // console.log(JSON.parse(userDetails))
    try {
      let { data } = await axios.post(
        "https://fantasy-jewellery-app.herokuapp.com/cart/items",user
      );
      //console.log(data)
      if (data.status === true) {
        setCartItems([...data.items]);
    
      //console.log(data)
      }
      else setCartItems([]);
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
    // console.log(categoryDetails);
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
        {cartItems.length >0 ? (<div className="cart">
          {cartItems.map((item,index)=>{
          return(<div key={index} className="cartItem">
            <div className="image">
              <img src={item.productImage} onClick={() => {
                  navigate("/item/" + item.productId);
                }} alt="cartItem" className="hand"/>
            </div>
            <div className="item-desc">
              <p>{item.productName}</p>
              <p>Price : {item.productPrice}</p>
              <p> Quantity : {item.quantity }</p>
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
          </div>)}) }
        </div>): (<h1>Cart is Empty</h1>)}
        <div className="totalprice">
          <p>Total Price : {totalPrice}</p>
          <button className="button" onClick={()=>{setShowForm(true);}}>Place order</button>
        </div>        
        {showForm ? (<div className="order-form">
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
          <button className="order">Order now</button>
          </form>
        </div>):null}
        </div>
      </Container>
    </>
  );
};

export default Cart;
