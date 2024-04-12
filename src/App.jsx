import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import ProductRegister from "./pages/ProductRegister";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./styles/App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="NavBarGap">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/register-product" element={<ProductRegister />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
