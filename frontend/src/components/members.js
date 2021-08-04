import React, { useState, useEffect } from "react"
import { Link, useRouteMatch } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import ClassesDataService from "../services/class.service"
import MembersDataService from "../services/member.service"
import ModalContainer from "./modal-example"

export default function Members(props) {
  const [members, setMembers] = useState([]);
  let match = useRouteMatch();

  useEffect(() => {
    retrieveMembers();
  }, []);

  const retrieveMembers = () => {
    MembersDataService.getAll()
      .then(response => {
        console.log(response.data);
        setMembers(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState();

  function deleteMember(e) {
    e.preventDefault();
    MembersDataService.deleteMember(selectedMemberId)
      .then(response => {
        retrieveMembers();
      })
      .catch(e => {
        console.log(e);
      });
    closeModal();
  };

  function openModal(id) {
    setSelectedMemberId(id)
    setIsOpen(true);
  }

  function closeModal() {
    setSelectedMemberId(null)
    setIsOpen(false);
  }

  function DeleteModal() {
    return (
      <ModalContainer modalIsOpen={modalIsOpen} onClose={closeModal} onAction={deleteMember} title="Eliminar Socio" actionLabel="Eliminar"></ModalContainer>
    );
  }

  function dropOut(className, member, indexClass) {
    let elementId = member.name+className.replaceAll(' ', '')+indexClass
    console.log(elementId)
    
    var data = {
      "email": member.email,
      "className": className
    };

    ClassesDataService.dropOut(data)
      .then(response => {
        console.log(document.getElementById(elementId))
        document.getElementById(elementId).remove()
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-12 pb-4" style={{ textAlign: "right" }}>
          <Link to={`${match.url}/crear`} className="btn btn-primary col-lg-4">
            Alta Socio
          </Link>
        </div>
      </div>
      <div >
        <h2>Registro de Socios</h2>
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header}>
              <Card.Subtitle>
                <Row>
                  <Col>Nombre y Apellido</Col>
                  <Col>Email</Col>
                  <Col>Estado</Col>
                  <Col md="auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-contract" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M3.646 13.854a.5.5 0 0 0 .708 0L8 10.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708zm0-11.708a.5.5 0 0 1 .708 0L8 5.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </Col>
                </Row>
              </Card.Subtitle>
            </Accordion.Toggle>
          </Card>
          {members.map((memberItem, index) => {
            return (
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey={memberItem._id}>
                  <Row>
                    <Col><strong>{memberItem.name} {memberItem.lastName}</strong></Col>
                    <Col> {memberItem.email}</Col>
                    <Col>{(memberItem.active) ? 'ACTIVO' : 'INACTIVO'}</Col>
                    <Col md="auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={memberItem._id}>
                  <Card.Body>
                    <Row>
                      <Col>
                        <strong>Fecha de Nacimiento: </strong>{new Date(memberItem.birthday).toLocaleDateString()}<br />
                        <strong>Socio desde: </strong>{new Date(memberItem.createdAt).toLocaleDateString()}<br />
                        <strong>Género: </strong>{memberItem.genre ? memberItem.genre : '-'}<br />
                      </Col>
                      <Col>
                        <strong>Teléfono: </strong>{memberItem.phonenumber ? memberItem.phonenumber : '-'}<br />
                        {(memberItem.activePayment) &&
                          <div>
                            <strong>Vencimiento del abono: </strong> {new Date(memberItem.activePayment.end).toLocaleDateString()}
                          </div>}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>Clases inscripto: </strong>
                        {(memberItem.classesEnrolled.length && memberItem.classesEnrolled.length > 0) ?
                          <ul>
                            {memberItem.classesEnrolled.map((item, indexClass) => (
                              <li key={indexClass} id={memberItem.name+item.replaceAll(' ', '')+indexClass}>
                                {item}
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip id={`tooltip-delete`}>
                                      Salir de clase
                                    </Tooltip>
                                  }>
                                  <Button onClick={(e) => dropOut(item, memberItem, indexClass)} variant="link">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
                                    </svg>
                                  </Button>
                                </OverlayTrigger>
                              </li>
                            ))}
                          </ul> : <p>Aún no se ha inscripto a una clase.</p>}
                      </Col>
                    </Row>
                    <Row >
                      <Col>
                      </Col>
                      <Col>
                        <Link to={{
                          pathname: match.url + "/" + memberItem._id + "/editar",
                          state: {
                            currentMember: memberItem
                          }
                        }} className="btn btn-primary col-lg-5 mx-1 mb-1">
                          Editar
                        </Link>
                        <button onClick={(e) => openModal(memberItem._id, e)} className="btn btn-danger col-lg-5 mx-1 mb-1">Eliminar</button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
        </Accordion>
      </div>
      <DeleteModal />
    </div>

  );

}