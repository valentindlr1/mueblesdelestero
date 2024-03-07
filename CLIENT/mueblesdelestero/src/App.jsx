import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from "./components/Landing/Landing";
import Shop from "./components/Shop/Shop";
import NavBar from "./components/NavBar/NavBar";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Account from "./components/Account/Account";
import Cart from "./components/Cart/Cart";
import BuyStep1 from "./components/BuyStep1/BuyStep1";
import BuyStep2 from "./components/BuyStep2/BuyStep2";
import MyOrders from "./components/MyOrders/MyOrders";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" ? <NavBar /> : ""}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/shop/detail/:id" element={<ProductDetail />} /> {/* ID DEL PRODUCTO */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/datos-de-envio" element={<BuyStep1 />} />
        <Route path="/pago/:id" element={<BuyStep2 />} /> {/* ID DE LA COMPRA */}
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
    </div>
  );
}

export default App;
