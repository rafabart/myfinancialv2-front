import React from 'react';

import './style.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

import { Button, FormControl, InputGroup } from "react-bootstrap";


export default function SearchInput(props) {


    return (
        <InputGroup size="sm">
            <FormControl
                placeholder="Pesquisar"
                name="search"
                value={props.value}
                className={"info-border bg-dark text-white"}
                onChange={props.onChange}
            />

            <InputGroup.Append>
                <Button
                    size="sm"
                    variant="outline-info"
                    type="button"
                    onClick={props.onClickSearchData}
                >
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
                <Button
                    size="sm"
                    variant="outline-info"
                    type="button"
                    onClick={props.onClickCancelSearch}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </Button>
            </InputGroup.Append>
        </InputGroup>
    );
}