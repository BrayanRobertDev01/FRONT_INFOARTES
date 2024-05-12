import React, { useState, useEffect } from "react";
import "../styles/ProductRegister.scss";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

export default function ManageProducts() {
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [categoryActiveId, setCategoryActiveId] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/tipo-produto", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }

        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const ItemsCategoryActive = async () => {
      try {
        if (categoryActiveId !== null) {
          const response = await fetch(`http://127.0.0.1:5000/produto/categoria/${categoryActiveId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Erro ao buscar os dados");
          }

          const data2 = await response.json();
          setProducts(data2)
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    ItemsCategoryActive();
  }, [categoryActiveId]);

  const handleActive = (index) => {
    if (active === index) {
      setActive(null);
      setCategoryActiveId(null);
    } else {
      setActive(index);
      setCategoryActiveId(items[index].id)
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
              {item.nome}
            </li>
          ))}
        </ul>
      </div>
      <div className="ItemsPropertiesContainer">
        {active !== null && (
          <div style={{color: "white"}}>
          {products.map((produto) => (
            <div key={produto.id} className="products">
              <h3>{produto.nome}</h3>
              <ul>
                {Object.entries(produto.informacoes).map(([chave, valor]) => (
                  <li key={chave}>
                    <strong>{chave}:</strong> {valor}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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


