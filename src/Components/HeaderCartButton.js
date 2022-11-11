import { useContext, useEffect, useState } from 'react';

import CartIcon from './CartIcon';

const HeaderCartButton = () => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

//   const numberOfCartItems = items.reduce((curNumber, item) => {
//     return curNumber + item.amount;
//   }, 0);

  const btnClasses = `button ${btnIsHighlighted ? 'bump' : ''}`;

//   useEffect(() => {
//     if (items.length === 0) {
//       return;
//     }
//     setBtnIsHighlighted(true);

//     const timer = setTimeout(() => {
//       setBtnIsHighlighted(false);
//     }, 300);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [items]);

  return (
    <button className={btnClasses}>
      <span className="icon">
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className="badge">6</span>
    </button>
  );
};

export default HeaderCartButton;