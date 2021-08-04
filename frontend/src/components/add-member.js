import React, { useState } from "react";
import MembersDataService from "../services/member.service";
import { Link } from "react-router-dom";

const AddMember = props => {
  let initialMemberState = ""
  let editing = false;

  if (props.location.state && props.location.state.currentMember) {
    editing = true;
    initialMemberState = props.location.state.currentMember
  }

  const [member] = useState(initialMemberState);
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState(initialMemberState.name)
  const [lastName, setLastName] = useState(initialMemberState.lastName)
  const [birthday, setBirthday] = useState(initialMemberState.birthday)
  const [email, setEmail] = useState(initialMemberState.email)
  const [genre, setGenre] = useState(initialMemberState.genre)
  const [phonenumber, setPhonenumber] = useState(initialMemberState.phonenumber)

  const saveMember = (e) => {
    e.preventDefault()

    var data = {
      name: name,
      lastName: lastName,
      birthday: birthday,
      email: email,
      genre: genre,
      phonenumber: phonenumber
    };

    if (editing) {
      console.log(initialMemberState)
      data._id = props.location.state.currentMember._id
      MembersDataService.updateMember(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      MembersDataService.createMember(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  return (
    <div className="submit-form" >
      {submitted ? (
        <div style={{ textAlign: " -webkit-center" }} >
          <div className="col-lg-4 pb-1">
            <div className="card">
              <div className="card-body">
                <h4>¡Socio guardado con éxito!</h4>
                <Link to={"/socios"} className="btn btn-success">
                  Atrás
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={saveMember}>
          <div className="card-body">
            <div className="form-group">
              <h2 htmlFor="description">{editing ? "Editar" : "Crear"} Socio</h2>
              <div class="form-group">
                <label for="inputEmail4">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  defaultValue={member.name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Nombre'
                  maxlength="20"
                />
              </div>
              <div class="form-group">
                <label>Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  defaultValue={member.lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder='Apellido'
                  maxlength="20"
                />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  defaultValue={member.email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email'
                  maxlength="20"
                />
              </div>
              <div class="form-group">
                <label>Fecha de Nacimiento</label>
                <input
                  type="date"
                  className="form-control"
                  required="true"
                  defaultValue={member.birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  placeholder='Fecha de Nacimiento'
                />
              </div>
              <div class="form-group">
                <label>Género</label>
                <select class="custom-select" defaultValue={member.genre} onChange={(e) => setGenre(e.target.value)}>
                  <option selected>Género</option>
                  <option value="No Informado">Prefiero no decirlo</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Masculino">Masculino</option>
                </select>
              </div>
              <div class="form-group">
                <label>Número de Teléfono</label>
                <input
                  type="tel"
                  className="form-control"
                  defaultValue={member.phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                  placeholder='Teléfono'
                  maxlength="15"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success mx-1 mb-1">Guardar</button>
            <Link to={"/socios"} className="btn btn-primary mx-1 mb-1">Atrás</Link>
          </div>
        </form>
      )}
    </div>

  );
};

export default AddMember;