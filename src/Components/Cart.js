import Header from "./Header";
import Container from "./Container";

const Cart = () => {
  return (
    <>
      <Header cartItem={{}} />
      <Container>
        <div className="cart">
          <div className="cartItem">
            <div className="image">
              <img src="/assets/necklace1.jpg" alt="cartItem" />
            </div>
            <div className="item-desc">
              <p>White Lady Eaaring</p>
              <p>Price : 20000</p>
              <div className="button-group">
                {/* {cartItem.qty > 0 ? ( */}

                {/* <button className="hand inc-btn" onClick={() => removeCartItemsTotal()}> */}
                <button className="hand inc-btn">-</button>
                <button className="counter-btn">1</button>
                {/* <button className="hand inc-btn" onClick={() => addCartItemsTotal()}> */}
                <button className="hand inc-btn">+</button>
              </div>
              {/* ) : ( 
                <button className="hand add-cart-btn" onClick={() => addCartItemsTotal()}>
                  <span id="cart-icon">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                  </span>
                  Add to Cart
                </button>
               )} */}
            </div>
            <div className="item-price">
              <p>Total Price</p>
              <h2>20000</h2>
            </div>
          </div>
        </div>
        <div className="totalPrice">
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
            <p>Total Price : 20000</p>
          <button className="order">Order now</button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Cart;
