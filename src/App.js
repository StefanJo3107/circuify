import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

function App() {
    return (
        <div>
            <Navbar />
            <Container fluid>
                <Row>
                    <Sidebar />
                </Row>
            </Container>
        </div>
    );
}

export default App;
