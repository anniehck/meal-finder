import React, { useState, useEffect } from 'react';
import useMealByIdService from './services/MealByIdService';
import { Meal } from '../types/Meal'
import { Status } from '../types/Status';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import CardItem from './CardItem';

export interface Props {
    meal: Meal;
}

const MealCard: React.FC<Props> = ({ meal }) => {
    const { id, name, thumbnailUrl, area, category, tags, instructions, ingredients } = meal,
        modalKey = `${id}-modal`;

    const [showModal, setShowModal] = useState<boolean>(false),
        [mealId, setMealId] = useState<string>(meal.id),
        [modalBody, setModalBody] = useState({ ingredients, instructions }),
        handleClose = () => setShowModal(false),
        handleShow = () => setShowModal(true);

    const service = useMealByIdService(mealId);
    useEffect(() => {
        setMealId(meal.id);
        if (!meal.instructions) {
            if (showModal && service.status === Status.Loaded) {
                const meal = service.payload.meal;
                if (meal) {
                    setModalBody({
                        ingredients: meal.ingredients,
                        instructions: meal.instructions
                    });
                }
            }
        }
    }, [showModal, meal, service]);

    const tagSplit = tags ? tags.split(',') : [];
    return (
        <>
        <CardItem
            id={id}
            title={name}
            subtitle={category}
            text={area}
            tags={tagSplit}
            imageUrl={thumbnailUrl}
            handleButtonClick={handleShow} />

        <Modal key={modalKey} size="lg" show={showModal} onHide={handleClose} animation={false} centered>
            <Modal.Header closeButton>
                <Modal.Title>Let's make <code>{name}</code>!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4><code>Ingredients</code></h4>
                <Container style={{ marginBottom: '20px' }}>
                    {modalBody.ingredients.map((ingred, index) => {
                        return (
                            <Row key={index} className="show-grid">
                                <Col sm={6}>{ingred.name}</Col>
                                <Col sm={6}>{ingred.measurement}</Col>
                            </Row>
                        );
                    })}
                </Container>
                <h4><code>Directions</code></h4>
                <p>{modalBody.instructions}</p>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default MealCard;