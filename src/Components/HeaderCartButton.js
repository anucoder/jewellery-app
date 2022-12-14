import {useEffect, useState } from 'react';
import axios from "axios"

import CartIcon from './CartIcon';

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const [cartItems,setCartItems] = useState([])

  const numberOfCartItems = cartItems.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);

// let cartItem = props.cartItem;

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
        "https://jewellry-app-be.up.railway.app/cart/items",user
      );
      console.log(data.items)
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
    if(props.cartChanged >=0){console.log(props.cartChanged)
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      getCartItems();
      // console.log("cartcartItems "+cartItems)
      setBtnIsHighlighted(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };}
  }, [props.cartChanged]);

  useEffect(()=>{
    getCartItems();
    getTokenDetails();
  },[])

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