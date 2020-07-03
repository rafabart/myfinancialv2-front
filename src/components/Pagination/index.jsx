import React from 'react';

import "./style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faStepBackward, faFastBackward, faStepForward, faFastForward } from "@fortawesome/free-solid-svg-icons";

import { Row, Col, InputGroup, Button, FormControl } from 'react-bootstrap';


export default function Pagination(props) {

    return (

        <Row>
            <Col className="float-left">
                Página {props.currentPage} de {props.totalPages}
            </Col>

            <Col xs="auto">
                <InputGroup size="sm">

                    <InputGroup.Prepend>
                        <Button
                            type="button"
                            variant="outline-info"
                            disabled={props.currentPage === 1 ? true : false}
                            onClick={props.onClickFirstPage}
                        >
                            <FontAwesomeIcon icon={faFastBackward} />
                        </Button>
                        <Button
                            type="button"
                            variant="outline-info"
                            disabled={props.currentPage === 1 ? true : false}
                            onClick={props.onClickPrevPage}
                        >
                            <FontAwesomeIcon icon={faStepBackward} />
                        </Button>
                    </InputGroup.Prepend>

                    <FormControl
                        inputMode="numeric"
                        className={"bg-dark page-num"}
                        name="currentPage"
                        onFocus={props.onFocus}
                        value={props.currentPage}
                        onChange={props.onClickChangePage}
                        autoComplete="off"
                    />

                    <InputGroup.Append>
                        <Button
                            type="button"
                            variant="outline-info"
                            disabled={props.currentPage === props.totalPages ? true : false}
                            onClick={props.onClickNextPage}
                        >
                            <FontAwesomeIcon icon={faStepForward} />
                        </Button>
                        <Button
                            type="button"
                            variant="outline-info"
                            disabled={props.currentPage === props.totalPages ? true : false}
                            onClick={props.onClickLastPage}
                        >
                            <FontAwesomeIcon icon={faFastForward} />
                        </Button>
                    </InputGroup.Append>

                </InputGroup>
            </Col>
        </Row>
    );
}