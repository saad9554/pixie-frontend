import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function MyAlert(props) {
  const { show, setShow } = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  if (show) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Item added to cart</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
