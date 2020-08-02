const { describe } = require('mocha');
const { expect } = require('chai');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require("../Server/server");
let should = chai.should();

chai.use(chaiHttp);

describe('/GET projects', () => {
    it('it should GET all the projects', (done) => {
        chai.request(server)
            .get('/projects')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
    it('it should GET all pending projects', (done) => {
        chai.request(server)
            .get('/projects/pending')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
   


});


describe(' POST request', () => {
    it('it should post data sucussfully and return status code 201', (done) => {
        let project = {
            title: "Playground",
            description: "children can play",
            name: "Freda",
            postcode: 2070
        }
        chai.request(server)
            .post('/projects')
            .send(project)
            .end((err, res) => {
                res.body.should.have.property('status',201);
                res.body.data.should.have.property('title');
                res.body.data.should.have.property('description');
                res.body.data.should.have.property('name');
                res.body.data.should.have.property('postcode');
                res.body.data.should.have.property('id');
                res.body.data.should.have.property('status', 'pending')
                res.body.data.should.have.property('voteCount', 0);
                done();
            });
    });

    it('it should not post data if  title field is not passed', (done) => {
        let project = {
            description: "children can play",
            name: "Freda",
            postcode: 2070
        }
        chai.request(server)
            .post('/projects')
            .send(project)
            .end((err, res) => {
                res.should.have.status(400);
                if (err) return done(err);
                done();
            });
    });
    it('it should not post data if description field is not passed', (done) => {
        let project = {
            title: "play ground",
            name: "Freda",
            postcode: 2070
        }
        chai.request(server)
            .post('/projects')
            .send(project)
            .end((err, res) => {
                res.should.have.status(400);
                if (err) return done(err);
                done();
            });
    });
    it('it should not post data if name field  is not passed', (done) => {
        let project = {
            description: "children can play",
            title: 'playground',
            postcode: 2070
        }
        chai.request(server)
            .post('/projects')
            .send(project)
            .end((err, res) => {
                res.should.have.status(400);
                if (err) return done(err);
                done();
            });
    });
    it('it should not post data if postcode is not passed', (done) => {
        let project = {
            title: 'play ground',
            description: "children can play",
            name: "Freda",
        }
        chai.request(server)
            .post('/projects')
            .send(project)
            .end((err, res) => {
                res.should.have.status(400);
                if (err) return done(err);
                done();
            });
    });
    it('it should not post data if tiltle field is longer than 50cahracters', (done) => {
        let project = {
            title: "PlaygroundPlaygroundPlaygroundPlaygroundPlaygroundPlaygroundPlayground",
            description: "children can play",
            name: "Freda",
            postcode: 2070
        }
        chai.request(server)
            .post('/projects')
            .send(project)
            .end((err, res) => {
                res.should.have.status(400);
                if (err) return done(err);
                done();
            });
    });
    it('it should not post data if postcode starts with 2 but longer than 4 characters ', (done) => {
        let project = {
            title: "Playground",
            description: "children can play",
            name: "Freda",
            postcode: 20700
        }
        chai.request(server)
            .post('/projects')
            .send(project)
            .end((err, res) => {
                res.should.have.status(400);
                if (err) return done(err);
                done();
            });
    });
    it('it should not post data if postcode is 4 character long but not starting with 2', (done) => {
        let project = {
            title: "Playground",
            description: "children can play",
            name: "Freda",
            postcode: 7040
        }
        chai.request(server)
            .post('/projects')
            .send(project)
            .end((err, res) => {
                res.should.have.status(400);
                if (err) return done(err);
                done();
            });
    });
    it('it should not post data if postcode starts with 2 but less than  4 character', (done) => {
        let project = {
            title: "Playground",
            description: "children can play",
            name: "Freda",
            postcode: 207
        }
        chai.request(server)
            .post('/projects')
            .send(project)
            .end((err, res) => {
                res.should.have.status(400);
                if (err) return done(err);
                done();
            });
    });
    it('it should not post data if name is longer than 50characters', (done) => {
        let project = {
            description: "children can play",
            name: "FredakhgkgdvkvuwvbkjwbvuwrvbwjkrbvwrvbjbrvhgjhFreda",
            postcode: 2070
        }
        chai.request(server)
            .post('/projects')
            .send(project)
            .end((err, res) => {
                res.should.have.status(400);
                if (err) return done(err);
                done();
            });
    });

});

describe('/PUT projects ', () => {
    it('it should  not update status of project if it has value other than"approve,declined,pending ', (done) => {
        let project = {
            status: "anythingelse"
        }
        chai.request(server)
            .put('/projects/status/bb752be6-c130-4494-8562-b8d7b87f8ab0')
            .send(project)
            .end((err, res) => {
                res.should.have.status(400);
                if (err) return done(err);
                done();
            });
    });

    it('it should update vote property to  icrement by 1 ', (done) => {
        chai.request(server)
            .put('/projects/vote/bb752be6-c130-4494-8562-b8d7b87f8ab0')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.have.property('voteCount', ++res.body.data.voteCount)
                done();
            });
    });

});

