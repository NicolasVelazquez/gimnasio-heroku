import React, { useState, useEffect } from "react";
import ClassDataService from "../services/class.service";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form'

const AddClass = props => {
  // let initialClassState = ""
  // let editing = false
  // let scheduleDays = []
  // let scheduleHours = []
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
  const [submitted, setSubmitted] = useState(false)
  const [editing, setEditing] = useState(false)
  const [initialClassState, setInitialClassState] = useState("")
  const [name, setName] = useState(initialClassState.name)
  const [scheduleDays, setScheduleDays] = useState(initialClassState.scheduleDays)
  const [scheduleHours, setScheduleHours] = useState(initialClassState.scheduleHours)

  useEffect(() => {
    if (props.location.state && props.location.state.currentClass) {
      setEditing(true)
      setInitialClassState(props.location.state.currentClass)
    }
  }, [props.location.state])

  useEffect(() => {
    if (initialClassState) {

      setName(initialClassState.name)
      setScheduleDays(initialClassState.scheduleDays)
      setScheduleHours(initialClassState.scheduleHours)

      initialClassState.scheduleDays.forEach(item => {
        let elementId = `checkbox-${item}-id`
        let element = document.getElementById(elementId)
        if (element) {
          element.checked = true
        }
      });
      initialClassState.scheduleHours.forEach(item => {
        let elementId = `checkbox-${item}-id`
        let element = document.getElementById(elementId)
        if (element) {
          element.checked = true
        }
      });
    }
  }, [props.location.state, initialClassState]);

  const setDays = (day) => {
    if (day.checked) {
      scheduleDays.push(day.name)
    } else {
      setScheduleDays(scheduleDays.filter(item => item !== day.name))
    }
    console.log(scheduleDays)
  }

  const setHours = (hour) => {
    if (hour.checked) {
      scheduleHours.push(hour.name)
    } else {
      setScheduleHours(scheduleHours.filter(item => item !== hour.name))
    }
    console.log(scheduleHours)
  }

  function compareDays(a, b) { return days.indexOf(a) - days.indexOf(b); }
  function compareHours(a, b) { return hours.indexOf(a) - hours.indexOf(b); }

  const saveClass = (e) => {
    e.preventDefault()

    if (scheduleDays.length < 1 || scheduleHours.length < 1) {
      alert("Debe seleccionar al menos un día y un horario.")
    } else {
      scheduleDays.sort(compareDays);
      scheduleHours.sort(compareHours);

      var data = {
        name: name,
        scheduleDays: scheduleDays,
        scheduleHours: scheduleHours
      }

      if (editing) {
        console.log(initialClassState)
        data._id = initialClassState._id
        ClassDataService.updateClass(initialClassState._id, data)
          .then(response => {
            setSubmitted(true);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        ClassDataService.createClass(data)
          .then(response => {
            setSubmitted(true);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  };

  return (
    <div className="submit-form" >
      {submitted ? (
        <div style={{ textAlign: " -webkit-center" }} >
          <div className="col-lg-4 pb-1">
            <div className="card">
              <div className="card-body">
                <h4>¡Clase guardada con éxito!</h4>
                <Link to={"/clases"} className="btn btn-success">
                  Atrás
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={saveClass}>
          <div className="card-body">
            <div className="form-group">
              <h2 htmlFor="description">{editing ? "Editar" : "Crear"} Clase</h2>
              <div className="form-group">
                <label for="inputEmail4">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Nombre'
                />
              </div>
              <label>Días</label>
              <div className="mb-3">
                {days.map((day) => (
                  <Form.Check
                    inline
                    label={day}
                    name={day}
                    type="checkbox"
                    id={`checkbox-${day}-id`}
                    onChange={(e) => setDays(e.target)}
                  />
                ))}
              </div>
              <label>Horarios</label>
              <div className="mb-3">
                {hours.map((hour) => (
                  <Form.Check
                    inline
                    label={hour}
                    name={hour}
                    type="checkbox"
                    id={`checkbox-${hour}-id`}
                    onChange={(e) => setHours(e.target)}
                  />
                ))}
              </div>
            </div>
            <button type="submit" className="btn btn-success mx-1 mb-1">Guardar</button>
            <Link to={"/clases"} className="btn btn-primary mx-1 mb-1">Atrás</Link>
          </div>
        </form>
      )}
    </div>

  );
};

export default AddClass;