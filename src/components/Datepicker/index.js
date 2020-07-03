import React from 'react';

import { Dropdown, DropdownButton, Row } from 'react-bootstrap';

import './style.css';

export default function Datepicker(props) {

    let month;
    let years = [];
    let startYear = 2010;
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    switch (props.month) {
        case 0: month = months[0]; break;
        case 1: month = months[1]; break;
        case 2: month = months[2]; break;
        case 3: month = months[3]; break;
        case 4: month = months[4]; break;
        case 5: month = months[5]; break;
        case 6: month = months[6]; break;
        case 7: month = months[7]; break;
        case 8: month = months[8]; break;
        case 9: month = months[9]; break;
        case 10: month = months[10]; break;
        case 11: month = months[11]; break;
    }

    for (let i = 0; i < 50; i++) {
        years.push(startYear++);
    }

    const itensMonth = months.map((month, index) => {
        return (
            < Dropdown.Item key={index} onSelect={props.handleSearchByMonth.bind(this, index)}>{month}</Dropdown.Item>
        )
    })

    const itensYear = years.map(year => {
        return (
            < Dropdown.Item key={year} onSelect={props.handleSearchByYear.bind(this, year)}>{year}</Dropdown.Item>

        )
    })


    return (
        <Row>
            <DropdownButton variant="outline-info" title={month} size="sm" className="pr-3">
                {itensMonth}
            </DropdownButton>

            <DropdownButton variant="outline-info" title={props.year} size="sm">
                {itensYear}
            </DropdownButton>
        </Row >
    );
}