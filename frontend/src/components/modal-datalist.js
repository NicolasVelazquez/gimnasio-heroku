import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

function ModalContainer(props) {
  return (
    <>
      <Modal
        size="lg"
        show={props.modalIsOpen}
        onHide={props.onClose}
        aria-labelledby="modal-sizes-title-lg"
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert  show={props.showAlert} variant={props.variant}>
            {props.alertMessage}
          </Alert>
          <div>
            <label className="form-label">Seleccione un socio</label>
            <input className="form-control" list="datalistOptions" id="modalDataList" required={true} placeholder="Escriba el email o nombre del socio..." />
            <datalist id="datalistOptions">
              {props.memberList.map((item) =>
                <option key={item._id} value={item.email}>{item.lastName + ", " + item.name}</option>
              )}
            </datalist>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onClose} variant="primary">Cancelar</Button>
          <Button onClick={props.onAction} variant="success">{props.actionLabel}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalContainer;