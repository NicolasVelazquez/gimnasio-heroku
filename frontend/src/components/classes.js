import React, { useState, useEffect } from "react"
import { Link, useRouteMatch } from "react-router-dom"
import ClassesDataService from "../services/class.service"
import MembersDataService from "../services/member.service"

import ModalContainer from "./modal-example"
import ModalDataList from "./modal-datalist"

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

// import Card from 'react-bootstrap/Card';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

export default function Classes(props) {
  const [classes, setClasses] = useState([]);
  const [members, setMembers] = useState([]);
  let match = useRouteMatch();

  useEffect(() => {
    retrieveMembers();
    retrieveClasses();
  }, []);

  const retrieveMembers = () => {
    MembersDataService.getAll()
      .then(response => {
        setMembers(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveClasses = () => {
    ClassesDataService.getAll()
      .then(response => {
        setClasses(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // DELETE MODAL
  const [selectedClassId, setSelectedClassId] = React.useState();
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  function deleteClass(e) {
    e.preventDefault();
    ClassesDataService.deleteClass(selectedClassId)
      .then(response => {
        retrieveClasses();
      })
      .catch(e => {
        console.log(e);
      });
    closeDeleteModal();
  };

  function openDeleteModal(id) {
    setSelectedClassId(id)
    setDeleteModalIsOpen(true)
  }

  function closeDeleteModal() {
    setSelectedClassId(null)
    setDeleteModalIsOpen(false);
  }

  //ENROLL MODAL
  const [selectedClassName, setSelectedClassName] = useState("");
  const [enrollModalIsOpen, setEnrollModalIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");

  function enroll(e) {
    e.preventDefault();

    var data = {
      email: document.getElementById('modalDataList').value,
      className: selectedClassName
    };

    ClassesDataService.enroll(data)
      .then(response => {
        setAlertMessage(response.data)
        setShowAlert(true)
        setAlertVariant("success")
      })
      .catch(e => {
        setAlertMessage(e.response.data)
        setShowAlert(true)
        setAlertVariant("danger")
      });
  };

  function openEnrollModal(name) {
    console.log(name)
    setSelectedClassName(name)
    setShowAlert(false)
    setEnrollModalIsOpen(true)
  }

  function closeEnrollModal() {
    setSelectedClassName("")
    setShowAlert(false)
    setEnrollModalIsOpen(false)
  }

  function EnrollModal() {
    return (
      <ModalDataList showAlert={showAlert} alertMessage={alertMessage} variant={alertVariant}
        modalIsOpen={enrollModalIsOpen} onClose={closeEnrollModal} onAction={enroll} title="Inscribir a Clase" actionLabel="Inscribir" memberList={members}></ModalDataList>
    );
  }

  function DeleteModal() {
    return (
      <ModalContainer modalIsOpen={deleteModalIsOpen} onClose={closeDeleteModal} onAction={deleteClass} title="Eliminar Clase" actionLabel="Eliminar"></ModalContainer>
    );
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
            Alta Clase
          </Link>
        </div>
      </div>
      <br />
      <h2>Clases</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Días y Horarios</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => {
              return (
                <tr key={classItem.name}>
                  <td>{classItem.name}</td>
                  <td>
                  {(classItem.scheduleDays) &&
                    <ul>
                      {classItem.scheduleDays.map((day, indexClass) => (
                        <li key={indexClass}>
                          {day}:  {classItem.scheduleHours.join(', ')}
                        </li>
                      ))}
                    </ul>}
                  </td>
                  <td style={{ "verticalAlign": "middle", "textAlign": "center" }}>
                    <ButtonGroup>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-enroll`}>
                            Inscribir
                          </Tooltip>
                        }>
                        <Button onClick={(e) => openEnrollModal(classItem.name, e)} variant="outline-success">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                          </svg>
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-edit`}>
                            Editar
                          </Tooltip>
                        }>
                        <Link to={{
                          pathname: match.url + "/" + classItem._id + "/editar",
                          state: {
                            currentClass: classItem
                          }
                        }} className="btn btn-outline-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                          </svg>
                        </Link>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-delete`}>
                            Eliminar
                          </Tooltip>
                        }>
                        <Button onClick={(e) => openDeleteModal(classItem._id, e)} variant="outline-danger">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                          </svg>
                        </Button>
                      </OverlayTrigger>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <DeleteModal />
        <EnrollModal />
      </div>
    </div>
  );
}