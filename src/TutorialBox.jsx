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
                            src="./Images/SidebarTutorial.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Sidebar</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./Images/NavTutorial.jpg"
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3>Navbar</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./Images/CanvasTutorial.jpg"
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3 className="text-info">Canvas</h3>
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
                    <strong>Selecting an element</strong> can be done in
                    multiple ways:
                </p>
                <ul className="tutorial-list">
                    <li>
                        Selecting the single element by simply clicking on it
                    </li>
                    <li>
                        Selecting single or group of elements by creating the
                        rectangular selection
                    </li>
                    <li>
                        Selecting all elements by choosing select all option
                        under <strong>Edit {">"} Select All</strong>
                    </li>
                </ul>
                <p>
                    <strong>Dragging an element</strong> is done by selecting it
                    and then dragging the mouse to the desired location on the
                    canvas.
                </p>
                <p>
                    <strong>Deleting an element</strong> can be done in two
                    ways:
                </p>
                <ul className="tutorial-list">
                    <li>
                        Selecting elements and then hitting{" "}
                        <strong>DELETE key</strong> on the keyboard
                    </li>
                    <li>
                        Selecting elements and choosing delete option under{" "}
                        <strong>Edit {">"} Delete Selection</strong>
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
                            <h3 className="text-info">Placing an element</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./Images/SelectingGroupTutorial.gif"
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3 className="text-info">
                                Selecting group of elements
                            </h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./Images/DraggingElementTutorial.gif"
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3 className="text-info">Dragging an element</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./Images/DeletingElementsTutorial.gif"
                            alt="Fourth slide"
                        />
                        <Carousel.Caption>
                            <h3 className="text-info">Deleting elements</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        ),
    },
    {
        name: "Element Wiring",
        content: (
            <div className="tutorial-content">
                <p>
                    Crucial part of every logic curcuit are{" "}
                    <strong>wires</strong>, connecting inputs and outputs of
                    elements.
                </p>
                <p>
                    <strong>Adding wire</strong> is done by firstly selecting
                    input(output) of the first element you wish to connect.
                    After that, valid output(input) joint needs to be
                    selected(indicated by the blue color) in order to add the
                    wire.
                </p>
                <p>
                    <strong>Removing wire</strong> is done by selecting Remove
                    Wire tool on the sidebar and then selecting input and output
                    joints of the wire you wish to remove.
                </p>

                <Carousel interval={null}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./Images/ConnectingElementsTutorial.gif"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3 className="text-info">Connecting elements</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./Images/RemovingWireTutorial.gif"
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3 className="text-info">Removing wire</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        ),
    },
    {
        name: "Integrated Circuits",
        content: (
            <div className="tutorial-content">
                <p>
                    One of the most important features of Circuify is the
                    support for <strong>Integrated Circuits.</strong> Once you
                    create IC, you can use it repeatedly, which allows for
                    better organized and more structured design.
                </p>
                <p>
                    <strong>Creating circuit</strong> is done by clicking on the
                    + button located on the tab bar on top of the canvas. Once
                    you press it, you will be prompted to choose a name for your
                    circuit.
                </p>
                <p>
                    <strong>
                        Inputs and outputs of the integrated circuit:
                    </strong>
                </p>
                <ul className="tutorial-list">
                    <li>
                        Inputs will be assignable on the integrated circuit only
                        for the inputs of type <strong>Switch</strong>. Other
                        inputs will only be manageable in the circuit itself.
                    </li>
                    <li>
                        Outputs will be assignable on the integrated circuit
                        only for the outputs of type <strong>Light Bulb</strong>
                        . Other outputs will only be manageable in the circuit
                        itself.
                    </li>
                </ul>
                <p>
                    It is highly recommended to name every Switch and Light Bulb
                    in the circuit, as those names will be visible on the
                    Integrated Circuit element.
                </p>
                <p>
                    <strong>Adding Integrated Circuit element</strong> - Once
                    the circuit is created, it can be used across all the other
                    circuits in form of an integrated circuit. Just locate the
                    element at the bottom of the Sidebar and add it to a canvas.
                </p>

                <Carousel interval={null}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./Images/CreatingCircuitTutorial.gif"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3 className="text-info">Creating circuit</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./Images/NamingSwitchTutorial.gif"
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3 className="text-info">Naming a switch</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./Images/AddingCircuitTutorial.gif"
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3 className="text-info">
                                Adding integrated circuit
                            </h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        ),
    },
    {
        name: "Finishing Up",
        content: (
            <div className="tutorial-content">
                <p>
                    That is about everything you need to know in order to use
                    Circuify. All that is left now is to let your imagination
                    run wild and create awesome things. Hopefully you'll enjoy
                    using it as much as I enjoyed making it.
                </p>
                <p>
                    If you get stuck at any point, you can always re-read this
                    tutorial by going under <strong>Help {">"} Tutorial</strong>
                    .
                </p>
                {/* <img
                    className="img-fluid"
                    src="./Images/CircuifySevenSegment.gif"
                ></img> */}
                <img
                    class="d-block w-100"
                    src="./Images/CircuifySevenSegment.gif"
                ></img>
            </div>
        ),
    },
];

let currentPage = 0;

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue((value) => ++value);
}

function showFooter(props, forceUpdate) {
    if (props.pages.pageToShow === -1) {
        return (
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
                        } else {
                            props.setShow(false);
                            forceUpdate();
                        }
                    }}
                    variant="info"
                >
                    {currentPage + 1 >= tutorialPages.length
                        ? "Finish"
                        : "Next"}
                </Button>
            </Modal.Footer>
        );
    } else return;
}

export default function TutorialBox(props) {
    const forceUpdate = useForceUpdate();
    if (props.pages.pageToShow !== -1) {
        currentPage = props.pages.pageToShow;
    }

    localStorage.setItem("tutorialShown", true);

    return (
        <>
            <Modal
                show={props.tutorialShow.show}
                onHide={() => {
                    currentPage = 0;
                    props.setShow(false);
                    forceUpdate();
                }}
                dialogClassName="modal-60w"
                aria-labelledby="tutorial-modal-label"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{tutorialPages[currentPage].name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{tutorialPages[currentPage].content}</Modal.Body>
                {showFooter(props, forceUpdate)}
            </Modal>
        </>
    );
}
