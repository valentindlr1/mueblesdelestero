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
        <Route path="/buy-step-1" element={<BuyStep1 />} />
        <Route path="/buy-step-2/:id" element={<BuyStep2 />} /> {/* ID DE LA COMPRA */}
      </Routes>
    </div>
  );
}

export default App;
