import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import "./App.css";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Tabs from "./Tabs.jsx";
import PropertyBox from "./PropertyBox.jsx";
import TutorialBox from "./TutorialBox.jsx";

let tutorialShow = { show: true };
let tutorialPages = { pageToShow: -1 };
class App extends React.Component {
    constructor(props) {
        super();
        if (localStorage.getItem("tutorialShown") === "true") {
            this.showTutorial(false);
        }
    }

    showTutorial(state) {
        tutorialShow.show = state;
    }

    setTutorialPage(page) {
        tutorialPages.pageToShow = page;
    }

    render() {
        return (
            <>
                <Navbar
                    updateState={() => {
                        this.setState({});
                    }}
                    setTutorialShow={this.showTutorial}
                    setTutorialPage={this.setTutorialPage}
                ></Navbar>
                <Sidebar selection={sessionStorage.getItem("selectedOption")} />

                <Container fluid>
                    <Row>
                        <div
                            className="col-md-9 ml-sm-auto px-0 col-lg-10"
                            id="canvasHolder"
                        >
                            <Tabs
                                updateState={() => {
                                    this.setState({});
                                }}
                            ></Tabs>
                        </div>
                    </Row>
                    <PropertyBox />
                </Container>

                <TutorialBox
                    tutorialShow={tutorialShow}
                    setShow={this.showTutorial}
                    pages={tutorialPages}
                />
            </>
        );
    }
}

export default App;
