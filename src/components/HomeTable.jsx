import React, { useState } from "react";
import "../styles/HomeTable.scss";
import {
  GrFormDown,
  GrFormUp,
} from "react-icons/gr";

export default function HomeTable() {
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const ficInformations = [
    {
      title: "Venda1",
      cliente: "Fulano",
      mes: "Maio",
      data: "25/05/2024",
      status: "Finalizado",
    },
    {
      title: "Venda2",
      cliente: "Ciclano",
      mes: "Março",
      data: "15/04/2024",
      status: "Finalizado",
    },
    {
      title: "Venda3",
      cliente: "Beltrano",
      mes: "Maio",
      data: "10/06/2024",
      status: "Pendente",
    },
    {
      title: "Venda4",
      cliente: "Maria",
      mes: "Janeiro",
      data: "20/02/2024",
      status: "Finalizado",
    },
    {
      title: "Venda5",
      cliente: "João",
      mes: "Fevereiro",
      data: "05/03/2024",
      status: "Finalizado",
    },
    {
      title: "Venda6",
      cliente: "Ana",
      mes: "Abril",
      data: "22/05/2024",
      status: "Pendente",
    },
    {
      title: "Venda7",
      cliente: "Pedro",
      mes: "Março",
      data: "12/04/2024",
      status: "Finalizado",
    },
    {
      title: "Venda8",
      cliente: "Mariana",
      mes: "Fevereiro",
      data: "18/03/2024",
      status: "Finalizado",
    },
    {
      title: "Venda9",
      cliente: "Roberto",
      mes: "Janeiro",
      data: "08/02/2024",
      status: "Finalizado",
    },
    {
      title: "Venda10",
      cliente: "Carla",
      mes: "Maio",
      data: "30/06/2024",
      status: "Pendente",
    },
    {
      title: "Venda11",
      cliente: "Ricardo",
      mes: "Abril",
      data: "18/05/2024",
      status: "Finalizado",
    },
    {
      title: "Venda12",
      cliente: "Camila",
      mes: "Março",
      data: "08/04/2024",
      status: "Finalizado",
    },
    {
      title: "Venda13",
      cliente: "Lucas",
      mes: "Fevereiro",
      data: "25/03/2024",
      status: "Pendente",
    },
    {
      title: "Venda14",
      cliente: "Patrícia",
      mes: "Maio",
      data: "15/06/2024",
      status: "Finalizado",
    },
    {
      title: "Venda15",
      cliente: "Diego",
      mes: "Janeiro",
      data: "05/02/2024",
      status: "Finalizado",
    },
    {
      title: "Venda16",
      cliente: "Isabela",
      mes: "Fevereiro",
      data: "20/03/2024",
      status: "Pendente",
    },
    {
      title: "Venda17",
      cliente: "Gustavo",
      mes: "Abril",
      data: "10/05/2024",
      status: "Finalizado",
    },
    {
      title: "Venda18",
      cliente: "Fernanda",
      mes: "Março",
      data: "30/04/2024",
      status: "Finalizado",
    },
    {
      title: "Venda19",
      cliente: "Carlos",
      mes: "Janeiro",
      data: "15/02/2024",
      status: "Pendente",
    },
    {
      title: "Venda20",
      cliente: "Vanessa",
      mes: "Maio",
      data: "25/06/2024",
      status: "Pendente",
    },
    {
      title: "Venda22",
      cliente: "Brayan",
      mes: "Maio",
      data: "25/06/2024",
      status: "Pendente",
    },
  ];

  return (
    <div className="ContainerButtonsTable">
      <div className="buttonsPrevNext">
        {page > 0 ? (
          <button onClick={() => setPage(page - 1)}>
            <GrFormUp />
          </button>
        ) : null}
        {endIndex < ficInformations.length ? (
          <button onClick={() => setPage(page + 1)}>
            <GrFormDown />
          </button>
        ) : null}
      </div>
      {console.log(ficInformations)}
      <div className="HomeTableContainer">
        <ul className="HeaderInformations">
          <li>Últimas Vendas</li>
          <li>Cliente</li>
          <li>Data</li>
          <li className="list">
            <select name="mes" id="cars">
              <option value="*">Mês</option>
              {[...new Set(ficInformations.map((obj) => obj.mes))]?.map((i) => (
                <option value={i}>{i}</option>
              ))}
              {/* <option value="janeiro">Janeiro</option>
              <option value="fevereiro">Fevereiro</option>
              <option value="marco">Março</option>
              <option value="abril">Abril</option>
              <option value="maio">Maio</option>
              <option value="junho">Junho</option>
              <option value="julho">Julho</option>
              <option value="agosto">Agosto</option>
              <option value="setembro">Setembro</option>
              <option value="outubro">Outubro</option>
              <option value="novembro">Novembro</option>
              <option value="dezembro">Dezembro</option> */}
            </select>
          </li>
          <li className="list">
            <select name="status" id="cars">
              <option value="volvo">Status</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </li>
        </ul>
        {ficInformations.slice(startIndex, endIndex).map((a, index) => (
          <ul className="SalesInformationHome">
            <li>{a.title}</li>
            <li>{a.cliente}</li>
            <li>{a.data}</li>
            <li>{a.mes}</li>
            <li>{a.status}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}
