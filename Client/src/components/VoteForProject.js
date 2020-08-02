import React from "react";
import { Card, Button } from "react-bootstrap";

export default function VoteForProject(props) {

    if (props.loading) {
        return <h2>Loading.....</h2>
    }

    function DisplayCard(props) {
        function HandleClickEvent() {

            fetch(`http://localhost:4000/projects/vote/${props.p.id}`,
                {
                    method: 'PUT',
                    headers: { "Content-Type": 'application/json' }
                })
                .then((response) => response.json())
                .then((json) => {
                    if (json.status === 200) {
                        alert(json.message)
                        window.location.assign("http://localhost:3000/results")
                    }
                    else {
                        alert(json.message);
                    };
                });
        }

        return (
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
                    <Button variant="primary" onClick={HandleClickEvent}>Vote For This Project!</Button><br />
                Votes: {props.p.voteCount.toString()}
                </Card.Body>
            </Card>
        )
    }

    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {props.projects.map(project => <DisplayCard key={project.id} p={project} />)}
        </div>
    )
}

