import React, { Component } from 'react';

import { Alert, Card, Button, Form, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare, faUndo, faList, faEdit } from '@fortawesome/free-solid-svg-icons';

import CategoryService from '../../services/categoryService';

export default class Category extends Component {

    constructor(props) {
        super(props);
        this.categoryService = new CategoryService();

        this.state = {
            id: null,
            name: '',
            showMessage: false,
            message: '',
            typeMessage: '',
            errors: []
        };

        this.submitCategory = this.submitCategory.bind(this);
        this.categoryChange = this.categoryChange.bind(this);
    };


    componentDidMount() {
        const categoryId = +this.props.match.params.id;

        if (categoryId) {
            this.findCategoryById(categoryId);
        };
    };


    submitCategory = event => {
        event.preventDefault();

        const category = {
            id: this.state.id,
            name: this.state.name,
        };

        this.categoryService.save(category)
            .then(() => {
                this.setState({
                    name: '',
                    showMessage: true,
                    typeMessage: 'success',
                    message: 'Categoria criada com sucesso!'
                });
            })
            .catch(error => {
                if (error.response.status == "422") {
                    this.setState({ errors: error.response.data.errors });
                } else {
                    this.setState({
                        showMessage: true,
                        typeMessage: 'danger',
                        message: error.response.data.message
                    });
                }
            });
        setTimeout(() => this.setState({ errors: [], showMessage: false }), 3000);
    };


    updateCategory = event => {
        event.preventDefault();

        const category = {
            id: this.state.id,
            name: this.state.name
        };

        this.categoryService.save(category)
            .then(() => {
                this.setState({
                    showMessage: true,
                    typeMessage: 'success',
                    message: 'Categoria atualizada com sucesso!'
                });
            })
            .catch(error => {
                if (error.response.status == "422") {
                    this.setState({ errors: error.response.data.errors });
                } else {
                    this.setState({
                        showMessage: true,
                        typeMessage: 'danger',
                        message: error.response.data.message
                    });
                }
            });
        setTimeout(() => this.setState({ errors: [], showMessage: false }), 3000);
    };


    findCategoryById = (categoryId) => {

        this.categoryService.getById(categoryId)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name
                });
            })
            .catch(() => {
                this.categoryList()
            });
    };


    categoryChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    resetCategory = () => {
        this.setState({
            name: ''
        });
    };


    categoryList = () => {
        return this.props.history.push("/categories");
    };


    render() {

        const { id, name, errors, showMessage, message, typeMessage } = this.state;

        return (

            <div>

                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={id ? faEdit : faPlusSquare} /> {id ? "Alterar Categoria" : "Nova Categoria"}
                    </Card.Header>

                    <Alert variant={typeMessage + " w-100"} show={showMessage}>
                        {message}
                    </Alert>

                    <Form onReset={this.resetCategory} onSubmit={id ? this.updateCategory : this.submitCategory} id="categoryFormId">
                        <Card.Body>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridAuthor">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control autoComplete="off"
                                        name="name"
                                        type="text"
                                        value={name}
                                        onChange={this.categoryChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Digite o nome da categoria" />
                                </Form.Group>
                            </Form.Row>


                            <Form.Row>
                                <Alert variant="danger w-100" show={errors.length > 0}>
                                    {errors.map(err => err.fieldName === "name" ? err.message + ' ' : null)}
                                </Alert>
                            </Form.Row>

                        </Card.Body>

                        <Card.Footer style={{ "textAlign": "right" }}>
                            <Button size="sm" variant="success" type="submit" className="mr-2">
                                <FontAwesomeIcon icon={faSave} /> {id ? "Atualizar" : "Salvar"}
                            </Button>
                            <Button size="sm" variant="info" type="reset" className="mr-2">
                                <FontAwesomeIcon icon={faUndo} /> Limpar
                            </Button>
                            <Button size="sm" variant="info" type="button" onClick={this.categoryList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Lista de Categorias
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>

        );
    }
}