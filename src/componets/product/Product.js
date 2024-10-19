import React from "react";
import { Link } from "react-router-dom";

const Product = ({ products, col }) => {
  
  console.log(products);
  const default_image = "./images/default_product.png";

  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src={products.images[0] ? products.images[0].url : default_image}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link>{products.nombre}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(products.rating / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({products.numeroReviews} Reviews)</span>
          </div>
          <p className="card-text">$ {products.precio}</p>
          <Link id="view_btn" className="btn btn-block"  to={`/product/${products.id}`}>
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
