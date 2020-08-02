import React, { useState } from "react";
import { Container, Button, Card,Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function SubmitProject() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [postcode, setPostcode] = useState('');
    const [showForm, setShowForm] = useState(true);
    const [content, setContent] = useState("");
    const [contentError, setContentError] = useState();
    const [errorMessage, setErrorMessage] = useState(false);

    function addProjectRequest(e) {
        e.preventDefault();
        let project = {
            title,
            description,
            name,
            postcode,
        };
        fetch('http://localhost:4000/projects',
            {
                method: 'POST',
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify(project)
            })
            .then((response) => response.json())
            .then((json) => {
                if (json.status === 201) {
                    setContent(
                        < div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", alignContent: "center" }} >
                            {setShowForm(false)}
                            <h1>Your project application has been submitted for review</h1>
                            <Card style={{ width: "600px", margin: "10px" }}>
                                <Card.Header style={{ height: "65px", display: "flex", textAlign: "center", alignItems: "center", justifyContent: "center" }}>
                                    <h5>
                                        {title}
                                    </h5>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text style={{ height: "200px" }}>
                                        {description}<br /><br />
                                    </Card.Text>
                                    <Card.Subtitle>
                                        {name}, {postcode}
                                    </Card.Subtitle>
                                    <strong> Status: {json.data.status}</strong>
                                </Card.Body>
                            </Card>
                            <Link to='/'><Button style={{ margin: "5px" }}>Home</Button></Link>
                            <br />
                        </div >                      
                    )
                }
                else {
                    setErrorMessage(json)
                    setContentError(true);
                };
            });
    }

    function handlePostcodeChangeEvent(e) {
        let regex = /^[0-9\b]+$/;
        if (e.target.value === '' || regex.test(e.target.value) && e.target.value.length <= 4) {
            setPostcode(e.target.value)
        }
    }

    return (
        <Container className="pt-4">
            <div style={{ display: showForm ? "block" : "none" }}>
                <h2>Submit a Project Proposal</h2>
                <br />
                <p>Projects should all have a simple title that gives a quick idea of what the project will be about. They should also include a detailed decription of what the project is and how it can benefit the local community. Your name and postcode will be required on any submissions but they will not be publicly disclosed with your project.</p>
                <br />
                {contentError && <Alert variant='danger' onClose={() => setContentError(false)} dismissible><Alert.Heading>Error</Alert.Heading>{errorMessage}</Alert>}
                <form>
                    <div style={{ fontSize: "12px" }}>All the fields marked with a <strong style={{ color: 'red' }}>*</strong> are mandatory</div>
                    <br style={{ lineHeight: "1px" }} />
                    <div className='form-group required'>
                        <label htmlFor="title" className='control-label'>Project Title <span style={{ fontSize: "12px" }}>(max 50 characters)</span></label>
                        <input id="title" required type='text' className='form-control' maxLength='50' placeholder="Project Title" onChange={(e) => setTitle(e.target.value)} value={title} />
                    </div>
                    <br />
                    <div className='form-group required'>
                        <label htmlFor="description" className='control-label'>Give a description of your Project <span style={{ fontSize: "12px" }}>(max 300 characters)</span></label>
                        <textarea id="description" type='text' rows='4' maxLength='300' className='form-control' placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} required></textarea>
                    </div>
                    <div className='form-group required'>
                        <label htmlFor="name" className='control-label'>Enter your name </label>
                        <input id="name" type='text' required className='form-control' maxLength='50' placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div className='form-group required'>
                        <label htmlFor="postcode" className='control-label'>Enter your postcode</label>
                        <input id="postcode" pattern="^[0-9]{4}$" type='text' className='form-control' placeholder="Postcode" onChange={handlePostcodeChangeEvent} value={postcode} required />
                    </div>
                    <button className='btn-lg btn-primary' onClick={addProjectRequest}>Submit</button>
                </form>
                <br />
                <br />
            </div>
            {content}
        </Container>
    )
}