import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export default class Footer extends React.Component {
    render() {
        return (
            <div className="row justify-content-end m-0 p-0">
                <footer className="float-right border-top footer text-muted col-md-9 ml-sm-auto col-lg-10 px-md-4 pt-1">
                    <Container>
                        <input
                            type="range"
                            className="w-25 float-right"
                            min="6"
                            max="30"
                            defaultValue="18"
                        />
                    </Container>
                </footer>
            </div>
        );
    }
}
