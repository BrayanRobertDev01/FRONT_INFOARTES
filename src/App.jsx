import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./styles/App.scss";
import ManageProducts from "./pages/ManageProducts";
import RegisterProducts from "./pages/RegisterProducts";
import Toninho from "./pages/Teste";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="NavBarGap">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/manage_products" element={<ManageProducts />} />
            <Route path="/register-product" element={<RegisterProducts/>}/>
            <Route path="/manage-types" element={<Toninho/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
