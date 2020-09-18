import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";

let tutorialPages = [
    {
        name: "About",
        content: (
            <div className="tutorial-content">
                <p>
                    <strong>Circuify - Logic Circuit Visualizer</strong> is
                    free, open-source tool for building and visualizing logic
                    circuits.
                </p>
                <p>
                    <strong>Most notable features:</strong>
                </p>
                <ul className="tutorial-list">
                    <li>
                        Design logic circuits with{" "}
                        <strong>
                            intuitive and easy to use user interface
                        </strong>
                    </li>
                    <li>
                        Great range of different{" "}
                        <strong>logic gates, inputs, outputs...</strong>
                    </li>
                    <li>
                        Support for{" "}
                        <strong>making custom integrated circuits</strong> for
                        easier project organization and endless creation
                        possibilities
                    </li>
                    <li>And many more to explore</li>
                </ul>
                <Image className="img-fluid" src="./Images/TitleBanner.png" />
            </div>
        ),
    },
    {
        name: "UI Introduction",
        content: (
            <div className="tutorial-content">
                <p>User Interface can be separated into three parts:</p>
                <ul className="tutorial-list">
                    <li>
                        <strong>Sidebar - </strong>
                        containts all the elements and the tools
                    </li>
                    <li>
                        <strong>Navbar - </strong>
                        containts all the options you would expect to find like
                        starting new project, canvas manipulation, element
                        selection...
                    </li>
                    <li>
                        <strong>Canvas - </strong>
                        main part of the application where elements are placed
                        and manipulated
                    </li>
                </ul>
                {/* <Image className="img-fluid" src="./Images/TitleBanner.png" /> */}
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./Images/SidebarTutorial.png"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Sidebar</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./Images/NavTutorial.png"
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3>Navbar</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./Images/CanvasTutorial.png"
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3 className="text-dark">Canvas</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        ),
    },
    {
        name: "Element Manipulation",
        content: (
            <div className="tutorial-content">
                <p>
                    <strong>Placing an element</strong> is done by selecting the
                    element on the sidebar and then clicking on the desired
                    location on the canvas.
                </p>
                <p>
                    <strong>Selecting the element</strong> can be done in two
                    ways:
                </p>
                <ul className="tutorial-list">
                    <li>
                        Selecting the single element by simply clicking on it
                    </li>
                    <li>
                        Selecting single or group of elements by creating the
                        rectangular selection
                    </li>
                </ul>

                <Carousel interval={null}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./Images/PlacingElementTutorial.gif"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3 className="text-dark">Placing Element</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./Images/SelectingGroupTutorial.gif"
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3 className="text-dark">
                                Selecting group of elements
                            </h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./Images/CanvasTutorial.png"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3 className="text-dark">Canvas</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        ),
    },
];

let currentPage = 0;

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue((value) => ++value);
}

export default function TutorialBox(props) {
    const forceUpdate = useForceUpdate();
    const [show, setShow] = useState(true);

    return (
        <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-60w"
                aria-labelledby="tutorial-modal-label"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{tutorialPages[currentPage].name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{tutorialPages[currentPage].content}</Modal.Body>
                <Modal.Footer>
                    <span className="page-number">
                        <strong>
                            ({currentPage + 1}/{tutorialPages.length})
                        </strong>
                    </span>
                    <Button
                        onClick={() => {
                            if (currentPage > 0) {
                                currentPage--;
                                forceUpdate();
                            }
                        }}
                        variant="info"
                        className={currentPage <= 0 ? "disabled" : ""}
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={() => {
                            if (currentPage + 1 < tutorialPages.length) {
                                currentPage++;
                                forceUpdate();
                            }
                        }}
                        variant="info"
                        className={
                            currentPage + 1 >= tutorialPages.length
                                ? "disabled"
                                : ""
                        }
                    >
                        Next
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
