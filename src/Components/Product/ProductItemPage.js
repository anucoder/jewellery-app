import Container from "../Container";
import Header from "../Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import jwt_decode from "jwt-decode";

function ProductItemPage() {
  let [product, setProductDetails] = useState({
    id:0,
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
  let [cartItem, setCartItem] = useState({ email:"",id:0,quantity: 0 });
  let [cartCounter,setCartCounter]= useState(0);

  let { id } = useParams();

  let addCartItems = async (_cartItem) => {
    try {
      let { data } = await axios.post(
        "https://jewellry-app-be.up.railway.app/cart/new-item",_cartItem
      );
      // console.log(data)
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  let updateCartItems = async (_cartItem) => {
    try {
      let { data } = await axios.post(
        "https://jewellry-app-be.up.railway.app/cart/update-qty",_cartItem
      );
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  let deleteCartItem = async (_cartItem) => {
    try {
      let { data } = await axios.post(
        "https://jewellry-app-be.up.railway.app/cart/delete-item",_cartItem
      );
      // console.log(data)
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  let addCartItemsTotal = () => {
    let date = new Date();
    let textDate = date.toString();
    let _cartItem = {}
    if (cartItem.quantity == 0){ 
     _cartItem = {
        email:userDetails.email,date:textDate,id:product.id,title:product.title,price:product.price,image:product.image, quantity: 1 }
        addCartItems(_cartItem);
        setCartCounter(_cartItem.quantity);
      }
    else {
      _cartItem = { ...cartItem };
      _cartItem.quantity += 1;
      updateCartItems({email:userDetails.email,id:product.id,quantity:_cartItem.quantity})
      setCartCounter(_cartItem.quantity);
    }
    setCartItem({..._cartItem})
    //console.log(_cartItem)
    
  };

  let removeCartItemsTotal = () => {
    let _cartItem = { ...cartItem };
    _cartItem.quantity -= 1;
    setCartCounter(_cartItem.quantity);
    let filter = {email:userDetails.email,id:product.id}
    if(_cartItem.quantity==0){
      setCartItem({ ..._cartItem });
      deleteCartItem(filter);
      return;
    }
    setCartItem({ ..._cartItem });
    updateCartItems({...filter,quantity:_cartItem.quantity})
  };

  let getProductDetails = async () => {
    try {
      let { data } = await axios.get(
        "https://jewellry-app-be.up.railway.app/product-details/" + id
      );
      if (data.status === true) {
        setProductDetails({ ...data.productDetails });
        getQuantityItem(data.productDetails.id);
      }
      // console.log(data)}
      else setProductDetails({});
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
    // console.log(categoryDetails);
  };

  let getQuantityItem = async (id) => {
    try {
      let filter = {email:userDetails.email,id:id}
      //console.log(filter)
      let { data } = await axios.post(
        "https://jewellry-app-be.up.railway.app/cart/get-qty",filter
      );
      if (data.status === true) {
      let _cartItem1 = {
      email:userDetails.email,id:product.id,quantity: data.quantity.quantity }
      setCartItem({..._cartItem1});
      setCartCounter(_cartItem1.quantity)
      // console.log(data.quantity)
      }
      //console.log(data)
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
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
    getTokenDetails();
    getProductDetails();
  }, []);

  return (
    <>
      <Header cartChanged={cartCounter} />
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
              {cartItem.quantity > 0 ? (
                <div className="hand add-remove-btn">
                  <button className="hand inc-btn" onClick={() => removeCartItemsTotal()}>
                    -
                  </button>
                  <button className="counter-btn">{cartItem.quantity}</button>
                  <button className="hand inc-btn" onClick={() => addCartItemsTotal()}>
                    +
                  </button>
                </div>
              ) : (
                userDetails ? (<button className="hand add-cart-btn" onClick={() => addCartItemsTotal()}>
                  <span id="cart-icon">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                  </span>
                  Add to Cart
                </button>):(<button className="add-cart-btn">Please Login to place Order</button>)
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ProductItemPage;
