import React from "react";
import { Card, Button } from "react-bootstrap";

export default function PendingProject(props) {

    function DisplayCard(props) {
        function HandleApproveClickEvent() {
            fetch(`http://localhost:4000/projects/status/${props.p.id}`,
                {
                    method: 'PUT',
                    headers: { "Content-Type": 'application/json' },
                    body: JSON.stringify({ status: "approved" })
                })
                .then((response) => response.json())
                .then((json) => {
                    if (json.status === 200) {
                        alert("approved");
                        window.location.reload()
                    }
                    else {
                        alert(json.message);
                    };
                });
        }

        function HandleDeniedClickEvent() {
            fetch(`http://localhost:4000/projects/status/${props.p.id}`,
                {
                    method: 'PUT',
                    headers: { "Content-Type": 'application/json' },
                    body: JSON.stringify({ status: "declined" })

                })
                .then((response) => response.json())
                .then((json) => {
                    if (json.status === 200) {
                        alert("declined")
                        window.location.reload()
                    }
                    else {
                        alert(json.message);
                    };
                });
        }

        return (
            <div>
                <Card style={{ width: "340px", margin: "10px" }}>
                    <Card.Header style={{ height: "65px", display: "flex", textAlign: "center", alignItems: "center", justifyContent: "center" }}>
                        <h5>
                            {props.p.title}
                        </h5>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text style={{ height: "240px" }}>
                            {props.p.description}<br /><br />
                        </Card.Text>
                            <Card.Subtitle>
                                {props.p.name}, {props.p.postcode}<br/><br/>
                            </Card.Subtitle>
                        <Button variant="primary mr-2" onClick={HandleApproveClickEvent}>Approve</Button>
                        <Button variant="danger" onClick={HandleDeniedClickEvent}>Declined</Button><br />
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

