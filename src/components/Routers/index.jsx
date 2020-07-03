import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';

import Category from "../../pages/Category";
import CategoryList from "../../pages/CategoryList";
import ExpenseList from "../../pages/ExpenseList";
import NavigationBar from "../NavigationBar";
import Welcome from "../Welcome";

export default function Routers() {

    const heading = "Bem-vindo ao myFinancial";
    const desc = "Cuidado com as pequenas despesas, um pequeno vazamento afundará um grande navio.";
    const footer = "Benjamin Franklin";

    return (

        <BrowserRouter>

            <NavigationBar />

            <Container>
                <Row>

                    <Col lg={12} className={"mt-2"}>
                        <Switch>
                            <Route path="/" exact component={() => <Welcome heading={heading} desc={desc} footer={footer} />} />
                            <Route path="/categories" exact component={CategoryList} />
                            <Route path="/expenses" exact component={ExpenseList} />
                            <Route path="/category/:id?" exact component={Category} />

                        </Switch>
                    </Col>
                </Row>

            </Container>
        </BrowserRouter>
    );
}