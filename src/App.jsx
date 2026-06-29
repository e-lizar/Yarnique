import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import About from "./About";
import CustomOrder from "./CustomOrder";
import Admin from "./Admin";
import AdminLogin from "./AdminLogin";
import ExploreCollection from "./ExploreCollection";
import AdminProducts from "./AdminProducts";
import Register from "./Register";
import Login from "./Login";
import Account from "./Account";
import MyOrders from "./MyOrders";
import EditProfile from "./EditProfile";
import ViewCart from "./ViewCart";
import Payment from "./Payment";


function App() {

  const products = [
  {
    id: 1,
    name: "Crochet Hello Kitty bikini ",
    price: "$45",
    image: "src/assets/two-piece-hello-kitty-set.jpeg"
  },
  {
    id: 2,
    name: "Crochet Skirt Ribbon",
    price: "$28",
    image: "src/assets/ribbon-skirt.jpeg"
  },
  {
    id: 3,
    name: "Croche Mini dress",
    price: "$20",
    image: "src/assets/backless-dress.jpeg"
  },
    
  {
    id: 4,
    name: "Croche Bag",
    price: "$75",
    image: "src/assets/shoulder-bag.jpeg"
  }
];

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/custom-order" element={<CustomOrder />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/explore" element={<ExploreCollection />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/account" element={<Account />}/>
      <Route path="/my-orders" element={<MyOrders />}/>
      <Route path="/edit-profile" element={<EditProfile />}/>
      <Route path="/cart" element={<ViewCart />}/>
      <Route path="/payment" element={<Payment />}/>

      
    </Routes>
  );
}

export default App;