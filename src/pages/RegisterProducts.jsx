import React, { useEffect, useState } from 'react';
import "../styles/RegisterProducts.scss";

export default function RegisterProducts() {
  const [tipo_produtos, setTipoProdutos] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [formData, setFormData] = useState({});
  const [productName, setProductName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState(null);
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/tipo-produto');
        if (response.ok) {
          const data = await response.json();
          setTipoProdutos(data);
          setLoading(false);
        } else {
          console.error('Erro na resposta:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleItemClick = (id) => {
    setSelectedProductId(id);
    setFormData({});
    setProductName("");
    setSubmitStatus(null);
  };

  const handleInputChange = (key, value) => {
    if (key === "nome") {
      setProductName(value);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    }
  };

  const getFormFields = (caracteristicas) => {
    const fields = Object.entries(caracteristicas).map(([key, value]) => {
      let inputElement;

      if (Array.isArray(value)) {
        inputElement = (
          <select onChange={(e) => handleInputChange(key, e.target.value)} required>
            <option value="">Selecione uma opção</option>
            {value.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        );
      } else {
        switch (value) {
          case 'Moeda (R$)':
            inputElement = (
              <input
                type="number"
                step="0.01"
                min="1"
                onChange={(e) => handleInputChange(key, e.target.value)}
                required
              />
            );
            break;
          case 'Medida (m ou cm)':
            inputElement = (
              <input
                type="number"
                step="0.01"
                min="1"
                onChange={(e) => handleInputChange(key, e.target.value)}
                required
              />
            );
            break;
          case 'Int':
            inputElement = (
              <input
                type="number"
                step="1"
                onChange={(e) => handleInputChange(key, e.target.value)}
                required
              />
            );
            break;
          case 'Boolean':
            inputElement = (
              <input
                type="checkbox"
                onChange={(e) => handleInputChange(key, e.target.checked)}
                required
              />
            );
            break;
          default:
            inputElement = (
              <input
                type="text"
                onChange={(e) => handleInputChange(key, e.target.value)}
                required
              />
            );
            break;
        }
      }

      return (
        <div key={key}>
          <label>{key}:</label>
          {inputElement}
        </div>
      );
    });

    return fields;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const json = {
      id_tipo_produto: selectedProductId,
      nome: productName,
      informacoes: formData,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/produto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      });

      if (response.ok) {
        setSubmitStatus("Produto cadastrado com sucesso!");
      } else {
        setSubmitStatus(`Erro ao cadastrar produto: ${response.statusText}`);
      }
    } catch (error) {
      setSubmitStatus(`Erro ao cadastrar produto: ${error.message}`);
    }
  };

  const selectedProduct = tipo_produtos.find(
    (produto) => produto.id === selectedProductId
  );

  const [active, setActive] = useState(null);
  const handleActive = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  return (
    <div className='ProductRegisterBody'>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <><div className='list_categories'>
          <ul className='ItemsList'>
            {tipo_produtos.map((produto, index) => (
              <li
                key={produto.id}
                onClick={() => {
                  handleItemClick(produto.id);
                  handleActive(index);
              }}
              >
                {produto.nome}
              </li>
            ))}
          </ul>
          </div>
          {selectedProductId && selectedProduct && (
            <div className='FormRegisterProduct'>
              <form
                onSubmit={handleSubmit}
              >
                <div key="nome">
                  <h1>REGISTRAR PRODUTO</h1>
                  <label>Nome:</label>
                  <input
                    type="text"
                    placeholder="Digite o nome do produto"
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                  />
                </div>

                {getFormFields(selectedProduct.caracteristicas)}

                <button type="submit">REGISTRAR PRODUTO</button>
              </form>
              {submitStatus && <p>{submitStatus}</p>} {/* Exibe o status do envio */}
            </div>
          )}
        </>
      )}
    </div>
  );
}






