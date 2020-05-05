import React, { useState, useEffect } from 'react';
import SearchByCategory from './search/SearchByCategory';
import SearchRandom from './search/SearchRandom';
import { Filter } from '../types/Filter';
import SearchForm from './search/SearchForm';

export interface Props {
    filterBy: Filter;
    randomId?: string;
}

const SearchContainer: React.FC<Props> = ({ filterBy, randomId = '' }) => {
    const [searchForm, setSearchForm] = useState<JSX.Element>(<div/>);

    useEffect(() => {
        switch (filterBy) {
            case Filter.Category:
                setSearchForm(<SearchByCategory />);
                break;
            case Filter.Random:
                setSearchForm(<SearchRandom randomId={randomId} />);
                break;
            case Filter.Ingredient:
            case Filter.Meal:
                setSearchForm(<SearchForm filterBy={filterBy} />)
                break;
            default:
                setSearchForm(<div/>);
                break;
        }
    }, [filterBy, randomId])

    return (
        <>{searchForm}</>
    );
}

export default SearchContainer;