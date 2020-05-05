import React from 'react';
import useMealService from './services/MealService';
import MealCard from './MealCard';
import CardColumns from 'react-bootstrap/CardColumns';
import Spinner from 'react-bootstrap/Spinner';
import { Meal } from '../types/Meal';
import { Status } from '../types/Status';
import { Filter } from '../types/Filter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrownOpen } from '@fortawesome/free-solid-svg-icons';

export interface Props {
    name: string;
    filterBy: Filter;
}

const MealsList: React.FC<Props> = ({ name = '', filterBy }) => {
    const service = useMealService(name, filterBy);
    let output: JSX.Element = <div></div>;

    if (service.status === Status.Loading) {
        output = (
            <>
            <Spinner animation="border" variant="info" role="status" />
            <p>Loading...</p>
            </>
        );
    }

    if (service.status === Status.Loaded) {
        const payload = service.payload;
        if (!payload.meals) {
            output = (
                <>
                <FontAwesomeIcon icon={faFrownOpen} size="2x" />
                <p>Bummer! No results for {name}...</p>
                </>
            );
        } else {
            const elements: JSX.Element[] = payload.meals.map((meal: Meal, index: number) => {
                return <MealCard key={index} meal={meal} />;
            });

            output = elements.length < 2 ? <div className="Meal-single">{elements}</div>
                                         : <CardColumns>{elements}</CardColumns>;
        }
    }

    if (service.status === Status.Error) {
        output = <p>Uh oh, there was an error!</p>;
    }

    return (
        <div className="Main-content">{output}</div>
    );
};

export default MealsList;