import React, { useState } from "react";
import "../styles/ProductRegister.scss";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

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
          fieldName: "Tamanho P",
          fieldtec: "Algodão",
          fieldColor: "Preto",
          fieldValue: 40,
        },
        // Outros itens omitidos para brevidade...
      ],
      descricoes: "Descrições para Camisas",
    },
  ];

  const [active, setActive] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleActive = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };
  const openEditModal = (property) => {
    setSelectedItem(property);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedItem(null);
  };

  const openDeleteModal = (property) => {
    setSelectedItem(property);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedItem(null);
  };

  const deleteItem = () => {
    // Implemente a lógica para excluir o item aqui
    console.log("Item excluído:", selectedItem);
    closeDeleteModal();
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
          {items.map((item, index) => (
            <li
              key={index}
              className={active === index ? "active" : ""}
              onClick={() => handleActive(index)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="ItemsPropertiesContainer">
        {active !== null && (
          <div>
            <ul className="ItemsPropertiesList">
              {items[active].properties.map((property, index) => (
                <div className="divider" key={index}>
                  <li className="ItemsPropertie">
                    {property.fieldName}:{" "}
                    {formatoMoedaBrasileira(property.fieldValue)}
                  </li>
                  <div className="PropertiesIconsContainer">
                    <FaTrash
                      className="trash"
                      onClick={() => openDeleteModal(property)}
                    />
                    <FaPencil
                      className="pencil"
                      onClick={() => openEditModal(property)}
                    />
                  </div>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Modal de Edição */}
      {editModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeEditModal}>
              &times;
            </span>
            {/* Conteúdo do modal de edição */}
            <h2>Edição</h2>
            <label htmlFor="fieldName">{selectedItem.fieldName}: </label>
            <input
              type="text"
              id="fieldName"
              value={selectedItem.fieldName}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  fieldName: e.target.value,
                })
              }
            />
            <label htmlFor="fieldValue">{selectedItem.fieldValue}</label>
            <input
              type="text"
              id="fieldValue"
              value={selectedItem.fieldValue}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  fieldValue: e.target.value,
                })
              }
            />
            <button>
              <IoSend />
            </button>
          </div>
        </div>
      )}

      {/* Modal de Exclusão */}
      {deleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeDeleteModal}>
              &times;
            </span>
            {/* Conteúdo do modal de exclusão */}
            <h2>Exclusão</h2>
            <p>{selectedItem.fieldName}</p>
            <p>{formatoMoedaBrasileira(selectedItem.fieldValue)}</p>
            <button onClick={deleteItem}>
              <FaTrash />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
