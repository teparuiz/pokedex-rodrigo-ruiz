import React from "react";
import { Modal, Button } from "react-bootstrap";

function ModalShiny(props) {
  const { sprites } = props.data;
  const { show, onHide } = props;
  return (
    <div>
      <Modal
        className="modal-container"
        show={show}
        onHide={onHide}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
              <div className="text-center">Shiny </div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Modal.Body>
            <div className="text-center img-fluid">
              <img
                src={sprites?.front_shiny}
                style={{ weight: "200px", height: "200px" }}
                alt="Front Shiny"
                className="img-fluid"
              />
            </div>
          </Modal.Body>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalShiny;
