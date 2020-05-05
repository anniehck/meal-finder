import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import SearchContainer from './components/SearchContainer';
import { Filter } from './types/Filter';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import uniqueId from 'lodash/uniqueId';

function App() {
    const [searchType, setSearchType] = useState<Filter>(),
        [randomId, setRandomId] = useState<string>('');

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLButtonElement;
        setSearchType(target.value as Filter);
        setRandomId(uniqueId());
    };

    let container = <div/>;
    if (searchType) {
        if (searchType === Filter.Random) {
            container = <SearchContainer filterBy={searchType} randomId={randomId} />;
        } else {
            container = <SearchContainer filterBy={searchType} />;
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <h3><FontAwesomeIcon icon={faUtensils} size="3x" className="App-logo" /></h3>
                <ButtonGroup style={{ marginBottom: '2em' }}>
                    <Button variant="outline-warning" disabled>Search by</Button>
                    <Button onClick={handleClick} value={Filter.Meal}>Meal</Button>
                    <Button onClick={handleClick} value={Filter.Category}>Category</Button>
                    <Button onClick={handleClick} value={Filter.Ingredient}>Ingredient</Button>
                    <Button onClick={handleClick} value={Filter.Random}>Random</Button>
                </ButtonGroup>
                {container}
            </header>
        </div>
    );
}

export default App;
