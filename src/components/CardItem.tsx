import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export interface Props {
    id: string;
    title: string;
    subtitle: string;
    text: string;
    imageUrl: string;
    tags: string[];
    handleButtonClick: () => void;
}

const CardItem: React.FC<Props> = ({ id, title, subtitle, tags, text, imageUrl, handleButtonClick }) => {
    return (
        <Card style={{ width: '18rem' }} key={id} className="Meal-item">
            <Card.Img variant="top" src={imageUrl} className="Meal-thumbnail" />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="text-muted">{subtitle}</Card.Subtitle>
                <Card.Text>
                    {text}<br/>
                    {tags.map((tag: any, i: number) => {
                        const variant = i % 2 === 0 ? 'primary' : 'info';
                        return <Badge key={i} variant={variant} className="Tag-badge">{tag}</Badge>
                    })}
                </Card.Text>
                <Button variant="outline-primary" onClick={handleButtonClick}>View Details</Button>
            </Card.Body>
        </Card>
    );
}

export default CardItem;