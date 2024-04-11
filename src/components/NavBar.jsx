import React from "react";
import logo from "../images/grafica_logo.png";
import "../styles/NavBar.scss";

export default function NavBar() {
  return (
    <div className="NavBar">
      <div className="content">
        <div>
          <a href="/">
            <img src={logo} alt="logo da gráfica" />
          </a>
        </div>
        <div className="links">
          <a href="/">Tela inicial</a>
          <a href="/">Gerenciar Produtos</a>
          <a href="/">Registrar Venda</a>
        </div>
      </div>
    </div>
  );
}
