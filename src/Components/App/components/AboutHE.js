import React from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import shalva from '../New_SHALVA_Logo_English.png';
import alin from '../alin.png';

const About = () => {
    return (
        <div dir={'rtl'}>

            <Container className="my-5">
                <h1 className="text-center mb-4">קצת עלינו</h1>

                <Row className="mb-5">
                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>הפרויקט שלנו</Card.Title>
                                <Card.Text>
                                    אנחנו צוות של שני סטודנטים להנדסת תוכנה במכללת עזריאלי שעובדים על פרויקט שכולל יצירת קובץ STL מתמונה דו מימדית, שאותה ניתן להדפיס על גבי תלת-מימד
                                    מדפסת.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>קצת דוגמאות</Card.Title>
                                <Card.Text>
                                    להלן כמה מהתמונות שמהרנו לקבצי STL באמצעות המודל שפיתחנו.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col md={4}>
                        <Card className="shadow-sm">
                            <Card.Img variant="top" src="https://via.placeholder.com/400x300"/>
                            <Card.Body>
                                <Card.Title>תמונה 1</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="shadow-sm">
                            <Card.Img variant="top" src="https://via.placeholder.com/400x300"/>
                            <Card.Body>
                                <Card.Title>תמונה 2</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="shadow-sm">
                            <Card.Img variant="top" src="https://via.placeholder.com/400x300"/>
                            <Card.Body>
                                <Card.Title>תמונה 3</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h2 className="text-center mb-4">מוסדות שאנחנו עובדים איתם</h2>

                        <Row className="justify-content-center align-items-center">
                            <Col md={3}>
                                <img src={shalva} alt="Enterprise 1" className="img-fluid my-2"/>
                            </Col>

                            <Col md={3}>
                                <img src={alin} alt="Enterprise 2" className="img-fluid my-2"/>
                            </Col>

                            <Col md={3}>
                                <img src="https://via.placeholder.com/200x100" alt="Enterprise 3"
                                     className="img-fluid my-2"/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>

    );
};

export default About;
