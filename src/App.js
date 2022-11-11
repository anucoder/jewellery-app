import HomePage from "./Components/Home/HomePage";
import ProductPage from "./Components/Product/ProductPage";
import {Routes,Route} from "react-router-dom";
import ProductItemPage from "./Components/Product/ProductItemPage";

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product-page/:cat_id" element={<ProductPage />} />
          <Route path="/item/:id" element={<ProductItemPage />} />
      </Routes>
    </>
  );
}

export default App;
