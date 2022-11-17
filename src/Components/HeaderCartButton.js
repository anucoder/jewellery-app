import {useEffect, useState } from 'react';
import axios from "axios"

import CartIcon from './CartIcon';

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const [cartItems,setCartItems] = useState([])

  const numberOfCartItems = cartItems.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);

let cartItem = props.cartItem;

  const btnClasses = `button ${btnIsHighlighted ? 'bump' : ''}`;

  let getTokenDetails = () => {
    // read the data from localStorage
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      return false;
    } else {
      return JSON.parse(token);
      // return true;
    }
  };
  let [userDetails, setUserDetails] = useState(getTokenDetails());

  let getCartItems = async () => {
    let user = {email:userDetails.email}
    try {
      let { data } = await axios.post(
        "https://fantasy-jewellery-app.herokuapp.com/cart/items",user
      );
      if (data.status === true) {
        setCartItems([...data.items]);
      }
      else setCartItems([]);
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  useEffect(() => {
    getTokenDetails();
    getCartItems();
    if (cartItem.quantity === undefined) {
      return;
    }
    setBtnIsHighlighted(true);
    let obj = cartItems.find((item, index) => {
      if (item.id === cartItem.id) {
        cartItems[index].quantity=cartItem.quantity
          return true; // stop searching
      }});
  if(obj==undefined) setCartItems([...cartItems,cartItem])

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartItem]);

  return (
    <button onClick={props.onClick} className={btnClasses}>
      <span className="icon">
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className="badge">{numberOfCartItems}</span>
    </button>
    

  );
};

export default HeaderCartButton;