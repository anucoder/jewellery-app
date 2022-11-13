import Container from "../Container";
import Header from "../Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductItemPage() {
  let [product, setProductDetails] = useState({
    title: "",
    description: "",
    image: "/assets/earring-bg.jpg",
    material: [],
    stones: [],
    rating: {
      rate: 0,
      count: 0,
    },
    price: 0,
  });
  let [cartItem, setCartItem] = useState({ qty: 0 });
  let [totalPrice, setTotalrice] = useState(0);

  let { id } = useParams();

  let addCartItemsTotal = () => {
    if (cartItem.qty == 0) setCartItem({ ...product, qty: 1 });
    else {
      let _cartItem = { ...cartItem };
      _cartItem.qty += 1;
      setCartItem({ ..._cartItem });
    }
  };

  let removeCartItemsTotal = () => {
    let _cartItem = { ...cartItem };
    _cartItem.qty -= 1;
    setCartItem({ ..._cartItem });
  };

  let getProductDetails = async () => {
    try {
      let { data } = await axios.get(
        "https://fantasy-jewellery-app.herokuapp.com/product-details/" + id
      );
      if (data.status === true) {
        setProductDetails({ ...data.productDetails });
      }
      // console.log(data)}
      else setProductDetails({});
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
    // console.log(categoryDetails);
  };
  let Category = "NECKLACE";
  switch (product.category) {
    case 1:
      Category = "RING";
      break;
    case 2:
      Category = "EARRING";
      break;
    case 3:
      Category = "NECKLACE";
      break;
    case 4:
      Category = "BRACELET";
      break;
    case 5:
      Category = "ANKLET";
      break;
    case 6:
      Category = "BANGLES";
      break;
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
      <Header cartItem={cartItem} />
      <Container>
        {/* {console.loag(product)} */}
        <div className="container-large">
          <div className="card-large">
            <img
              className="product-image"
              src={product.image}
              alt="necklace-pic"
            />
            <div className="description-sec">
              <p className="product">{Category}</p>
              <h1 className="product-name">{product.title}</h1>
              <p className="product-description">{product.description}</p>
              <p>
                Materials used :{" "}
                {product.material.length > 0
                  ? product.material.reduce((pVal, cVal) => {
                      return pVal + " , " + cVal;
                    })
                  : null}
              </p>
              <p>
                Stones used :{" "}
                {product.stones.length > 0
                  ? product.stones.reduce((pVal, cVal) => {
                      return pVal + " , " + cVal;
                    })
                  : null}
              </p>
              <div className="price">
                <h1 className="new-price">{product.price}</h1>
                <p>
                  Ratings: {product.rating.rate}{" "}
                  <i className="fa fa-star" aria-hidden="true"></i>(
                  {product.rating.count})
                </p>
              </div>
              {cartItem.qty > 0 ? (
                <div className="hand add-remove-btn">
                  <button className="hand inc-btn" onClick={() => removeCartItemsTotal()}>
                    -
                  </button>
                  <button className="counter-btn">{cartItem.qty}</button>
                  <button className="hand inc-btn" onClick={() => addCartItemsTotal()}>
                    +
                  </button>
                </div>
              ) : (
                <button className="hand add-cart-btn" onClick={() => addCartItemsTotal()}>
                  <span id="cart-icon">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                  </span>
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ProductItemPage;
