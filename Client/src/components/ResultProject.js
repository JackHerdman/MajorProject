import React from "react";
import { Card } from "react-bootstrap";

export default function ResultProject(props) {

    function DisplayCard(props) {
        return (
            <div>
                <Card style={{ width: "340px", margin: "10px" }}>
                    <Card.Header style={{ height: "65px", display: "flex", textAlign: "center", alignItems: "center", justifyContent: "center" }}>
                        <h5>
                            {props.p.title}
                        </h5>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text style={{ height: "200px" }}>
                            {props.p.description}<br /><br />
                        </Card.Text>
                        <strong> Votes: {props.p.voteCount.toString()}</strong>
                    </Card.Body>
                </Card>
            </div>
        )
    }

    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {props.projects.map(project => <DisplayCard key={project.id} p={project} />)}
        </div>
    )
}

