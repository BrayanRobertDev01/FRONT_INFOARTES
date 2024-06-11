import React, { useEffect, useState } from 'react';
import "../styles/styleEstampa.scss";

const ModalEstampa = ({ product, setCloseModal }) => {
  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState([]);

  const getKeysAndValues = () => {
    setKeys(Object.keys(product.informacoes))
    setValues(Object.values(product.informacoes))
  }

  useEffect(() => {
    getKeysAndValues()
  }, [])

  return (
    <div className='mainModalStyleEstampa'>
      <div className='modalSave' >
        <div className='sectionCloseButton'>
          <button onClick={() => setCloseModal([])} className='closeButton'>X</button>
        </div>
        <h1 style={{ fontSize: 25 }}>Produto: {product.nome}</h1>
        <section className='mainSectionInputs'>
          {keys.map((keyInfo, i) => (
            <div className='organizationItems'>
              <div className='sectionItemInput'>
                <label style={{ fontSize: 20 }}>{keyInfo}</label>
                <input className='inputStyleModal' type='text' value={values[i]} disabled />
              </div>
            </div>
          ))}
          <div className='organizationItems'>
            <div className='sectionItemInput'>
              <label style={{ fontSize: 20 }}>Estampa</label>
              <input className='inputStyleModal' type='text' placeholder='Digite o nome do cliente' />
            </div>
          </div>
          {/* <div className='organizationItems'>
            <div className='sectionItemInput'>
              <label style={{ fontSize: 20 }}>Quantidade</label>
              <input className='inputStyleModal' type='text' placeholder='Digite o nome do cliente' />
            </div>
          </div> */}
        </section>
        <div className='sectionSaveButton'>
          <button onClick={() => {
            console.log('keys', keys)
            console.log('values', values)
          }} className='buttonSave'>Salvar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalEstampa;
