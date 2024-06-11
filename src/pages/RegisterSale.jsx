import React, { useEffect, useState } from 'react';
import '../styles/registerSaleStyle.scss'

// icons 
import { FaEye } from "react-icons/fa";
import { RiEyeCloseFill } from "react-icons/ri";
import { Switch } from '@mui/material';

// DatePicker 
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ModalEstampa from '../components/ModalEstampa';

const RegisterSale = () => {
  const [products, setProducts] = useState([]);
  const [closeEye, setCloseEye] = useState(false)
  const [productSelected, setProductSelect] = useState([])
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [signOpen, setSignOpen] = useState(false)

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChangeSelect = (e) => {
    const productId = e.target.value;
    const itemFinded = products.find(e => e.id == productId);
    setProductSelect(itemFinded)
  }

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
    <>
      {productSelected.length !== 0 && (
        <ModalEstampa />
      )}
      <div className='mainSection'>
        <div className='cardSectionMain'>
          <section className='sectionItemsInputs'>
            <section className='cardSection'>
              <div className='inputLabelStyle'>
                <label style={{ fontSize: 20 }}>Cliente</label>
                <input className='inputStyle' type='text' placeholder='Digite o nome do cliente' />
              </div>
            </section>

            <section className='cardSection'>
              <div className='inputLabelStyle'>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <label style={{ fontSize: 20 }}>Produtos</label>
                  {!closeEye ? <button className='iconStyle' onClick={() => setCloseEye(true)}><FaEye size={20} /></button> : <button className='iconStyle' onClick={() => setCloseEye(false)}><RiEyeCloseFill size={20} /></button>}
                </div>
                <select onChange={(e) => handleChangeSelect(e)} className='selectItems' style={{ fontSize: 18 }}>
                  <option selected>Selecione o produto</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>{product.nome}</option>
                  ))}
                </select>

                {/* <input className='inputStyle' type='text' placeholder='Digite o valor do sinal' /> */}
              </div>
            </section>
            <section className='cardSection'>
              <div className='inputLabelStyle'>
                <label style={{ fontSize: 20 }}>Telefone</label>
                <input className='inputStyle' type='text' placeholder='Digite o nome do cliente' />
              </div>
            </section>
            <section className='cardSection'>
              <div className='inputLabelStyle'>
                <label style={{ fontSize: 20 }}>Data da Compra</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      onChange={handleDateChange}
                      format='DD/MM/YYYY'
                      views={['day', 'month', 'year']}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </section>
            <section className='cardSection'>
              <div className='toggleStyle'>
                <label style={{ fontSize: 20 }}>Sinal</label>
                <div className='toggleButton'>
                  <span className='circleToggle'></span>
                  <Switch onClick={() => setSignOpen(!signOpen)} defaultChecked={false} required />
                </div>
              </div>
            </section>
            {signOpen && (
              <section className='cardSection'>
                <div className='inputLabelStyle'>
                  <label style={{ fontSize: 20 }}>Valor do Sinal</label>
                  <input className='inputStyle' type='text' placeholder='Digite o nome do cliente' />
                </div>
              </section>
            )}
          </section>
          <div className='divButtonBuy'>
            <button className='registerBuyButton'>Registrar compra</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterSale;
