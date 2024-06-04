import React, { useState, useEffect } from "react";
import "../styles/ManageProducts.scss";
import { FaPencil, FaTrash, FaX } from "react-icons/fa6";
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
          setProducts(data2);
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
      setCategoryActiveId(items[index].id);
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

  return (
    <div className="ProductManageBody">
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
          <div className="cards-container">
            {products.map((produto) => (
              <div key={produto.id} className="product-card">
                <div className="icons-container">
                  <div className="icons-box">
                    <FaPencil onClick={() => openEditModal(produto)} />
                    <FaTrash onClick={() => openDeleteModal(produto)} />
                  </div>
                </div>
                <h3>{produto.nome}</h3>
                <ul className="lista">
                  {Object.entries(produto.informacoes).map(([chave, valor]) => (
                    <li key={chave} className={chave === "Preço" ? `preco` : null}>
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
              <FaX />
            </span>
            {selectedItem && (
              <>
                <h2>{selectedItem.nome}</h2>
                <div className="Modal">
                  <label htmlFor="nome">Nome:</label>
                  <input
                    type="text"
                    id="nome"
                    value={selectedItem.nome}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        nome: e.target.value,
                      })
                    }
                  />
                  <div className="EditionPreco">
                    {Object.entries(selectedItem.informacoes).map(([key, value]) => (
                      <div key={key} className={key === "Preço" ? `preco` : null}>
                        <label htmlFor={key}>{key}:</label>
                        <input
                          type="text"
                          id={key}
                          value={value}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              informacoes: {
                                ...selectedItem.informacoes,
                                [key]: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <button>
                    <IoSend />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal de Exclusão */}
      {deleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeDeleteModal}>
              <FaX />
            </span>
            {selectedItem && (
              <>
                <h2>Tem certeza que deseja <br /><span className="warning">EXCLUIR: </span><span className="warning-item">{selectedItem.nome}</span>?</h2>

                <button onClick={deleteItem} className="">
                  <FaTrash />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
