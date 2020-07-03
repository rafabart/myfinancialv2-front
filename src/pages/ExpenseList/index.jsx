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

import Datepicker from "../../components/Datepicker";

import ExpenseService from "../../services/expenseService";

export default class ExpenseList extends Component {

    constructor(props) {
        super(props);
        this.expenseService = new ExpenseService();
        this.dateNow = new Date();

        this.state = {
            expenses: [],
            search: "",
            currentPage: 1,
            expensesPerPage: 15,
            sortBy: "dueDate",
            expenseId: null,
            showModal: false,
            showAlert: false,
            messageAlert: "",
            sortToggle: false,
            year: this.dateNow.getFullYear(),
            month: this.dateNow.getMonth()
        };
    };


    componentDidMount() {
        this.searchData(this.state.currentPage);
    };


    searchData = (currentPage) => {
        currentPage -= 1;
        let sortDir = this.state.sortToggle ? "asc" : "desc";

        this.expenseService
            .search(
                this.state.search,
                this.state.month,
                this.state.year,
                currentPage,
                this.state.expensesPerPage,
                this.state.sortBy,
                sortDir
            )
            .then((response) => {
                this.setState({
                    expenses: response["data"].content,
                    totalPages: response["data"].totalPages,
                    totalElements: response["data"].totalElements,
                    currentPage: response["data"].number + 1,
                });
            });
    };


    deleteExpense = () => {
        let id = this.state.expenseId;

        this.expenseService
            .deleteById(id)
            .then(() => {
                this.setState({
                    expenses: this.state.expenses.filter((expense) => expense.id !== id),
                });
            })
            .catch((warning) => {
                this.setState({
                    showAlert: true,
                    messageAlert: warning.response.data.message,
                });
                setTimeout(() => this.setState({ showAlert: false }), 4000);
            });

        this.setState({
            showModal: false,
        });
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
        }
    };


    prevPage = () => {
        let prevPage = 1;

        if (this.state.currentPage > prevPage) {
            this.searchData(this.state.currentPage - prevPage);
        }
    };


    lastPage = () => {
        let condition = Math.ceil(
            this.state.totalElements / this.state.expensesPerPage
        );

        if (this.state.currentPage < condition) {
            this.searchData(condition);
        }
    };


    nextPage = () => {
        if (
            this.state.currentPage <
            Math.ceil(this.state.totalElements / this.state.expensesPerPage)
        ) {
            this.searchData(this.state.currentPage + 1);
        }
    };


    searchChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };


    cancelSearch = () => {
        this.setState({ search: "" });
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
            expenseId: id,
        });
    };


    handleSearchByYear = async (year) => {
        await this.setState({
            year: year
        });
        this.searchData(this.state.currentPage);
    };


    handleSearchByMonth = async (month) => {
        await this.setState({
            month: month
        });
        this.searchData(this.state.currentPage);
    };


    render() {
        const {
            expenses,
            currentPage,
            totalPages,
            search,
            showModal,
            showAlert,
            messageAlert,
            sortToggle,
            sortBy,
            year,
            month,
        } = this.state;


        return (
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faList} /> Lista de Despesas
                    </Card.Header>

                    <Alert variant="danger" show={showAlert}>

                        {messageAlert}
                    </Alert>

                    <Card.Body>
                        <Row className="pb-3 pl-3">
                            <Col>
                                <Datepicker
                                    month={month}
                                    handleSearchByMonth={this.handleSearchByMonth}
                                    year={year}
                                    handleSearchByYear={this.handleSearchByYear}
                                ></Datepicker>
                            </Col>
                            <Col>
                                <Row>
                                    <Col align="right" xs lg="auto">
                                        <Link to={"expense/"} className="btn btn-sm btn-outline-success ml-2 mr-2">
                                            <FontAwesomeIcon icon={faPlusSquare} />Novo
                                        </Link>
                                    </Col>
                                    <Col width="1000">
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
                            </Col>
                        </Row>
                        <Table bordered hover striped variant="dark" size="sm">
                            <thead>
                                <tr align="center">
                                    <th>Receita</th>
                                    <th>Despesa</th>
                                    <th>Saldo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr align="center">
                                    <td>1000</td>
                                    <td>700</td>
                                    <td>300</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Table bordered hover striped variant="dark" size="sm">
                            <thead>
                                <tr>
                                    <th onClick={this.sortToggle.bind(this, "description")}>Descrição
                                        <div
                                            hidden={sortBy === "description" ? false : true}
                                            className={sortToggle ? "arrow arrow-down" : "arrow arrow-up"}>
                                        </div>
                                    </th>
                                    <th onClick={this.sortToggle.bind(this, "dueDate")}>Vencimento
                                        <div
                                            hidden={sortBy === "dueDate" ? false : true}
                                            className={sortToggle ? "arrow arrow-down" : "arrow arrow-up"}>
                                        </div>
                                    </th>
                                    <th onClick={this.sortToggle.bind(this, "paymentDate")}>Pago em
                                        <div
                                            hidden={sortBy === "paymentDate" ? false : true}
                                            className={sortToggle ? "arrow arrow-down" : "arrow arrow-up"}>
                                        </div>
                                    </th>
                                    <th onClick={this.sortToggle.bind(this, "category")}>Categoria
                                    <div
                                            hidden={sortBy === "category" ? false : true}
                                            className={sortToggle ? "arrow arrow-up" : "arrow arrow-down"}>
                                        </div>
                                    </th>
                                    <th onClick={this.sortToggle.bind(this, "value")}>Valor
                                        <div
                                            hidden={sortBy === "value" ? false : true}
                                            className={sortToggle ? "arrow arrow-down" : "arrow arrow-up"}>
                                        </div>
                                    </th>
                                    <th width="100">Ações</th>
                                </tr>
                            </thead>
                            <tbody>

                                {expenses.length === 0 ? (
                                    <tr align="center">
                                        <td colSpan={6}>Sem categorias.</td>
                                    </tr>
                                ) : (
                                        expenses.map((expense) => (
                                            <tr key={expense.id}>
                                                <td> {expense.description} </td>
                                                <td> {expense.dueDate} </td>
                                                <td> {expense.paymentDate} </td>
                                                <td> {expense.category.name} </td>
                                                <td
                                                    className={expense.expenseType === "Despesa" ? "text-danger" : null}
                                                >
                                                    {expense.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                                </td>
                                                <td>
                                                    <ButtonGroup>
                                                        <Link to={"expense/" + expense.id} className="btn btn-sm btn-outline-primary ml-2 mr-2">
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </Link>

                                                        <Button
                                                            size="sm"
                                                            variant="outline-danger"
                                                            onClick={this.handleShowModal.bind(this, expense.id)}
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

                    {expenses.length > 0 ? (
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
                            onClick={this.deleteExpense}
                        >
                            Excluir
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}