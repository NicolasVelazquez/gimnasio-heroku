import React, { useState, useEffect } from "react";
import MembersDataService from "../services/member.service";
import PaymentsDataService from "../services/payment.service"
import PlanDataService from "../services/plan.service"
import UtilsService from "../services/utils.service"
import { Link } from "react-router-dom";

const AddPayment = props => {
  let memberList = []

  const [plans, setPlans] = useState([])
  const [plan, setPlan] = useState({ name: '', price: '' });
  const [endDate, setEndDate] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    retrievePlans()
    document.getElementById('info').hidden = true
  }, []);

  if (props.location.state && props.location.state.memberList) {
    memberList = props.location.state.memberList
  } else {
    MembersDataService.getAll()
      .then(response => {
        memberList = response.data;
      })
      .catch(e => {
        console.log(e);
      });
  }

  const retrievePlans = () => {
    PlanDataService.getAll()
      .then(response => {
        setPlans(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const selectPlan = (e) => {
    let arrValues = e.split(',')
    let planName = arrValues[0]
    let price = arrValues[1]

    if (e === "Eliga un plan") {
      document.getElementById('info').hidden = true
    } else {
      setPlan({
        name: planName,
        price: price
      });
      setEndDate(new Date(UtilsService.getDateFromSubscriptionType(planName)).toLocaleDateString())
      document.getElementById('info').hidden = false
    }
  }

  const savePayment = (e) => {
    e.preventDefault()

    if (!plan.name) {
      alert("Debe elegir un plan")
      return
    }
    var data = {
      email: document.getElementById('exampleDataList').value,
      subscriptionType: plan.name,
    };

    console.log(data)
    PaymentsDataService.createPayment(data)
      .then(response => {
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        alert(e.response.data);
      });
  };

  return (
    <div className="submit-form" >
      {submitted ? (
        <div style={{ textAlign: " -webkit-center" }} >
          <div className="col-lg-6 pb-1">
            <div className="card">
              <div className="card-body">
                <h4>¡Abono guardado con éxito!</h4>
                <Link to={"/abonos"} className="btn btn-success">
                  Atrás
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={savePayment}>
          <div className="card-body">
            <div className="form-group">
              <h2 htmlFor="description">Crear Abono</h2>
              <div className="form-group row">
                <div className="col-8">
                  <label className="form-label">Seleccione un socio</label>
                  <input className="form-control" list="datalistOptions" id="exampleDataList" required={true} placeholder="Escriba el email o nombre del socio..." />
                  <datalist id="datalistOptions">
                    {memberList.map((item) =>
                      <option key={item._id} value={item.email}>{item.lastName + ", " + item.name}</option>
                    )}
                  </datalist>
                </div>
                <div className="col-4">
                  <label>Plan</label>
                  <select className="custom-select" onChange={(e) => selectPlan(e.target.value)}>
                    <option selected>Eliga un plan</option>
                    {plans.map((item) =>
                      <option key={item.name} value={[item.name, item.price]}>{item.name + " ($" + item.price + ")"}</option>
                    )}
                  </select>
                </div>
              </div>
              <div id="info">
                <div className="form-group row">
                  <div className="col-12">
                    <div id="dateAlert" className="alert alert-primary" role="alert">
                      El abono será vigente desde el <strong>{new Date().toLocaleDateString()}</strong> hasta el <strong>{endDate}</strong>. <br />
                      Y tendrá un costo de <strong>${plan.price}</strong> en un sólo pago.
                    </div>
                  </div>
                </div>
                <h2 className="display-6 text-center mb-4">Compare planes</h2>
                <div className="table-responsive">
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th></th>
                        {plans.map((item) =>
                          <th key={item.name} value={item.name}>{item.name}</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row" className="text-start">Acceso a todas las sedes</th>
                        {plans.map((item) =>
                          <td key={item.name}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                          </svg></td>
                        )}
                      </tr>
                      <tr>
                        <th scope="row" className="text-start">Precio por día</th>
                        {plans.map((item) =>
                          <td key={item.name}>{item.price / item.days}</td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div></div>
            </div>
            <button type="submit" className="btn btn-success mx-1 mb-1">Guardar</button>
            <Link to={"/abonos"} className="btn btn-primary mx-1 mb-1">Atrás</Link>
          </div>
        </form>
      )}
    </div>

  );
};

export default AddPayment;