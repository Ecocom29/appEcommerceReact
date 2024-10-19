import React, { Fragment } from "react";
import Loading from "../layout/Loading";
import Product from "../product/Product";

const Products = ({ product, col, loading }) => {
  
  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      {product ? (
        product.map((productElement) => (
          <Product key={productElement.id} products={productElement} col={col} />
        ))
      ) : (
        <Loading />
      )}
    </Fragment>
  );
};

export default Products;
