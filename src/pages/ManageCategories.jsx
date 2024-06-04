import React, { useState } from "react";
import "../styles/ManageCategories.scss";
import { FaPlus } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";

const styles = {
  table: {
    borderCollapse: "collapse",
    width: "100%",
    fontFamily: "Arial, sans-serif",
  },
  th: {
    backgroundColor: "#4CAF50",
    color: "white",
    textAlign: "left",
    padding: "12px",
  },
  td: {
    border: "1px solid #ddd",
    padding: "12px",
    color: "white",
  },
  trHover: {
    "&:hover": {
      backgroundColor: "#f1f1f1",
    },
  },
  thead: {
    borderBottom: "2px solid #4CAF50",
  },
  actionButton: {
    marginRight: "5px",
    padding: "5px 10px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

// Função para converter strings que contêm valores entre colchetes em arrays de strings
const parseBrackets = (str) => {
  const bracketPattern = /^\[(.+)\]$/; // Regex para detectar strings com colchetes
  const match = str.match(bracketPattern);

  if (match) {
    return match[1].split(",").map((item) => item.trim()); // Divide e remove espaços em branco
  }
  return str; // Se não houver colchetes, retorne a string original
};

const wordToRemove = "Opções";

export default function ManageCategories() {
  const [nome, setNome] = useState("");
  const [campos, setCampos] = useState([]);
  const [campoNome, setCampoNome] = useState("");
  const [tipoCampo, setTipoCampo] = useState("");
  const [listaItens, setListaItens] = useState([]);
  const [itemLista, setItemLista] = useState("");

  const adicionarItem = () => {
    if (itemLista) {
      setListaItens([...listaItens, itemLista]);
      setItemLista("");
    }
  };

  const adicionarCampo = () => {
    if (campoNome) {
      let tipo = tipoCampo;
      if (tipoCampo === "Opções" && listaItens.length > 0) {
        tipo += ` [${listaItens.join(", ")}]`;
      }
      setCampos([...campos, { campo: campoNome, tipo }]);
      setCampoNome("");
      setTipoCampo("");
      setListaItens([]);
    }
  };

  const handleDelete = (index) => {
    const newCampos = campos.filter((_, i) => i !== index);
    setCampos(newCampos);
  };

  const handleEdit = (index) => {
    const newCampo = prompt("Novo valor para campo:", campos[index].campo);
    const newTipo = prompt("Novo valor para tipo:", campos[index].tipo);
    if (newCampo & newTipo) {
      const newCampos = [...campos];
      newCampos[index] = { campo: newCampo, tipo: newTipo };
      setCampos(newCampos);
    }
  };

  const handleEnviar = async () => {
    const caracteristicas = campos.reduce((acc, item) => {
      const cleanTipo = item.tipo
        .replace(new RegExp(`\\b${wordToRemove}\\b`, "gi"), "")
        .trim();
      acc[item.campo] = cleanTipo;
      return acc;
    }, {});

    const parsedCaracteristicas = {};
    for (const key in caracteristicas) {
      parsedCaracteristicas[key] = parseBrackets(caracteristicas[key]);
    }

    const resultado = {
      nome: nome,
      caracteristicas: parsedCaracteristicas,
    };

    console.log("Enviando para API:", resultado);

    try {
      const response = await fetch("http://localhost:3000/tipo-produto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultado),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar para a API");
      }

      console.log("Enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar:", error.message);
    }
  };

  return (
    <div>
      <form className="categories-create-form">
        <div className="categories-create-container">
          <div>
            <label>Categoria:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div>
            <label>Característica:</label>
            <input
              type="text"
              value={campoNome}
              onChange={(e) => setCampoNome(e.target.value)}
            />
          </div>
          <div>
            <label>Tipo:</label>
            <select
              value={tipoCampo}
              onChange={(e) => setTipoCampo(e.target.value)}
            >
              <option value="Texto">Texto</option>
              <option value="Moeda (R$)">Moeda (R$)</option>
              <option value="Medida (m ou cm)">Medida (m ou cm)</option>
              <option value="Opções">Opções</option>
            </select>
          </div>
          <button type="button" onClick={adicionarCampo}>
            <FaPlus />
          </button>
        </div>

        {tipoCampo === "Opções" && (
          <div className="categories-list-field">
            <label>Adicionar opções:</label>
            <input
              type="text"
              value={itemLista}
              onChange={(e) => setItemLista(e.target.value)}
            />
            <button type="button" onClick={adicionarItem}>
              <GiConfirmed />
            </button>
            <ul>
              {listaItens.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </form>

      <table className="table-create">
        <thead>
          <tr className="table-titles-container">
            <th>Característica</th>
            <th>Tipo</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {campos.map((item, index) => (
            <tr key={index}>
              <td>{item.campo}</td>
              <td>{item.tipo}</td>
              <td>
                <button
                  style={styles.actionButton}
                  onClick={() => handleEdit(index)}
                >
                  Editar
                </button>
                <button
                  style={styles.actionButton}
                  onClick={() => handleDelete(index)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="save-button-container">
        <button onClick={handleEnviar} className="save-button">Enviar</button>
      </div>
    </div>
  );
}

