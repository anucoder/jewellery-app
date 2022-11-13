import { useContext, useEffect, useState } from 'react';

import CartIcon from './CartIcon';

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const [cartItems,setCartItems] = useState([])

  const numberOfCartItems = cartItems.reduce((curNumber, item) => {
    return curNumber + item.qty;
  }, 0);

let cartItem = props.cartItem;

  const btnClasses = `button ${btnIsHighlighted ? 'bump' : ''}`;

  useEffect(() => {
    if (cartItem.qty === undefined) {
      return;
    }
    setBtnIsHighlighted(true);
    let obj = cartItems.find((item, index) => {
      if (item.id === cartItem.id) {
        cartItems[index].qty=cartItem.qty
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