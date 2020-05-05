import React from 'react';
import { Filter } from '../../types/Filter';
import MealsList from '../MealsList';
import Container from 'react-bootstrap/Container';


export interface Props {
    randomId: string;
}

const SearchRandom: React.FC<Props> = ({ randomId }) => {
    return (
        <Container>
            <MealsList filterBy={Filter.Random} name={randomId} />
        </Container>
    )
};

export default SearchRandom;