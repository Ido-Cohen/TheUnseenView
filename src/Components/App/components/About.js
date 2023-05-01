import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import shalva from '../New_SHALVA_Logo_English.png';
import alin from '../alin.png';

const About = () => {
    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">About Us</h1>

            <Row className="mb-5">
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Our Project</Card.Title>
                            <Card.Text>
                                We are a team of two software engineering students working on a project that involves generating a 3D STL file from a 2D image, which can then be printed on a 3D printer.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Our Images</Card.Title>
                            <Card.Text>
                                Here are some of the images that we have converted to 3D STL files using our software.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-5">
                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Img variant="top" src="https://via.placeholder.com/400x300" />
                        <Card.Body>
                            <Card.Title>Image 1</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Img variant="top" src="https://via.placeholder.com/400x300" />
                        <Card.Body>
                            <Card.Title>Image 2</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Img variant="top" src="https://via.placeholder.com/400x300" />
                        <Card.Body>
                            <Card.Title>Image 3</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h2 className="text-center mb-4">Enterprises We Work With</h2>

                    <Row className="justify-content-center align-items-center">
                        <Col md={3}>
                            <img src={shalva} alt="Enterprise 1" className="img-fluid my-2" />
                        </Col>

                        <Col md={3}>
                            <img src={alin} alt="Enterprise 2" className="img-fluid my-2" />
                        </Col>

                        <Col md={3}>
                            <img src="https://via.placeholder.com/200x100" alt="Enterprise 3" className="img-fluid my-2" />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default About;
