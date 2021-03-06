import React, { useState, useEffect } from 'react';
import { Filter } from '../../types/Filter';
import MealsList from '../MealsList';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export interface Props {
    filterBy: Filter;
}

const SearchForm: React.FC<Props> = ({ filterBy }) => {
    const [name, setName] = useState<string>(''),
        [enableBtn, setEnableBtn] = useState<boolean>(false),
        [mealsList, setMealsList] = useState<JSX.Element>(<div/>);

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMealsList(<MealsList name={name} filterBy={filterBy} />);
    };

    const handleInputChange = (event: any) => {
        setEnableBtn(!!event.target.value)
        setName(event.target.value);
    };

    useEffect(() => {
        setName(name);
    }, [name, mealsList, filterBy])

    return (
        <Container>
            <Form onSubmit={handleFormSubmit}>
                <Form.Row>
                    <Col sm={{ span: 6, offset: 3 }}>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={handleInputChange} />
                    </Col>
                    <Col sm={3} style={{ textAlign: 'left' }}>
                        <Button type="submit" disabled={!enableBtn}>Submit</Button>
                    </Col>
                </Form.Row>
            </Form>
            {mealsList}
        </Container>
    )
};

export default SearchForm;