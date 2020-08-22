import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import "./App.css";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";

function App() {
    return (
        <>
            <Navbar />
            <Container fluid>
                <Row>
                    <Sidebar />
                    <div
                        className="col-md-9 ml-sm-auto px-0 col-lg-10"
                        id="canvasHolder"
                    ></div>
                </Row>
            </Container>
        </>
    );
}

export default App;
