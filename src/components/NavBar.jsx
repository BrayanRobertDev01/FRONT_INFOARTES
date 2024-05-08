import React from "react";
import logo from "../images/grafica_logo.png";
import "../styles/NavBar.scss";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="NavBar">
      <div className="content">
        <div>
          <Link to="/">
            <img src={logo} alt="logo da gráfica" />
          </Link>
        </div>
        <div className="links">
          <Link to="/">Tela inicial</Link>
          <Link to="/manage_products">Gerenciar Produtos</Link>
          <Link to="/register-sale">Registrar Venda</Link>
          <Link to="/register-product">Registrar Produto</Link>
        </div>
      </div>
    </div>
  );
}
