import React from 'react';
import "../styles/styleEstampa.scss";

const ModalEstampa = ({ product }) => {
  return (
    <div className='mainModalStyleEstampa'>
      <div className='modalSave' >
        <div className='sectionCloseButton'>
          <button className='closeButton'>X</button>
        </div>
        <h1 style={{ fontSize: 25 }}>Produto: {product}</h1>
        <section className='mainSectionInputs'>
          <div className='organizationItems'>
            <div className='sectionItemInput'>
              <label style={{ fontSize: 20 }}>Telefone</label>
              <input className='inputStyleModal' type='text' placeholder='Digite o nome do cliente' />
            </div>
          </div>
          <div className='organizationItems'>
            <div className='sectionItemInput'>
              <label style={{ fontSize: 20 }}>Telefone</label>
              <input className='inputStyleModal' type='text' placeholder='Digite o nome do cliente' />
            </div>
          </div>
          <div className='organizationItems'>
            <div className='sectionItemInput'>
              <label style={{ fontSize: 20 }}>Telefone</label>
              <input className='inputStyleModal' type='text' placeholder='Digite o nome do cliente' />
            </div>
          </div>
          <div className='organizationItems'>
            <div className='sectionItemInput'>
              <label style={{ fontSize: 20 }}>Estampa</label>
              <input className='inputStyleModal' type='text' placeholder='Digite o nome do cliente' />
            </div>
          </div>
        </section>
        <div className='sectionSaveButton'>
          <button className='buttonSave'>Salvar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalEstampa;
