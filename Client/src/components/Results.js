import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ResultProject from "./ResultProject";
import Pagination from './Pagination';

export default function Results() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage, setProjectsPerPage] = useState(6);

    useEffect(() => {
        fetch("http://localhost:4000/projects/status/approved")
            .then((response) => response.json())
            .then((json) => {
                setProjects(json);
                setLoading(false);
            });
    }, []);

    function getIndexOfLastproject() {
        return currentPage * projectsPerPage;
    }

    function getIndexOfFirstproject() {
        return getIndexOfLastproject() - projectsPerPage;
    }
    let sortedProjects = projects.sort((a, b) => b.voteCount - a.voteCount);

    return (
        <Container className="pt-4">
            <h2>Current Voting Results</h2>
            <p>We are pleased to show you the projects that are currently in the lead! The projects are listed in descending order with the projects with the most vote at the top.</p>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {sortedProjects.length > 0 &&
                    <div>
                        <Pagination projectsPerPage={projectsPerPage} totalprojects={sortedProjects.length} paginate={setCurrentPage} />
                        <ResultProject loading={loading} projects={sortedProjects.slice(getIndexOfFirstproject(), getIndexOfLastproject())} />
                        <Pagination projectsPerPage={projectsPerPage} totalprojects={sortedProjects.length} paginate={setCurrentPage} />
                    </div>
                }
            </div>
        </Container>
    )
}