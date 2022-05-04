import React from "react";
import { Row, Col, Button } from "react-bootstrap";

const AboutUsScreen = () => {
    return (
        <div className="aboutbody">
            <Row>
                <Col md={3}></Col>
                <Col md={6} className="aboutpage">
                    <h1>Who are We?</h1>
                    <p>
                        Actually We are not any professionals. This website has
                        been created for the purpose of aiding students for
                        buying and selling items that they no longer need which
                        might be useful for other new students. We take no
                        charge for this. What we do is just aid in establishing
                        the communication between buyer and seller.These can
                        include: notes, drawing instruments, utensils &
                        furnitures specially by students who are on the verge of
                        leaving campus sooner or later.
                    </p>
                </Col>
                <Col md={3}></Col>
            </Row>
            <Row>
                <Col md={3}></Col>
                <Col md={6} className="aboutpage1">
                    <h1>Developer</h1>
                    <p>
                        Designed and developed by <h2>Team Cookie</h2>
                    </p>
                </Col>
                <Col md={3}></Col>
            </Row>
            <Row>
                <Col md={3}></Col>
                <Col md={6} className="aboutpage1">
                    <h1>Team Members</h1>
                    <p>
                        <li>Jatin Mangla </li>
                        <li>Atharva Pagar </li>
                        <li>Ankur Kanungo </li>
                        <li>Shishir Verma </li>
                    </p>
                </Col>
                <Col md={3}></Col>
            </Row>
        </div>
    );
};

export default AboutUsScreen;
