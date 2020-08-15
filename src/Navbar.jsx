import React from "react";
import BNavbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Col from "react-bootstrap/Col";
import { Icon, InlineIcon } from "@iconify/react";
import integratedCircuit from "@iconify/icons-wpf/integrated-circuit";

class NavTitle extends React.Component {
    render() {
        return (
            <BNavbar.Brand className="px-3" href="#">
                <Icon className="mr-2" icon={integratedCircuit} width="20" />
                <span className="Title">Circuify</span>
            </BNavbar.Brand>
        );
    }
}

class NavOption extends React.Component {
    render() {
        return (
            <Dropdown className="mr-2">
                <Dropdown.Toggle
                    variant="secondary"
                    style={{ backgroundColor: "transparent", border: 0 }}
                    id="dropdown-basic"
                >
                    {this.props.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                        Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                        Something else
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

export default class Navbar extends React.Component {
    render() {
        return (
            <BNavbar
                bg="dark"
                variant="dark"
                className="shadow flex-md-nowrap p-1"
            >
                <Col md={3} lg={2}>
                    <NavTitle />
                </Col>
                <NavOption name="File" />
                <NavOption name="Edit" />
                <NavOption name="View" />
                <NavOption name="Run" />
                <NavOption name="Help" />
            </BNavbar>
        );
    }
}
