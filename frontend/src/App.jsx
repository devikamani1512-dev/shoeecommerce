
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Womens from "./pages/Womens";
import Mens from "./pages/Mens";
import Kids from "./pages/Kids";
import ProductDetails from "./pages/ProductDetails";
import OrderConfirmation from "./pages/OrderConfirmation";
import TrackOrder from "./pages/TrackOrder";
import DeliverySuccess from "./pages/DeliverySuccess";
import MyOrders from "./pages/MyOrders";


function App() {
  return (
    <GoogleOAuthProvider clientId="362141044352-sqlpd605fgcjsh0m5ikstdi1durcnkc6.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/womens" element={<Womens />} />
            <Route path="/mens" element={<Mens />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/men/product/:id" element={<ProductDetails />} />
            <Route path="/kids/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/delivery-success" element={<DeliverySuccess />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route
  path="/order-confirmation"
  element={<OrderConfirmation />}
/>
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
