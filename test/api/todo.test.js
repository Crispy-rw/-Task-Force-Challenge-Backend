import { it } from "mocha";
import chai, { request, expect } from "chai";
import http from "chai-http";
import faker from 'faker'
import TodosController from "../../src/controllers/todosController";
import db from "../../src/database/models";
import app from "../../src/server";
import helpers from "../../src/utils/helpers";

chai.use(http);

describe("API - Authentication ", async () => {
  const apiRoot = '/api/v1/';
  const API = {
    login: apiRoot + '/auth/login',
    register: apiRoot + '/auth/register'
  }

  describe(`POST ${API.login}`, async (done) => {
    request.post(API.login)
      .send({})
      .end((err, res) => {
        console.log(res);
        expect(res).to.have.status(400);
        expect(res.body).to.have.a.property("status", 400);
        done();
      });
  })

});
