import React, { useEffect, useState } from 'react';
import useCategoryService from '../services/CategoryService';
import MealsList from '../MealsList';
import { Category } from '../../types/Category';
import { Status } from '../../types/Status';
import { Filter } from '../../types/Filter';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const SearchByCategory: React.FC<{}> = () => {
    const service = useCategoryService(),
        [name, setName] = useState<string>(''),
        [enableBtn, setEnableBtn] = useState<boolean>(false),
        [categoryOptions, setCategoryOptions] = useState<JSX.Element[]>([]),
        [mealsList, setMealsList] = useState<JSX.Element>(<div/>);

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMealsList(<MealsList name={name} filterBy={Filter.Category} />);
    };

    const handleInputChange = (event: any) => {
        setEnableBtn(!!event.target.value);
        setName(event.target.value);
    }

    useEffect(() => {
        if (service.status === Status.Loaded) {
            const options = service.payload.categories.map((category: Category, index: number) => {
                return <option key={index}
                               value={category.name}>{category.name}</option>;
            });
            setCategoryOptions(options);
        }
    }, [service]);

    return (
        <Container>
            <Form onSubmit={handleFormSubmit}>
                <Form.Row>
                    <Col sm={{ span: 6, offset: 3 }}>
                        <Form.Control
                            as="select"
                            value={name}
                            onChange={handleInputChange}>
                            <option value="">Choose a category...</option>
                            {categoryOptions}
                        </Form.Control>
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

export default SearchByCategory;