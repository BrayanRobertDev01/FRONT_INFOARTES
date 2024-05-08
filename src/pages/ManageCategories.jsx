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

const wordToRemove = "Lista";

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
      if (tipoCampo === "Lista" && listaItens.length > 0) {
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
    if (newCampo && newTipo) {
      const newCampos = [...campos];
      newCampos[index] = { campo: newCampo, tipo: newTipo };
      setCampos(newCampos);
    }
  };

  const handleEnviar = () => {
    const caracteristicas = campos.reduce((acc, item) => {
      const cleanTipo = item.tipo
        .replace(new RegExp(`\\b${wordToRemove}\\b`, "gi"), "")
        .trim();
      acc[item.campo] = cleanTipo;
      return acc;
    }, {});

    const resultado = {
      nome: nome, // Adiciona o valor do campo "Nome" ao JSON
      caracteristicas: caracteristicas,
    };

    console.log(JSON.stringify(resultado, null, 2)); // Pretty print do JSON
  };

  return (
    <div>
      <form className="categories-create-form">
        <div className="categories-create-container">
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div>
            <label>Campo:</label>
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
              <option value="">Selecione um tipo</option>
              <option value="Texto">Texto</option>
              <option value="Número Inteiro">Número Inteiro</option>
              <option value="Número Decimal">Número Decimal</option>
              <option value="Lista">Lista</option>
              <option value="Booleano">Booleano</option>
            </select>
          </div>
          <button type="button" onClick={adicionarCampo}>
            <FaPlus />
          </button>
        </div>

        {tipoCampo === "Lista" && (
          <div className={tipoCampo === "Lista" && "categories-list-field"}>
            <label>Adicionar item à lista:</label>
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
            <th>Campo</th>
            <th>Tipo</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {campos.map((item, index) => {
            const cleanTipo = item.tipo
              .replace(new RegExp(`\\b${wordToRemove}\\b`, "gi"), "")
              .trim();

            return (
              <tr key={index} style={styles.trHover}>
                <td>{item.campo}</td>
                <td>{cleanTipo}</td>
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
            );
          })}
        </tbody>
      </table>
    <div className="save-button-container">
      <button onClick={handleEnviar} className="save-button">Enviar</button>
    </div>
    </div>
  );
}
