import React from "react";
import NavItem from "react-bootstrap/NavItem";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Icon } from "@iconify/react";
import plusSquareOutlined from "@iconify/icons-ant-design/plus-square-outlined";
import xIcon from "@iconify/icons-bi/x";

Tab.defaultProps = {
    showClose: true,
};

function Tab(props) {
    return (
        <NavItem>
            <div
                className={
                    "btn-dark tab-link nav-link " +
                    props.activeState +
                    " " +
                    (props.content === "Main" ? "px-4 ml-2" : "")
                }
                onClick={props.onClick}
            >
                {props.content}
                <Button
                    className={
                        "p-0 remove-btn " +
                        props.activeState +
                        " " +
                        (!props.showClose ? "d-none" : "")
                    }
                    onClick={props.onDelete}
                >
                    <Icon icon={xIcon} />
                </Button>
            </div>
        </NavItem>
    );
}

function AddTab(props) {
    return (
        <NavItem>
            <div
                className={"plus-btn btn-dark tab-link nav-link"}
                onClick={props.onClick}
            >
                <Icon icon={plusSquareOutlined} width="25" />
            </div>
        </NavItem>
    );
}

export let tabs = ["Main"];

export default class Tabs extends React.Component {
    constructor(props) {
        super();
        this.state = { tabs: tabs, currentIndex: 1 };
        sessionStorage.setItem("currentCircuit", "Main");
        sessionStorage.setItem("circuits", tabs);
    }

    setActive(name) {
        if (tabs.includes(name)) {
            sessionStorage.setItem("currentCircuit", name);
            this.setState({});
        }
    }

    AddNewTab() {
        let circuitName = prompt("Please enter the name of the circuit:");
        if (
            circuitName != null &&
            circuitName !== "" &&
            !tabs.includes(circuitName) &&
            circuitName.length <= 20
        ) {
            tabs.push(circuitName);
            this.setState({ tabs: tabs });
            this.setActive(tabs[tabs.length - 1]);
            sessionStorage.setItem("circuits", tabs);

            this.props.updateState();
        } else if (circuitName === "") {
            alert("Circuit creation aborted because chosen name is invalid!");
        } else if (tabs.includes(circuitName)) {
            alert(
                "Circuit creation aborted because chosen name already exists!"
            );
        } else if (circuitName != null && circuitName.length > 20) {
            alert(
                "Circuit creation aborted because name must be less than 21 characters long!"
            );
        }
        // tabs.push("Circuit " + this.state.currentIndex);
        // this.setState({ tabs: tabs });
        // this.setActive(tabs[tabs.length - 1]);

        // this.setState({ currentIndex: this.state.currentIndex + 1 });
        // sessionStorage.setItem("circuits", tabs);
    }

    RemoveTab(index) {
        let conf = window.confirm(
            "Are you sure you want to delete " + tabs[index] + "?"
        );

        if (conf === true) {
            tabs.splice(index, 1);
            this.setState({ tabs: tabs });
            if (tabs.length > index) {
                this.setActive(tabs[index]);
            } else {
                this.setActive(tabs[tabs.length - 1]);
            }

            sessionStorage.setItem("circuits", tabs);

            this.props.updateState();
        }
    }

    render() {
        return (
            <Nav className="nav-tabs">
                <Tab
                    key={0}
                    content={"Main"}
                    onClick={() => this.setActive("Main")}
                    activeState={
                        sessionStorage.getItem("currentCircuit") === "Main"
                            ? "active"
                            : ""
                    }
                    showClose={false}
                    onDelete={() => this.RemoveTab(0)}
                />
                {this.state.tabs.map((name, index) =>
                    name !== "Main" ? (
                        <Tab
                            key={index}
                            content={name}
                            onClick={() => this.setActive(name)}
                            activeState={
                                sessionStorage.getItem("currentCircuit") ===
                                name
                                    ? "active"
                                    : ""
                            }
                            onDelete={() => this.RemoveTab(index)}
                        />
                    ) : (
                        ""
                    )
                )}
                <AddTab onClick={() => this.AddNewTab()} />
            </Nav>
        );
    }
}
