import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import "./App.css";
import Login from "./routes/login";
import Register from "./routes/register";
import Home from "./routes/home";
import Cart from "./routes/cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
