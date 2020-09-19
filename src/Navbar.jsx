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
                {props.options.map((item, index) => (
                    <Dropdown.Item
                        key={index}
                        onClick={() => {
                            item.action();
                        }}
                    >
                        {item.name}
                    </Dropdown.Item>
                ))}
                {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
            </Dropdown.Menu>
        </Dropdown>
    );
}
let navProps;
export default class Navbar extends React.Component {
    constructor(props) {
        super();
        navProps = props;
    }

    New() {
        if (window.confirm("Are you sure you want to start over?")) {
            sessionStorage.setItem("NavCommand", "New");
            navProps.updateState();
        }
    }

    Close() {
        window.close();
    }

    DeleteSelection() {
        sessionStorage.setItem("NavCommand", "Delete Selection");
    }

    SelectAll() {
        sessionStorage.setItem("NavCommand", "Select All");
    }

    SelectNone() {
        sessionStorage.setItem("NavCommand", "Select None");
    }

    ZoomIn() {
        sessionStorage.setItem("NavCommand", "Zoom In");
    }

    ZoomOut() {
        sessionStorage.setItem("NavCommand", "Zoom Out");
    }

    RunSimulation() {
        sessionStorage.setItem("NavCommand", "Run Simulation");
    }

    PauseSimulation() {
        sessionStorage.setItem("NavCommand", "Pause Simulation");
    }

    GithubRepository() {
        window.open(
            "https://github.com/StefanJo3107/logic-circuit-playground",
            "_blank",
            "noopener,noreferrer"
        );
    }

    Tutorial() {
        navProps.setTutorialShow(true);
        navProps.setTutorialPage(-1);
        navProps.updateState();
    }

    About() {
        navProps.setTutorialShow(true);
        navProps.setTutorialPage(0);
        navProps.updateState();
    }

    render() {
        const fileOptions = [
            {
                name: "New",
                action: this.New,
            },
            {
                name: "Close",
                action: this.Close,
            },
        ];

        const editOptions = [
            {
                name: "Delete Selection",
                action: this.DeleteSelection,
            },
            {
                name: "Select All",
                action: this.SelectAll,
            },
            {
                name: "Select None",
                action: this.SelectNone,
            },
        ];

        const viewOptions = [
            {
                name: "Zoom In",
                action: this.ZoomIn,
            },
            {
                name: "Zoom Out",
                action: this.ZoomOut,
            },
        ];

        const runOptions = [
            {
                name: "Run Simulation",
                action: this.RunSimulation,
            },
            {
                name: "Pause Simulation",
                action: this.PauseSimulation,
            },
        ];

        const helpOptions = [
            {
                name: "Github Repository",
                action: this.GithubRepository,
            },
            {
                name: "Tutorial",
                action: this.Tutorial,
            },
            {
                name: "About",
                action: this.About,
            },
        ];
        return (
            <BNavbar
                bg="dark"
                variant="dark"
                className="shadow flex-md-nowrap p-1"
            >
                <Col md={3} lg={2}>
                    <NavTitle />
                </Col>
                <NavOption
                    updateState={() => this.New()}
                    name="File"
                    options={fileOptions}
                />
                <NavOption name="Edit" options={editOptions} />
                <NavOption name="View" options={viewOptions} />
                <NavOption name="Run" options={runOptions} />
                <NavOption name="Help" options={helpOptions} />
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
