import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProductPagination } from "../../actions/productsAction";
import Products from "../products/Products";
import Pagination from "react-js-pagination";
import {
  setPageIndex,
  updateCategory,
  updatePrecio,
  updateRating,
} from "../../slices/productPaginationSlice";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

// import "rc-slider/assets/index.css";
// const {createSliderWithTooltip} = Slider;
// const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const [precio, setPrecio] = useState([1, 10000]);
  const dispatch = useDispatch();

  //Invocar la lista de cateogrias
  const { categories } = useSelector((state) => state.category);

  console.log(categories);

  //Referenciado a products: []
  //const { products, loading, error } = useSelector((state) => state.products);
  const {
    products,
    count,
    pageIndex,
    loading,
    error,
    resultByPage,
    search,
    pageSize,
    precioMax,
    precioMin,
    category,
    rating,
  } = useSelector((state) => state.productPagination);

  useEffect(() => {
    if (error != null) {
      return alert(error);
    }

    dispatch(
      getProductPagination({
        pageIndex: pageIndex, // almacenado en Redux,
        pageSize: pageSize,
        search: search,
        precioMax: precioMax,
        precioMin: precioMin,
        cateogryId: category,
        rating: rating,
      })
    );
  }, [
    dispatch,
    error,
    search,
    pageSize,
    pageIndex,
    precioMax,
    precioMin,
    category,
    rating,
  ]);

  function setCurrentPageNo(pageNumber) {
    dispatch(setPageIndex({ pageIndex: pageNumber }));
  }

  //Función para cambiar el precio
  function onChangePrecio(precioEvent) {
    setPrecio(precioEvent);
  }

  function onAfterChange(precioEvent) {
    dispatch(updatePrecio({ precio: precioEvent }));
  }

  function onChangeCategory(ctg) {
    dispatch(updateCategory({ category: ctg.id }));
  }

  function onChangeStar(item) {
    dispatch(updateRating({ rating: item }));
  }

  return (
    <Fragment>
      <MetaData titulo={"Los mejores productos en línea."} />
      <section id="products" className="container mt-5">
        <div className="row">
          {search ? (
            <Fragment>
              <div className="col-6 col-md-3 mt-5 mb-5">
                <div className="px-5">
                  <Range
                    marks={{ 1: `$1`, 10000: `$10000` }}
                    min={1}
                    max={100000}
                    defaultValue={[1, 10000]}
                    tipFormatter={(value) => `$${value}`}
                    value={precio}
                    tipProps={{ placement: "top", visible: true }}
                    onChange={onChangePrecio}
                    onAfterChange={onAfterChange}
                  />
                </div>
                <hr className="my-5" />

                <div className="mt-5">
                  <h4 className="mb-3">Categorias</h4>
                  <ul className="pl-0">
                    {categories.map((ctg) => (
                      <li
                        style={{ cursor: "pointer", listStyleType: "none" }}
                        key={ctg.id}
                        onClick={() => onChangeCategory(ctg)}
                      >
                        {ctg.nombre}
                      </li>
                    ))}
                  </ul>
                </div>
                <hr className="my-5" />

                <div className="mt-5">
                  <h4 className="mb-3">Ratings</h4>
                  <ul className="pl-0">
                    {[5, 4, 3, 2, 1].map((item) => (
                      <li
                        style={{ cursor: "pointer", listStyleType: "none" }}
                        key={item}
                        onClick={() => onChangeStar(item)}
                      >
                        <div className="rating-outer">
                          <div
                            className="rating-inner"
                            style={{ width: `${item * 20}%` }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-6 col-md-9">
                <div className="row">
                  <Products col={4} product={products} loading={loading} />
                </div>
              </div>
            </Fragment>
          ) : (
            <Products col={4} product={products} loading={loading} />
          )}
        </div>
      </section>

      <div className="d-flex justify-content-center mt-5">
        <Pagination
          activePage={pageIndex}
          itemsCountPerPage={pageSize}
          totalItemsCount={count}
          onChange={setCurrentPageNo}
          nextPageText={">"}
          prevPageText={"<"}
          firstPageText={"<<"}
          lastPageText={">>"}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </Fragment>
  );
};

export default Home;
