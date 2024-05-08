
import React, { useState } from 'react';

const tipo_produtos = [
  {
    id: 1,
    caracteristicas: {
      cor: ['Branca', 'Preta', 'Colorida'],
      nome: 'Camisa',
      preco: 'Float',
      tecido: ['Poliéster', 'Algodão', 'Dryfit', 'Polo'],
      tamanho: ['P', 'M', 'G', 'GG', 'xGG'],
    },
  },
  {
    id: 2,
    caracteristicas: {
      nome: 'Folheto',
      preco: 'Float',
      altura: 'Int',
      largura: 'Int',
      quantidade: [100, 200, 300, 400, 500, 1000, 1500, 2000, 2500, 5000],
      especificacao: ['Somente Frente', 'Frente e Verso'],
    },
  },
  {
    id: 3,
    caracteristicas: {
      nome: 'Lona',
      tipo: 'String',
      preco: 'Float',
      altura: 1,
      largura: 1,
    },
  },
  {
    id: 4,
    caracteristicas: {
      nome: 'Adeviso',
      preco: 'Float',
      altura: 1,
      largura: 1,
      recortado: 'Boolean',
    },
  },
];

export default function RegisterProducts() {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleItemClick = (id) => {
    setSelectedProductId(id); 
  };

  const getFormFields = (caracteristicas) => {
    return Object.entries(caracteristicas).map(([key, value]) => {
      if (key === 'nome') {
        return null;
      }

      if (Array.isArray(value)) {
        return (
          <div key={key}>
            <label>{key}:</label>
            <select>
              {value.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        );
      }

      if (typeof value === 'number') {
        return (
          <div key={key}>
            <label>{key}:</label>
            <input type="number" step={key === 'Float' ? '0.01' : '1'} defaultValue={value} />
          </div>
        );
      }

      switch (value) {
        case 'Float':
          return (
            <div key={key}>
              <label>{key}:</label>
              <input type="number" step="0.01" />
            </div>
          );
        case 'Int':
          return (
            <div key={key}>
              <label>{key}:</label>
              <input type="number" step="1" />
            </div>
          );
        case 'Boolean':
          return (
            <div key={key}>
              <label>{key}:</label>
              <input type="checkbox" />
            </div>
          );
        default:
          return (
            <div key={key}>
              <label>{key}:</label>
              <input type="text" />
            </div>
          );
      }
    });
  };

  const selectedProduct = tipo_produtos.find(
    (produto) => produto.id === selectedProductId
  );

  return (
    <div>
      <ul>
        {tipo_produtos.map((produto) => (
          <li
            key={produto.id}
            style={{ color: 'white' }}
            onClick={() => handleItemClick(produto.id)} 
          >
            {produto.caracteristicas.nome}
          </li>
        ))}
      </ul>
      {selectedProductId && (
        <div style={{
            display: 'grid',
            placeItems: 'center',
            height: '100vh'
        }}>
            <form style={{
                color : "white",
                display : "flex",
                flexDirection : "column",
                padding : "10px 10px 10px 10px",
                width : "500px"
            }}>{getFormFields(selectedProduct.caracteristicas)}
            <button
              type="submit"
            >
              Enviar
            </button>
            </form>
        </div>
      )}
    </div>
  );
}
