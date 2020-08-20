import React from "react";
import BNavbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Col from "react-bootstrap/Col";
import { Icon } from "@iconify/react";
import integratedCircuit from "@iconify/icons-wpf/integrated-circuit";
import githubFilled from "@iconify/icons-ant-design/github-filled";
import twitterCircleFilled from "@iconify/icons-ant-design/twitter-circle-filled";
import redditCircleFilled from "@iconify/icons-ant-design/reddit-circle-filled";

function NavTitle(props) {
    return (
        <BNavbar.Brand className="px-3" href="#">
            <Icon className="mr-2" icon={integratedCircuit} width="25" />
            <span className="Title">Circuify</span>
        </BNavbar.Brand>
    );
}

function IconLink(props) {
    return (
        <a
            className="mr-2"
            href={props.redirect}
            target="_blank"
            rel="noopener noreferrer"
        >
            <Icon icon={props.source} width="30" color="white" />
        </a>
    );
}

function NavOption(props) {
    return (
        <Dropdown className="mr-2">
            <Dropdown.Toggle
                variant="secondary"
                style={{ backgroundColor: "transparent", border: 0 }}
                id="dropdown-basic"
            >
                {props.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
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
                <div className="ml-auto">
                    <IconLink
                        redirect="https://github.com/StefanJo3107"
                        source={githubFilled}
                    />
                    <IconLink
                        redirect="https://twitter.com/SJovGD"
                        source={twitterCircleFilled}
                    />
                    <IconLink
                        redirect="https://www.reddit.com/user/sjovanovic3107"
                        source={redditCircleFilled}
                    />
                </div>
            </BNavbar>
        );
    }
}
