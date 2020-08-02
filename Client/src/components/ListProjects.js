import React, { useEffect, useState } from "react";
import VoteForProject from "./VoteForProject";
import { Container } from "react-bootstrap";
import Pagination from './Pagination';

export default function ListProjects() {
    const[projects,setProjects]=useState([]);
    const[loading,setLoading]=useState(true);
    const[currentPage,setCurrentPage]=useState(1);
    const [projectsPerPage, setProjectsPerPage] = useState(6);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:4000/projects/status/approved")
            .then((response) => response.json())
            .then((json) => {          
                setProjects(json);
                setLoading(false);
            });           
    },[]);

    function getIndexOfLastproject(){
        return currentPage*projectsPerPage; 
    }

    function getIndexOfFirstproject(){
        return getIndexOfLastproject() - projectsPerPage;
    }
    
    return (
        <Container className="pt-4">
            <h2>Projects</h2>
            <p>Please browse through all of the projects below and vote for which one you believe should be granted funding.</p>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
               {projects.length > 0 &&
                <div>
                    <Pagination projectsPerPage={projectsPerPage} totalprojects={projects.length} paginate={setCurrentPage}/>
                    <VoteForProject  loading={loading}  projects={projects.slice(getIndexOfFirstproject(),getIndexOfLastproject())} />
                    <Pagination projectsPerPage={projectsPerPage} totalprojects={projects.length} paginate={setCurrentPage}/>
                </div>
               }               
            </div>
        </Container>
    )
}