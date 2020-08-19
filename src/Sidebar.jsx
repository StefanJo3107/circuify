import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Figure from "react-bootstrap/Figure";

import _ from "lodash";

import { Icon, InlineIcon } from "@iconify/react";
import arrowsExpand from "@iconify/icons-bi/arrows-expand";
import arrowsCollapse from "@iconify/icons-bi/arrows-collapse";

function CollapsableMenu(props) {
    const [open, setOpen] = useState(props.isOpen);

    const menuChunks = _.chunk(
        props.menuItems,
        Math.ceil(props.menuItems.length / 3)
    );

    const menuItems = menuChunks.map((chunk, index) => (
        <div key={index} className="d-flex justify-content-around">
            {chunk.map((item, index) => (
                <Button
                    key={index}
                    variant="secondary"
                    style={{ backgroundColor: "transparent", border: 0 }}
                >
                    <Figure>
                        <Figure.Image
                            src={item.image}
                            width={60}
                            alt={item.name}
                        />
                        <Figure.Caption className="text-center">
                            {item.name}
                        </Figure.Caption>
                    </Figure>
                </Button>
            ))}
        </div>
    ));

    return (
        <>
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="collapse-content"
                aria-expanded={open}
                variant={open ? "dark" : "secondary"}
                className="rounded-0 shadow"
            >
                <div className="d-flex justify-content-between">
                    <p className="m-0 p-0">{props.menuName}</p>
                    <Icon
                        icon={open ? arrowsCollapse : arrowsExpand}
                        width="20"
                    />
                </div>
            </Button>
            <Collapse in={open}>
                <div id="collapse-content" className="mt-2 mb-2 px-2">
                    {menuItems}
                </div>
            </Collapse>
        </>
    );
}

export default class Sidebar extends React.Component {
    render() {
        const gates = [
            {
                image:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Buffer_ANSI.svg/150px-Buffer_ANSI.svg.png",
                name: "Buffer",
            },
            {
                image:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/NOT_ANSI.svg/150px-NOT_ANSI.svg.png",
                name: "NOT",
            },
            {
                image:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/AND_ANSI.svg/150px-AND_ANSI.svg.png",
                name: "AND",
            },
            {
                image:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/NAND_ANSI.svg/150px-NAND_ANSI.svg.png",
                name: "NAND",
            },
            {
                image:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/OR_ANSI.svg/150px-OR_ANSI.svg.png",
                name: "OR",
            },
            {
                image:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/NOR_ANSI.svg/150px-NOR_ANSI.svg.png",
                name: "NOR",
            },
            {
                image:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/XOR_ANSI.svg/150px-XOR_ANSI.svg.png",
                name: "XOR",
            },
            {
                image:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/XNOR_ANSI.svg/150px-XNOR_ANSI.svg.png",
                name: "XNOR",
            },
        ];

        return (
            <>
                <Col md={3} lg={2} className="d-md-block bg-light sidebar">
                    <div className="sidebar-sticky pt-0">
                        <ul className="nav flex-column">
                            <CollapsableMenu
                                isOpen={true}
                                menuName="Logic Gates"
                                menuItems={gates}
                            />
                            <CollapsableMenu
                                isOpen={true}
                                menuName="Logic Gates"
                                menuItems={gates}
                            />
                            <CollapsableMenu
                                isOpen={true}
                                menuName="Logic Gates"
                                menuItems={gates}
                            />
                        </ul>
                    </div>
                </Col>
            </>
        );
    }
}
