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
        <div dir={"rtl"}>
            <Container className="my-5">
                <h1 className="text-center mb-4">קצת עלינו</h1>

                <Row className="mb-5">
                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>על הפרויקט</Card.Title>
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
                                <Card.Title>התהליך</Card.Title>
                                <Card.Text>
                                    להלן דוגמה עם הסבר על התהליך באמצעות המודל שפיתחנו.
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
                                <Card.Title>תמונה מהמשתמש</Card.Title>
                                <Card.Text>המשתמש בוחר תמונה ונשאל כיצד לחתוך אותה אם יחס התמונה אינו מתאים למדפסת.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Img variant="top" src={segment1}/>
                            <Card.Body>
                                <Card.Title>סגמנטציה</Card.Title>
                                <Card.Text>המשתמש מתבקש לבחור צורה עבור כל אובייקט מפולח.</Card.Text>
                                <Card.Text>המשתמש מוגבל לבחירת 6 אובייקטים בלבד על מנת למנוע בלבול.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Img variant="top" src={pattern1}/>
                            <Card.Body>
                                <Card.Title>הוספת טקסטורה</Card.Title>
                                <Card.Text>המשתמש יכול להוסיף את התמונה המקורית לרקע הדפוס על ידי התאמת בהירות הרקע.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Img variant="top" src={legend1}/>
                            <Card.Body>
                                <Card.Title>מקרא</Card.Title>
                                <Card.Text>זהו שלב אחד לפני יצירת קובץ STL שבו המשתמש יכול לראות את המוצר הסופי.</Card.Text>
                                <Card.Text>ככל שפיקסל בהיר יותר, כך הוא יהיה בולט יותר בתוצאה הסופית.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h2 className="text-center mb-4">ארגונים שאנחנו עובדים איתם</h2>

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
