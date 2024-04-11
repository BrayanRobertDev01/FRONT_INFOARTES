import React from "react";
import "../styles/HomeTable.scss";

export default function HomeTable() {
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
      ];
      
  return (
    <div className="HomeTableContainer">
      <ul>
        <li>Últimas Vendas</li>
        <li>Cliente</li>
        <li>Mês</li>
        <li>Data</li>
        <li>Status</li>
      </ul>
      {ficInformations.map((a, index) => (
        <ul className="SalesInformationHome">
          <li>{a.title}</li>
          <li>{a.cliente}</li>
          <li>{a.mes}</li>
          <li>{a.data}</li>
          <li>{a.status}</li>
        </ul>
      ))}
    </div>
  );
}
