import React, { useState, useEffect } from "react";
import { Container } from 'react-bootstrap';
import PendingProject from "./pendingProject";
import Pagination from './Pagination';

export default function Admin(props) {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage, setProjectsPerPage] = useState(6);

    useEffect(() => {
        fetch("http://localhost:4000/projects/status/pending")
            .then((response) => response.json())
                .then((json) => {
                    setProjects(json);
                    setLoading(false);
                }
                )}, []);

    function getIndexOfLastproject() {
        return currentPage * projectsPerPage;
    }

    function getIndexOfFirstproject() {
        return getIndexOfLastproject() - projectsPerPage;
    }

    return (
        <Container className="pt-4">
            <h2>Project Administration</h2>
            <br />
            <p>The following projects need to be verified for eligibility. Please review each project and check if it meets the guidelines. If so, approve the project. If it does not meet eligibility guidelines, the project should be declined.</p>
            <h3>There are {projects.length} pending projects</h3>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {projects.length > 0 &&
                    <div>
                        <Pagination projectsPerPage={projectsPerPage} totalprojects={projects.length} paginate={setCurrentPage} />
                        <PendingProject loading={loading} projects={projects.slice(getIndexOfFirstproject(), getIndexOfLastproject())} />
                        <Pagination projectsPerPage={projectsPerPage} totalprojects={projects.length} paginate={setCurrentPage} />
                    </div>
                }
            </div>
        </Container>
    )
}