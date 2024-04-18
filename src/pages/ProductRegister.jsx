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
          fieldValue: 20,
        },
        {
          fieldName: "Tamanho M",
          fieldValue: 17,
        },
      ],
    },
  ];

  const [active, setActive] = useState();

  const handleShowItem = (index) => {
    if (active !== index) {
      setActive(index);
    } else {
      setActive(null);
    }
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
                {i?.properties?.map((j) => (
                  <h1>
                    {j.fieldName} - {formatoMoedaBrasileira(j.fieldValue)}
                  </h1>
                ))}
              </div>
            </>
          ))}
        </ul>
      </div>
      <div className="ContainerForm">
        {active != null && (
          <form className="form">
            {items[active]?.properties?.map((a) => (
              <div className="questions">
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
    </div>
  );
}
