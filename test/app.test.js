import chai from 'chai';
import { describe, it } from 'mocha'
import chaiHttp from 'chai-http';
import app from '../src/server';

chai.use(chaiHttp);
chai.should();


describe("App", () => {
    it("Should connect to the server", (done) => {
        chai.request(app)
            .get("/")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it("should handle all unknown error cases", (done) => {
        chai.request(app)
            .get("/unkownurl")
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});