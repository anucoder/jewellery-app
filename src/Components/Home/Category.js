import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

const Category = () => {

  let [categoryList, setCategories] = useState([]);

  let navigate = useNavigate();

  let getProductsPage = (id)=>{
    navigate(`/product-page/${id}`);
  }
  let getCategories = async () => {
    try {
      let { data } = await axios.get(
        "https://fantasy-jewellery-app.herokuapp.com/categories"
      );
      if (data.status === true) {setCategories([...data.categoryList]);}
      else setCategories([]);
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
    // console.log(categoryList);
  };

  useEffect(() => {
    getCategories();
  }, []);


  return (
    <>
      <h1 className="heading">Our Collections</h1>
      <hr></hr>
      <div className="collections">
      {categoryList.map((category,index)=>{
        return (
          <figure key={index} className="Card hand width30" onClick={()=>{getProductsPage(category.id)}}>
        <img className="img-90" src={category.image} alt="jewelry-collections"/>
        <figcaption className="Card-caption">{category.name}</figcaption>
      </figure>
        )
      })}
      </div>
    </>
  );
};

export default Category;