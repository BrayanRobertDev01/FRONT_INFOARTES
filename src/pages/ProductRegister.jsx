import React, { useState } from "react";
import "../styles/ProductRegister.scss";
import Card from "../components/Card";

export default function ProductRegister() {
  const items = [
    {
      title: "Folheto",
      properties: [
        {
          fieldName: "Frente e Verso 10x15",
          fieldValue: 10,
          fieldPackage: 1000,
        },
        {
          fieldName: "Somente Frente 10x15",
          fieldValue: 10,
          fieldPackage: 1000,
        },
        {
          fieldName: "Frente e Verso 06x08",
          fieldValue: 10,
          fieldPackage: 1000,
        },
        {
          fieldName: "Somente Frente 06x08",
          fieldValue: 10,
          fieldPackage: 1000,
        },
      ],
    },
    {
      title: "Camisa",
      properties: [
        {
          fieldName: "Tamanho G",
          fieldtec: "Algodão",
          fieldColor: "Preto",
          fieldValue: 20,
        },
        {
          fieldName: "Tamanho M",
          fieldtec: "Algodão",
          fieldColor: "Preto",
          fieldValue: 17,
        },
      ],
    },
  ];


  const [active, setActive] = useState();
  const [FrenteDetails, setFrenteDetails] = useState(false)
  const [SomenteFrenteDetails, setSomenteFrenteDetails] = useState(false)

  const handleShowItem = (index) => {
    if (active !== index) {
      setActive(index);
      setFrenteDetails(false);
      setSomenteFrenteDetails(false);
    } else {
      setActive(null);
    }
  };

  const toggleDetailsSomenteFrente = () => {
    setSomenteFrenteDetails(!SomenteFrenteDetails);
    setFrenteDetails(false);
  };

  const toggleDetailsFrente = () => {
    setFrenteDetails(!FrenteDetails);
    setSomenteFrenteDetails(false); 
  };

  const formatoMoedaBrasileira = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="ProductRegisterBody">
      <div>
        <ul className="ItemsList">
          {items.map((i, index) => (
            <>
              <li onClick={() => handleShowItem(index)}>{i.title}</li>
              <div className={`item ${active === index ? "active" : ""}`}>
              {i.title === "Folheto" && i.properties && i.properties.map((j) => (
                  <h1>
                    {j.fieldName} - {formatoMoedaBrasileira(j.fieldValue)}
                  </h1>
              
                ))}
              {i.title === "Camisa" && i.properties && i.properties.map((j) => (
                  <h1>
                    {j.fieldtec}, {j.fieldName}, {j.fieldColor} - {formatoMoedaBrasileira(j.fieldValue)}
                  </h1>
              
                ))}
              </div>
            </>
          ))}
        </ul>
      </div>
      <div className="SubProductFolheto">
        {(active != null && items[active].title === "Folheto") && (
          <div className="Teste">
          <h1 onClick={toggleDetailsFrente}>FRENTE E VERSO</h1>
          {FrenteDetails && (
            <form className="form">
            {items[active]?.properties
              ?.filter(a => a.fieldName.startsWith("Frente e Verso"))
              .map((a, index) => (
                <div className="questions" key={index}>
                  <Card
                    properties={a.fieldName}
                    quantity={a.fieldPackage}
                    value={a.fieldValue}
                  />
                </div>
              ))}
          </form>          
          )}
          <h1 onClick={toggleDetailsSomenteFrente}>SOMENTE FRENTE</h1>
          {SomenteFrenteDetails && (
            <form className="form">
            {items[active]?.properties
              ?.filter(a => a.fieldName.startsWith("Somente Frente"))
              .map((a, index) => (
                <div className="questions" key={index}>
                  <Card
                    properties={a.fieldName}
                    quantity={a.fieldPackage}
                    value={a.fieldValue}
                  />
                </div>
              ))}
          </form>      
          )}
        </div>

        )}
      </div>
    </div>
  );
}

