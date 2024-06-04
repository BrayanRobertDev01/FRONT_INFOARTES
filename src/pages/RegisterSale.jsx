import React, { useEffect, useState } from 'react';
import '../styles/registerSaleStyle.scss'

const RegisterSale = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/produto');
        if (response.ok) {
          const data = await response.json();

          setProducts(data)
        } else {
          console.error('Erro na resposta:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='mainSection'>
      <div className='cardSectionMain'>
        <section className='cardSection'>
          <div className='inputLabelStyle'>
            <label style={{ fontSize: 20 }}>Cliente</label>
            <input className='inputStyle' type='text' placeholder='Digite o nome do cliente' />
          </div>
        </section>
        <section className='cardSection'>
          <div className='inputLabelStyle'>
            <label style={{ fontSize: 20 }}>Telefone</label>
            <input className='inputStyle' type='text' placeholder='Digite o número do cliente' />
          </div>
        </section>
        <section className='cardSection'>
          <div className='inputLabelStyle'>
            <label style={{ fontSize: 20 }}>Valor do sinal</label>
            <input className='inputStyle' type='text' placeholder='Digite o nome do cliente' />
          </div>
        </section>
        <section className='cardSection'>
          <div className='inputLabelStyle'>
            <label style={{ fontSize: 20 }}>Produtos</label>
            <select style={{ fontSize: 18 }}>
              <option selected>Selecione o produto</option>
              {products.map((product) => (
                <option>{product.nome}</option>
              ))}
            </select>

            {/* <input className='inputStyle' type='text' placeholder='Digite o valor do sinal' /> */}
          </div>
        </section>
        <section className='cardSection'>
          <div className='inputLabelStyle'>
            <label style={{ fontSize: 20 }}>Cliente</label>
            <input className='inputStyle' type='text' placeholder='Digite o nome do cliente' />
          </div>
        </section>
        <section className='cardSection'>
          <div className='inputLabelStyle'>
            <label style={{ fontSize: 20 }}>Cliente</label>
            <input className='inputStyle' type='text' placeholder='Digite o nome do cliente' />
          </div>
        </section>
      </div>
    </div>
  );
}

export default RegisterSale;
