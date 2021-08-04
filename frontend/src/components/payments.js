import React, { useState, useEffect } from "react"
import PaymentsDataService from "../services/payment.service"
import MembersDataService from "../services/member.service"
import { Link, useRouteMatch } from "react-router-dom"
import { VictoryPie, VictoryLabel } from "victory"
import ModalContainer from "./modal-example"

export default function Payments(props) {
  const [payments, setPayments] = useState([]);
  const [members, setMembers] = useState([]);
  const [countActive, setCountActive] = useState(0);
  const [countInactive, setCountInactive] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let match = useRouteMatch();

  useEffect(() => {
    retrieveMembers();
  }, []);

  useEffect(() => {
    let countActive = 0;
    let countInactive = 0;
    let activePatmentsList = [];

    members.forEach(element => {
      if (element.active) {
        activePatmentsList.push(element.activePayment);
        countActive++;
      } else {
        countInactive++;
      }
    });

    setPayments(activePatmentsList)
    setCountActive(countActive)
    setCountInactive(countInactive)

  }, [members]);

  const retrieveMembers = () => {
    MembersDataService.getAll()
      .then(response => {
        setMembers(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const [selectedPaymentId, setSelectedPaymentId] = React.useState();

  function deletePayment(e) {
    e.preventDefault();
    PaymentsDataService.delete(selectedPaymentId)
      .then(response => {
        retrieveMembers();
      })
      .catch(e => {
        console.log(e);
      });
    closeModal();
  };

  function openModal(id) {
    setSelectedPaymentId(id)
    setModalIsOpen(true)
  }

  function closeModal() {
    setSelectedPaymentId(null)
    setModalIsOpen(false);
  }

  function DeleteModal() {
    return (
      <ModalContainer modalIsOpen={modalIsOpen} onClose={closeModal} onAction={deletePayment} title="Eliminar Abono" actionLabel="Eliminar"></ModalContainer>
    );
  }

  class CircleCounter extends React.Component {
    render() {
      return (
        <div className="row" style={{ textAlign: "center" }}>
          <div className="col">
            <label>Socios Activos</label>
            <svg viewBox="0 0 800 200">
              <VictoryPie
                colorScale={["#8BC34A"]}
                standalone={false}
                width={800} height={200}
                innerRadius={75} labelRadius={100} radius={80}
                style={{ labels: { fontSize: 0, fill: "white" } }}
              />
              <VictoryLabel
                textAnchor="middle"
                style={{ fontSize: 30 }}
                x={400} y={100}
                text={countActive}
              />
            </svg>
          </div>
          <div className="col">
            <label>Socios Inactivos</label>
            <svg viewBox="0 0 800 200">
              <VictoryPie
                colorScale={["tomato"]}
                standalone={false}
                width={800} height={200}
                innerRadius={75} labelRadius={100} radius={80}
                style={{ labels: { fontSize: 0, fill: "white" } }}
              />
              <VictoryLabel
                textAnchor="middle"
                style={{ fontSize: 30 }}
                x={400} y={100}
                text={countInactive}
              />
            </svg>
          </div>
        </div>
      );
    }
  }

  return (
    <div id="main">
      <div className="row">
        <div className="col-lg-12 pb-4" style={{ textAlign: "right" }}>
          <Link to={{
            pathname: match.url + "/crear",
            state: {
              memberList: members
            }
          }} className="btn btn-primary col-lg-4">
            Alta Abono
          </Link>
        </div>
      </div>
      <CircleCounter />
      <br />
      <h2>Registro de Pagos</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Id Socio</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((paymentItem, memberId) => {
              return (
                <tr key={paymentItem.memberId}>
                  <td>{paymentItem.memberId}</td>
                  <td>{paymentItem.memberEmail}</td>
                  <td>{paymentItem.type}</td>
                  <td>$ {paymentItem.price}</td>
                  <td>{new Date(paymentItem.start).toLocaleDateString()}</td>
                  <td>{new Date(paymentItem.end).toLocaleDateString()}</td>
                  <td>
                    <button onClick={(e) => openModal(paymentItem._id, e)} className="btn btn-danger">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <DeleteModal />
      </div>
    </div>
  );
}