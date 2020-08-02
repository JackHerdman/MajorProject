import React from 'react';
import './App.css';
import ListProjects from "./components/ListProjects";
import SubmitProject from "./components/SubmitProject";
import Results from "./components/Results";
import Admin from "./components/Admin";
import logo from "./img/waratah-logo.png"
import swings from "./img/swings.jpg"
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import "./index.css";

export default function App() {

  return (
    <div className="content" >
      <Router >
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top" style={{ color: "#343a40" }}>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <img src={logo} width="60px" backgound="transparent" height="auto" alt="NSW Government Logo small" /><h1>Local NSW Projects</h1>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/" >Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/list-projects">Vote on Projects</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/submit-project">Submit a New Project</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/results">View Voting Results</Link>
              </li>
            </ul>
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/list-projects">
            <ListProjects />
          </Route>
          <Route exact path="/submit-project">
            <SubmitProject />
          </Route>
          <Route exact path="/results">
            <Results />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
        </Switch>
      </Router>
   
    </div >
  );
}

function Home() {
  return (
    <div className="d-flex justify-content-start-fluid" style={{ flexGrow: 1, justifyContent: "center", alignItems: "center", width: "100%", backgroundImage: `url(${swings}`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
      <div>
        <div style={{ width: "1250px", padding: "50px 150px", backgroundColor: `rgba(${255}, ${255}, ${255}, ${0.7})`, fontSize: "18px" }}>
          <p>Each year the NSW government provides funding through the NSW Generations Fund for projects in the local
          community. Submissions for projects are welcomed from people in local NSW communities. Each submission
   wil then compete alongside other eligible projects for funding.</p>
          <p>The local community can contribute their ideas and have their say in the decision-making process via an online voting process.</p>
          <p>In the menu's above you can view a list of projects that will allow you to vote on the project you believe
   is the most deserving. You can also see the current forerunners by viewing the results.</p>
          <p>If you believe you have an eligible project that will benefit your local community please submit your idea above. </p>
        </div>
      </div>
    </div>
  )
}
