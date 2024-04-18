import React from "react";
import "../styles/Card.scss";
import { RiPencilFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";

export default function Card({ properties, quantity, value, cor}) {
  return (
    <div className="cardcontainer">
      <div className="headcards">
        <div className="headicons">
        <RiPencilFill />
        <FaTrash />
        </div>
        <h1>{properties}</h1>
      </div>
      <div className="bodycards">
        {quantity ? (<label>Quantidade: {quantity}</label>) : null}
        {cor ? (<label>Cor: {cor}</label>) : null}
        <label>Valor: R${value},00</label>
      </div>
    </div>
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
