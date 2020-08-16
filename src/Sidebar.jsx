import React from "react";
import Col from "react-bootstrap/Col";
import { Icon, InlineIcon } from "@iconify/react";

export default class Sidebar extends React.Component {
    render() {
        return (
            <Col md={3} lg={2} className="d-md-block bg-light sidebar collapse">
                <div className="sidebar-sticky pt-3"></div>
            </Col>
        );
    }
}
