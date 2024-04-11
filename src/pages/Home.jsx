import React from "react";
import "../styles/Home.scss";

export default function Home() {
  return (
    <div className="HomeBody">
      <div className="HomeContainer">
        <div className="LeftBox">
          <div className="UserInformations">
            <div className="UserDetail"></div>
            <h1>Olá, Brayan Robert. Bom dia!</h1>
            <h2>Quarta-feira, 10/04/2024</h2>
          </div>
          <div className="FastStats">
            <div>
              <h1>999</h1>
              <p>Finalizadas</p>
            </div>
            <div>
              <h1>999</h1>
              <p>Em Espera</p>
            </div>
            <div>
              <h1>999</h1>
              <p>Canceladas</p>
            </div>
          </div>
        </div>
        <div className="RightBox">
          <div>
            <div className="RealtimeValues">
              <div>
                <h2>Abril</h2>
                <h1>R$10.000,00</h1>
              </div>
              <div>
                <h2>Esta semana</h2>
                <h1>R$500,00</h1>
              </div>
            </div>
            <div className="highlight">
              <div>
                <h2>Valor Bruto</h2>
                <h1>R$10.000,00</h1>
              </div>
              <div>
                <h2>Melhor Mês</h2>
                <h1>FEV</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottomContent">
        <h1>TESTE</h1>
        <h1>TESTE</h1>
        <h1>TESTE</h1>
        <h1>TESTE</h1>
        <h1>TESTE</h1>
      </div>
    </div>
  );
}
