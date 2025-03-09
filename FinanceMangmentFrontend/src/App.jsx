import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Content from "./Pages/Content";
import Footer from "./Pages/Footer";
import AddFinance from "./Pages/AddFinance";
import EditFinance from "./Pages/EditFinance";
import Navbar from "./Pages/Navbar";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/" element={<Content />} />
          <Route path="/AddFinance" element={<AddFinance />} />
          <Route path="/edit-finance/:id" element={<EditFinance />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
