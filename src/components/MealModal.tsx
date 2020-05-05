import React, { useState } from 'react';
import { Meal } from '../types/Meal'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

export interface Props {
    meal: Meal
    // id: string;
    // name: string;
    // thumbnailUrl: string;
    // category: string;
    // tags: string;
    // instructions: string;
    // ingredients: any[];
}

const MealModal: React.FC<Props> = ({ meal }) => {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const { id, name, thumbnailUrl, category, tags, instructions, ingredients } = meal,
        modalKey = `${id}-modal`;

    return (
        <Modal key={modalKey} show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Get Cookin'!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    {ingredients.map((ingred, index) => {
                        return <li key={index}>{ingred.name} ({ingred.measurement})</li>
                    })}
                </ul>
                <p>{instructions}</p>
            </Modal.Body>
        </Modal>
    );
}

export default MealModal;