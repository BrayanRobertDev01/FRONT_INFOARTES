import React from "react";
import "../styles/Card.scss";
import { RiPencilFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";

export default function CardCamisa({ properties, value, image }) {
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
        <label>Valor: R${value},00</label>
      </div>
    </div>
  );
}