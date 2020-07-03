import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavigationBar() {

    return (
        <Navbar bg="dark" variant="dark">

            <Link to={""} className="navbar-brand">
                <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/book-48.png" />
            </Link>

            <Nav className="mr-auto">
                <Link to={"/expenses"} className="nav-link">Despesas</Link>
                <Link to={"/categories"} className="nav-link">Categorias</Link>
            </Nav>

        </Navbar>
    );
}