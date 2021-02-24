import chai from 'chai';
import { describe, it } from 'mocha'
import faker from 'faker'
import chaiHttp from 'chai-http';
import app from '../../src/server';
import db from "../../src/database/models/index"
import helpers from '../../src/utils/helpers';

chai.use(chaiHttp);
chai.should();



describe("GET One Todo Item", () => {
    before(async () => {

        await db.User.create({
            name: "crispy",
            email: "crispy@mail.com",
            password: "123"
        })

        await db.Todo.create({
            title: "Item 1",
            description: "Item Item",
            priority: "HIGHT",
            userId: 1
        })
    });

    after(async () => {
        await db.User.truncate();
        await db.Todo.truncate();
    })

    it("Should return one Item based on the Id", (done) => {
        chai.request(app)
            .get('/api/v1/todos/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.an('object');
                done();
            });
    })
});


describe("POST Create a todo Item", () => {
    let token;
    let title = faker.name.firstName();
    before(async () => {
        token = helpers.createToken(1, "crispy@mail.com", "crispy");
        await db.User.create({
            name: "crispy",
            email: "crispy@mail.com",
            password: "123"
        })
    });

    after(async () => {
        await db.User.truncate();
    });


    it("Should not save if all fields are missng", (done) => {
        chai.request(app)
            .post("/api/v1/todos/")
            .send({})
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.an('object');
                done();
            })
    })

    it("Should not save if all priority is missng", (done) => {
        chai.request(app)
            .post("/api/v1/todos/")
            .send({
                title: faker.name.findName,
                description: faker.name.jobDescriptor
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.an('object');
                done();
            })
    })
    it("Should not save if title is missng", (done) => {
        chai.request(app)
            .post("/api/v1/todos/")
            .send({
                priority: "HIGH",
                description: faker.name.jobDescriptor
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.an('object');
                done();
            })
    })
    it("Should not save if description is missng", (done) => {
        chai.request(app)
            .post("/api/v1/todos/")
            .send({
                title: faker.name.findName,
                priority: "HIGH"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.an('object');
                done();
            })
    })

    it("Should not save if token is missng", (done) => {
        chai.request(app)
            .post("/api/v1/todos/")
            .send({
                title: faker.name.findName,
                description: faker.name.jobDescriptor(),
                priority: "HIGH"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.an('object');
                done();
            })
    })

    it("Should save if token and required fields are available", (done) => {
        chai.request(app)
            .post("/api/v1/todos/")
            .send({
                title,
                description: faker.name.jobDescriptor(),
                priority: "HIGH"
            })
            .set("Authorization", token)
            .end((err, res) => {
                console.log(res.text);
                res.should.have.status(201);
                res.should.be.an('object');
                done();
            })
    })

    it("Should save if title already exist", (done) => {
        chai.request(app)
            .post("/api/v1/todos/")
            .send({
                title,
                description: faker.name.jobDescriptor(),
                priority: "HIGH"
            })
            .set("Authorization", token)
            .end((err, res) => {
                console.log(res.text);
                res.should.have.status(400);
                res.should.be.an('object');
                done();
            })
    })
})