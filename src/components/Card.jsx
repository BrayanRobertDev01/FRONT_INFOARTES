import React from "react";
import "../styles/Card.scss";
import { RiPencilFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";

export default function Card({ properties, quantity, value, cor }) {
  return (
    <>
      <div className="mainCard">
        <header>
          <h1>{properties}</h1>
        </header>
        <div style={{ display: 'flex', gap: '15%', padding: '0 10px 0 10px', fontSize: 18 }}>
          {quantity ? (<label>Quantidade: {quantity}</label>) : null}
          {cor ? (<label>Cor: {cor}</label>) : null}
          <label>Valor: R${value},00</label>
        </div>
        <section className="headicons">
          <RiPencilFill />
          <FaTrash />
        </section>
      </div>
    </>
  );
}

{
  /* <Card
properties={a.fieldName}
quantity={a.fieldPackage}
value={a.fieldValue}
title={items[active]?.title}
/> */
}
