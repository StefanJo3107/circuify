import React, { useState } from "react";
import NavItem from "react-bootstrap/NavItem";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import Button from "react-bootstrap/Button";
import { Icon, InlineIcon } from "@iconify/react";
import plusSquareOutlined from "@iconify/icons-ant-design/plus-square-outlined";
import xIcon from "@iconify/icons-bi/x";

function Tab(props) {
    return (
        <NavItem>
            <div
                className={"btn-dark tab-link nav-link " + props.activeState}
                onClick={props.onClick}
            >
                {props.content}
                <Button
                    className={"p-0 remove-btn " + props.activeState}
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

let tabs = ["Main"];

export default class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tabs: tabs, currentIndex: 1 };
        sessionStorage.setItem("currentCircuit", "Main");
    }

    setActive(name) {
        if (tabs.includes(name)) {
            sessionStorage.setItem("currentCircuit", name);
            this.setState({});
        }
    }

    AddNewTab() {
        tabs.push("Circuit " + this.state.currentIndex);
        this.setState({ tabs: tabs });
        this.setActive(tabs[tabs.length - 1]);

        this.setState({ currentIndex: this.state.currentIndex + 1 });
    }

    RemoveTab(index) {
        tabs.splice(index, 1);
        this.setState({ tabs: tabs });
        if (tabs.length > index) {
            this.setActive(tabs[index]);
        } else {
            this.setActive(tabs[tabs.length - 1]);
        }
    }

    render() {
        return (
            <Nav className="nav-tabs">
                {this.state.tabs.map((name, index) => (
                    <Tab
                        key={index}
                        content={name}
                        onClick={() => this.setActive(name)}
                        activeState={
                            sessionStorage.getItem("currentCircuit") === name
                                ? "active"
                                : ""
                        }
                        onDelete={() => this.RemoveTab(index)}
                    />
                ))}
                <AddTab onClick={() => this.AddNewTab()} />
            </Nav>
        );
    }
}
