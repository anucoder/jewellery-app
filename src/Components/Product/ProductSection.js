import { useNavigate } from "react-router-dom";

const ProductSection = (props) => {
  let navigate = useNavigate();
  let items = props.items;
  return (
    <>
      <div className="products">
        {items.length > 0 ? (
          items.map((item, index) => {
            return (
              <figure
                key={index}
                className="Card hand width40"
                onClick={() => {
                  navigate("/item/" + item._id);
                }}
              >
                <img
                  className="img-75"
                  src={item.image}
                  alt="jewellry-collections"
                />
                <figcaption className="Card-caption">
                  <p>{item.title}</p>
                  <p>{item.price}</p>
                  <p>{item.rating.rate} stars</p>
                </figcaption>
              </figure>
            );
          })
        ) : (
          <h2>No Results</h2>
        )}
      </div>
    </>
  );
};

export default ProductSection;
