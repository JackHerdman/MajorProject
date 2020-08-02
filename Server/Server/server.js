const express = require('express');
const storage = require('node-persist');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const server = express();
(async () => {

    server.use(cors());
    server.use(express.json());
    server.use(bodyParser.json());
    const port = 4000;

    await storage.init({ dir: "./data" });


    server.post("/projects", async (request, response) => {
        try {
            if (request.body.title == undefined || request.body.description == undefined || request.body.name == undefined || request.body.postcode == undefined) {
                return response.status(400).json('project cannot be submitted -All the fields must contain a value');
            }
            if (request.body.title == "" || request.body.description == "" || request.body.name == "" || request.body.postcode == "") {
                return response.status(400).json('project cannot be submitted -All the fields must contain a value');
            }
            let title, description, name, postcode;
            if (request.body.title.length > 51) {
                return response.status(400).json('project cannot be submitted ,As Title is more than 50 characters');

            } else {
                title = request.body.title.trim();
            }
            if (request.body.description.length > 301) {
                return response.status(400).json("project cannot be submitted ,As Description is more than 300 characters")
            } else {
                description = request.body.description.trim();
            }

            if (request.body.name.length > 51) {
                return response.status(400).json("project cannot be submitted ,As Name is more than 50 characters")
            } else {
                name = request.body.name.trim();
            }

            if (request.body.postcode.toString().length === 4 && request.body.postcode.toString()[0] === "2") {
                postcode = request.body.postcode;
            } else {
                return response.status(400).json("project cannot be submitted ,As The postcode is not a valid NSW postcode");
            }


            let projectToAdd = {
                id: uuidv4(),
                title,
                description,
                name,
                postcode,
                status: 'pending',
                voteCount: 0
            };
            await storage.setItem(`project-${projectToAdd.id}`, projectToAdd);
            response.json({ status: 201, data: projectToAdd });

        }
        catch (error) {
            response.json({ status: 500, message: error.message });
        }
    })


    server.get("/projects/:id", async (request, response) => {
        try {
            let id = request.params.id;
            if (id == undefined) {
                return response.status(400).json('cannot update as Id is undefined');
            }
            let projects = await storage.valuesWithKeyMatch(/project-/);
            response.status(200);
            response.json(projects);
        }
        catch (error) {
            response.json({ status: 500, message: error.message });
        }
    })
    server.get("/projects/status/approved", async (request, response) => {
        try {
            let projects = await storage.valuesWithKeyMatch(/project-/);
            let approvedProjects = projects.filter((p) => p.status === "approved")
            response.status(200);
            response.json(approvedProjects);
        }
        catch (error) {
            response.json({ status: 500, message: error.message });
        }
    })
    server.get("/projects/status/pending", async (request, response) => {
        try {
            let projects = await storage.valuesWithKeyMatch(/project-/);
            let pendingProjects = projects.filter((p) => p.status == "pending");
            response.status(200).json(pendingProjects);
        }
        catch (error) {
            response.json({ status: 500, message: error.message });
        }
    })
    server.put("/projects/status/:id", async (request, response) => {
        try {
            let id = request.params.id;
            if (id == undefined) {
                return response.status(400).json('cannot update as Id is undefined');
            }
            let project = await storage.getItem(`project-${id}`);
            if (request.body.status == 'pending') {
                project.status = 'pending';
            }
            else if (request.body.status == 'approved') {
                project.status = 'approved';
            }
            else if (request.body.status == 'declined') {
                project.status = 'declined';
            }
            else {
                return response.status(400).json('invalid status');
            }
            await storage.updateItem(`project-${id}`, project);
            response.json({ project, status: 200 });
        }
        catch (error) {
            response.json({ status: 500, message: error.message });
        }
    })
    server.put("/projects/vote/:id", async (request, response) => {
        try {
            let id = request.params.id;
            if (id == undefined) {
                return response.status(400).json({ message: 'cannot update as Id is undefined' });
            }
            let project = await storage.getItem(`project-${id}`);
            ++project.voteCount;
            let result = await storage.updateItem(`project-${id}`, project);
            response.json({ data: result.content.value, status: 200, message: 'Thank you for your vote-NSW government' });
        }
        catch (error) {
            response.json({ status: 500, message: error.message });
        }
    })
    server.listen(port, () => {
        console.log("server is running" + port);
    })

})();
module.exports = server;