import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Alert,
    Card,
    Button,
    ButtonGroup,
    Col,
    FormControl,
    InputGroup,
    Modal,
    Row,
    Table,
} from "react-bootstrap";
import {
    faList,
    faTrash,
    faEdit,
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward,
    faSearch,
    faTimes,
    faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";

import CategoryService from "../../services/categoryService";

export default class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.categoryService = new CategoryService();

        this.state = {
            categories: [],
            search: "",
            currentPage: 1,
            categoriesPerPage: 10,
            sortToggle: true,
            sortBy: "name",
            categoryId: null,
            showModal: false,
            showAlert: false,
            messageAlert: "",
        };
    };


    componentDidMount() {
        this.searchData(this.state.currentPage);
    };


    searchData = (currentPage) => {
        currentPage -= 1;
        let sortDir = this.state.sortToggle ? "asc" : "desc";

        this.categoryService
            .search(
                this.state.search,
                currentPage,
                this.state.categoriesPerPage,
                this.state.sortBy,
                sortDir
            )
            .then((response) => {
                this.setState({
                    categories: response.data.content,
                    totalPages: response.data.totalPages,
                    totalElements: response.data.totalElements,
                    currentPage: response.data.number + 1,
                });
            });
    };


    deleteCategory = () => {
        let id = this.state.categoryId;

        this.categoryService
            .deleteById(id)
            .then(() => {
                this.setState({
                    categories: this.state.categories.filter((category) => category.id !== id)
                });
            })
            .catch((warning) => {
                this.setState({
                    showAlert: true,
                    messageAlert: warning.response.data.message,
                    categories: this.state.categories.filter((category) => category.id !== id)
                });
                setTimeout(() => this.setState({ showAlert: false }), 4000);
            });

        this.handleClose();
    };


    sortToggle = async (sortAttribute) => {
        await this.setState({
            sortBy: sortAttribute,
            sortToggle: !this.state.sortToggle,
        });
        this.searchData(this.state.currentPage);
    };


    changePage = (event) => {
        let targetPage = parseInt(event.target.value);

        this.searchData(targetPage);

        this.setState({
            [event.target.name]: targetPage,
        });
    };


    firstPage = () => {
        let firstPage = 1;

        if (this.state.currentPage > firstPage) {
            this.searchData(firstPage);
        };
    };


    prevPage = () => {
        let prevPage = 1;

        if (this.state.currentPage > prevPage) {
            this.searchData(this.state.currentPage - prevPage);
        }
    };


    lastPage = () => {
        let condition = Math.ceil(
            this.state.totalElements / this.state.categoriesPerPage
        );

        if (this.state.currentPage < condition) {
            this.searchData(condition);
        };
    };


    nextPage = () => {
        if (this.state.currentPage <
            Math.ceil(this.state.totalElements / this.state.categoriesPerPage)
        ) {
            this.searchData(this.state.currentPage + 1);
        };
    };


    searchChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };


    cancelSearch = async () => {
        await this.setState({ search: "" });
        this.searchData(this.state.currentPage);
    };


    handleClose = () => {
        this.setState({
            showModal: false,
        });
    };


    handleShowModal = (id) => {
        this.setState({
            showModal: true,
            categoryId: id,
        });
    };


    render() {
        const {
            categories,
            currentPage,
            totalPages,
            search,
            showModal,
            showAlert,
            messageAlert,
            sortToggle,
        } = this.state;

        return (
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <Row>
                            <Col>
                                <FontAwesomeIcon icon={faList} />Lista de Categorias
                            </Col>
                            <Col align="right">
                                <Link
                                    to={"category/"}
                                    className="btn btn-sm btn-outline-success ml-2 mr-2"
                                >
                                    <FontAwesomeIcon icon={faPlusSquare} />Novo
                                </Link>
                            </Col>
                            <Col>
                                <InputGroup size="sm">
                                    <FormControl
                                        placeholder="Pesquisar"
                                        name="search"
                                        value={search}
                                        className={"info-border bg-dark text-white"}
                                        onChange={this.searchChange}
                                    />

                                    <InputGroup.Append>
                                        <Button
                                            size="sm"
                                            variant="outline-info"
                                            type="button"
                                            onClick={this.searchData}
                                        >
                                            <FontAwesomeIcon icon={faSearch} />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline-info"
                                            type="button"
                                            onClick={this.cancelSearch}
                                        >
                                            <FontAwesomeIcon icon={faTimes} />
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Card.Header>

                    <Alert variant="danger" show={showAlert}>
                        {messageAlert}
                    </Alert>

                    <Card.Body>
                        <Table bordered hover striped variant="dark" size="sm">
                            <thead>
                                <tr>
                                    <th onClick={this.sortToggle.bind(this, "name")}>Nome
                                        <div
                                            className={sortToggle ? "arrow arrow-down" : "arrow arrow-up"}>
                                        </div>
                                    </th>
                                    <th width="100">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length === 0 ? (
                                    <tr align="center">
                                        <td colSpan={2}> Sem categorias. </td>
                                    </tr>
                                ) : (
                                        categories.map((category) => (
                                            <tr key={category.id}>
                                                <td> {category.name} </td>
                                                <td>
                                                    <ButtonGroup>
                                                        <Link to={"category/" + category.id} className="btn btn-sm btn-outline-primary ml-2 mr-2">
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </Link>

                                                        <Button
                                                            size="sm"
                                                            variant="outline-danger"
                                                            onClick={this.handleShowModal.bind(
                                                                this,
                                                                category.id
                                                            )}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </Button>
                                                    </ButtonGroup>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                            </tbody>
                        </Table>
                    </Card.Body>

                    {categories.length > 0 ? (
                        <Card.Footer>
                            <Row>
                                <Col className="float-left">
                                    Página {currentPage} de {totalPages}
                                </Col>
                                <Col xs="auto">
                                    <InputGroup size="sm">
                                        <InputGroup.Prepend>
                                            <Button
                                                type="button"
                                                variant="outline-info"
                                                disabled={currentPage === 1 ? true : false}
                                                onClick={this.firstPage}
                                            >
                                                <FontAwesomeIcon icon={faFastBackward} />
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline-info"
                                                disabled={currentPage === 1 ? true : false}
                                                onClick={this.prevPage}
                                            >
                                                <FontAwesomeIcon icon={faStepBackward} />
                                            </Button>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            inputMode="numeric"
                                            className={"bg-dark page-num"}
                                            name="currentPage"
                                            value={currentPage}
                                            onChange={this.changePage}
                                            autoComplete="off"
                                        />
                                        <InputGroup.Append>
                                            <Button
                                                type="button"
                                                variant="outline-info"
                                                disabled={currentPage === totalPages ? true : false}
                                                onClick={this.nextPage}
                                            >
                                                <FontAwesomeIcon icon={faStepForward} />
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline-info"
                                                disabled={currentPage === totalPages ? true : false}
                                                onClick={this.lastPage}
                                            >
                                                <FontAwesomeIcon icon={faFastForward} />
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Card.Footer>
                    ) : null}
                </Card>
                <Modal
                    dialogClassName="info-modal"
                    show={showModal}
                    onHide={this.handleClose}
                    backdrop="static"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Excluir Categoria</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Deseja excluir a categoria?</Modal.Body>
                    <Modal.Footer>
                        <Button size="sm" variant="outline-info" onClick={this.handleClose}>
                            Cancelar
                        </Button>
                        <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={this.deleteCategory}
                        >
                            Excluir
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}