import React from 'react';

import "./style.css";

import { Modal, Button } from 'react-bootstrap';

export default function ModalCustom(props) {

    return (
        <Modal
            dialogClassName="info-modal"
            show={props.show}
            onHide={props.onHide}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Excluir {props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>Confirmar a exclusão?</Modal.Body>

            <Modal.Footer>
                <Button size="sm" variant="outline-info" onClick={props.onClickCancel}>
                    Cancelar
                </Button>
                <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={props.onClickExclude}
                >
                    Excluir
                        </Button>
            </Modal.Footer>
        </Modal>
    );
}