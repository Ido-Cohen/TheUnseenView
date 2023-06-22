import React from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import shalva from '../media/New_SHALVA_Logo_English.png';
import alin from '../alin.png';
import cropped1 from '../media/cropped.jpg'
import legend1 from '../media/legend-attached.png'
import pattern1 from '../media/pattern.png'
import segment1 from '../media/segmented.png'

const About = () => {
    return (
        <div dir={"ltr"}>
            <Container className="my-5">
                <h1 className="text-center mb-4">About Us</h1>

                <Row className="mb-5">
                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>Our Project</Card.Title>
                                <Card.Text>
                                    We are a team of two software engineering students working on a project that
                                    involves generating a 3D STL file from a 2D image, which can then be printed on a 3D
                                    printer.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>Our Images</Card.Title>
                                <Card.Text>
                                    Here are some of the images that we have converted to 3D STL files using our
                                    software.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Img variant="top" src={cropped1}/>
                            <Card.Body>
                                <Card.Title>Cropped Image</Card.Title>
                                <Card.Text>The user select an image and asked how to crop it if the image ratio isn't fit to the printer.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Img variant="top" src={segment1}/>
                            <Card.Body>
                                <Card.Title>Segmented Image</Card.Title>
                                <Card.Text>The user requested to choose a shape for each segmented object.</Card.Text>
                                <Card.Text>The user is limited to select only 6 objects in order to avoid confusion.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Img variant="top" src={pattern1}/>
                            <Card.Body>
                                <Card.Title>Pattern</Card.Title>
                                <Card.Text>The user can optionally add the original image to the background of the pattern by adjusting the brightness of the background.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Img variant="top" src={legend1}/>
                            <Card.Body>
                                <Card.Title>Legend Attached</Card.Title>
                                <Card.Text>This is one step before the creation of the STL file where the user can see the final product.</Card.Text>
                                <Card.Text>The brighter a pixel is, the more prominent it will be in the final result.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h2 className="text-center mb-4">Organizations We Work With</h2>

                        <Row className="justify-content-center align-items-center">
                            <Col md={2}>
                                <img src={shalva} alt="Enterprise 1" className="img-fluid my-2"/>
                            </Col>

                            <Col md={2}>
                                <img src={alin} alt="Enterprise 2" className="img-fluid my-2"/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>

    );
};

export default About;
