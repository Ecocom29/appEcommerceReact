import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./componets/layout/Footer";
import Header from "./componets/layout/Header";
import Home from "./componets/layout/Home";
import Login from "./componets/security/Login";
import ProductDetail from "./componets/product/ProductDetail";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "./actions/categoryAction";
import Register from "./componets/security/Register";
import Profile from "./componets/security/Profile";
import ProtectedRoute from "./componets/route/ProtectedRoute";
import { loadUser } from "./actions/userAction";
import UpdateProfile from "./componets/security/UpdateProfile";
import ForgotPassword from "./componets/security/ForgotPassword";
import NewPassword from "./componets/security/NewPassword";
import UpdatePassword from "./componets/security/UpdatePassword";
import { getShoppingCart } from "./actions/cartAction";
import Cart from "./componets/cart/Cart";
import { getCountries } from "./actions/countryAction";
import Shipping from "./componets/cart/Shipping";
import ConfirmOrder from "./componets/cart/ConfirmOrder";
import Payment from "./componets/cart/Payment";
import OrderSuccess from "./componets/cart/OrderSuccess";

function App() {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getCategories({}));
    dispatch(getShoppingCart({}));
    dispatch(getCountries({}));

    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch, token]);

  return (
    <Router>
      <div className="App">
        <Header />

        <div className="container container fluid">
          <Routes>
          <Route path="/"  element={<Home />}  />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/password/forgot" element={<ForgotPassword />} />
              <Route path="/password/reset/:token" element={<NewPassword />} />
              
              <Route exact path="/me" element={<ProtectedRoute />}>
                <Route path="/me" element={<Profile />} />
              </Route>

              <Route exact path="/password/update" element={<ProtectedRoute />}>
                <Route path="/password/update" element={<UpdatePassword />} />
              </Route>


              <Route exact path="/me/update" element={<ProtectedRoute />}>
                <Route path="/me/update" element={<UpdateProfile />} />
              </Route>

              <Route exact path="/shipping" element={<ProtectedRoute />}>
                <Route path="/shipping" element={<Shipping />} />
              </Route>

              <Route exact path="/order/confirm" element={<ProtectedRoute />}>
                <Route path="/order/confirm" element={<ConfirmOrder />} />
              </Route>

              <Route exact path="/payment" element={<ProtectedRoute />}>
                <Route path="/payment" element={<Payment />} />
              </Route>

              <Route exact path="/success" element={<ProtectedRoute />}>
                <Route path="/success" element={<OrderSuccess />} />
              </Route>

            {/* END */}
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
