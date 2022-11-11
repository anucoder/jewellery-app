import Header from "../Header";
import Container from "../Container";
import ProductSection from "./ProductSection";
import Pagination from "./Pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  
  let { cat_id } = useParams();
  let Category = "Necklace"
  switch (Number(cat_id)) {
    case 1:
      Category = "Ring";
      break;
    case 2:
      Category = "Earring";
      break;
    case 3:
      Category = "Necklace";
      break;
    case 4:
      Category = "Bracelet";
      break;
    case 5:
      Category = "Anklet";
      break;
    case 6:
      Category = "Bangles";
      break;
  }

  let [productList, setProductList] = useState([]);
  let [filter, setFilter] = useState({ category:Number(cat_id)});
  let [pages, setPages] = useState([0]);

  let filterOperation = async (filter) => {
    console.log(filter);
    let URL = "http://localhost:5002/products/filter";
    try {
      let { data } = await axios.post(URL, filter);
      if (data.status === true) {
        setPages([...Array(data.pages).keys()]);
        setProductList([...data.result_page]);
      } else {
        setProductList([]);
        setPages([]);
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  let makeFilteration = (event, type) => {
    let value = event.target.value;
    let _filter = { ...filter };
    switch (type) {
      case "rating":
        _filter["page"]=1;
        if (Number(value) > 0) _filter["rating"] = Number(value);
        else delete _filter["rating"];
        break;
      case "sort":
        _filter["page"]=1;
        _filter["sort"] = {"price" :Number(value)};
        break;
      case "price":
        _filter["page"]=1;
        let pricerange = value.split("-");
        _filter["lcost"] = pricerange[0];
        _filter["hcost"] = pricerange[1];
        break;
      case "material":
        _filter["page"]=1;
        let _material = [];
        if(_filter["material"] !== undefined)
          _material = [..._filter["material"]];
        if(event.target.checked) _material.push(value);
        else {
          let index = _material.indexOf(Number(value));
          _material.splice(index, 1);
        }
        // console.log(_cuisine);
        if (_material.length === 0) delete _filter["material"];
        else _filter["material"] = [..._material];
        break;
      case "stones":
          _filter["page"]=1;
          let _stones = [];
          if(_filter["stones"] !== undefined)
            _stones = [..._filter["stones"]];
          if(event.target.checked) _stones.push(value);
          else {
            let index = _stones.indexOf(Number(value));
            _stones.splice(index, 1);
          }
          // console.log(_cuisine);
          if (_stones.length === 0) delete _filter["stones"];
          else _filter["stones"] = [..._stones];
          break;  
    }
    setFilter({ ..._filter });
    filterOperation(_filter);
  };


  let getProductList = async () => {
    try {
      let { data } = await axios.get(
        "https://fantasy-jewellery-app.herokuapp.com/products/" + cat_id
      );
      if (data.status === true) {
        setProductList([...data.productlist]);
      }
      // console.log(data)}
      else setProductList([]);
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
    // console.log(categoryList);
  };

  useEffect(() => {
    getProductList();
    filterOperation(filter);
  }, []);

  return (
    <>
      <Header />
      <Container>
        <div className="inner-container">
          <div className="product-section">
            <h1 className="heading">Explore our {Category} collection</h1>
            <hr></hr>
            <ProductSection items={productList} category={Category}/>
            {productList.length>4 ? <Pagination /> : null}
          </div>
          <div className="filter-section">
            <div className="heading">Apply filters</div>
            <hr></hr>

            <p className="">Ratings</p>
            <div>
              <div className="ms-1">
                <input
                  type="radio"
                  name="ratings"
                  className="form-check-input"
                  value="4"
                  onChange={(event) => makeFilteration(event, "rating")}
                />
                <label htmlFor="" className="form-check-label ms-1">
                  Above 4 stars
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="radio"
                  name="ratings"
                  className="form-check-input"
                  value="3"
                  onChange={(event) => makeFilteration(event, "rating")}
                />
                <label htmlFor="" className="form-check-label ms-1">
                  Above 3 stars
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="radio"
                  name="ratings"
                  className="form-check-input"
                  value="2"
                  onChange={(event) => makeFilteration(event, "rating")}
                />
                <label htmlFor="" className="form-check-label ms-1">
                  Above 2 stars
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="radio"
                  name="ratings"
                  className="form-check-input"
                  value="1"
                  onChange={(event) => makeFilteration(event, "rating")}
                />
                <label htmlFor="" className="form-check-label ms-1">
                  Above 1 star
                </label>
              </div>
            </div>
            <p>Price:</p>
            <div>
              <div className="ms-1">
                <input
                  type="radio"
                  name="price"
                  className="form-check-input"
                  value="100-1000"
                  onChange={(event) => makeFilteration(event, "price")}
                />
                <label htmlFor="" className="form-check-label ms-1">
                  100-1000
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="radio"
                  name="price"
                  className="form-check-input"
                  value="1000-5000"
                  onChange={(event) => makeFilteration(event, "price")}
                />
                <label htmlFor="" className="form-check-label ms-1">
                  1000-5000
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="radio"
                  name="price"
                  className="form-check-input"
                  value="5000-10000"
                  onChange={(event) => makeFilteration(event, "price")}
                />
                <label htmlFor="" className="form-check-label ms-1">
                  5000-10000
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="radio"
                  name="price"
                  className="form-check-input"
                  value="10000-100000"
                  onChange={(event) => makeFilteration(event, "price")}
                />
                <label htmlFor="" className="form-check-label ms-1">
                  10000-100000
                </label>
              </div>
            </div>
            <p>Materials used : </p>
            <div>
              <div className="ms-1">
                <input
                  type="checkbox"
                  name="material"
                  className="form-check-input"
                  value="Gold"
                  onChange={(event) => makeFilteration(event, "material")}
                />
                <label htmlFor="" className="form-check-label ms-1">
                  Gold
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="checkbox"
                  name="material"
                  className="form-check-input"
                  value="Silver"
                  onChange={(event) => makeFilteration(event, "material")}
                />
                <label htmlFor="" className="form-check-label ms-1">
                  Silver
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="checkbox"
                  name="material"
                  className="form-check-input"
                  value="Platinum"
                  onChange={(event) => makeFilteration(event, "material")}
                />
                <label htmlFor="" className="form-check-label ms-1">
                  Platinum
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="checkbox"
                  name="material"
                  className="form-check-input"
                  value="Rose Gold"
                  onChange={(event) => makeFilteration(event, "material")}
                />
                <label htmlFor="" className="form-check-label ms-1">
                  Rose Gold
                </label>
              </div>
            </div>
            <p>Stones used : </p>
            <div>
              <div className="ms-1">
                <input
                  type="checkbox"
                  name="stones"
                  className="form-check-input"
                  value="Diamond"
                  onChange={(event) => makeFilteration(event, "stones")}
                />
                <label htmlFor="" className="form-check-label ms-1">
                  Diamond
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="checkbox"
                  name="stones"
                  className="form-check-input"
                  value="Ruby"
                  onChange={(event) => makeFilteration(event, "stones")}
                />
                <label htmlFor="" className="form-check-label ms-1">
                  Ruby
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="checkbox"
                  name="stones"
                  className="form-check-input"
                  value="Emerald"
                  onChange={(event) => makeFilteration(event, "stones")}
                />
                <label htmlFor="" className="form-check-label ms-1">
                  Emerald
                </label>
              </div>
              <div className="ms-1">
                <input
                  type="checkbox"
                  name="stones"
                  className="form-check-input"
                  value="Pearl"
                  onChange={(event) => makeFilteration(event, "stones")}
                />
                <label htmlFor="" className="form-check-label ms-1">
                  Pearl
                </label>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductPage;
