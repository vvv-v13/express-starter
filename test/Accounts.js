import _ from "lodash"
import log from "winston"
import assert from "assert"
import request from "supertest"

import {service} from "../service"

log.level = "error";

describe( `AccountsController`, () => {
    it("/api/accounts Check request params", done => {
        const endpoint = request(service)
            .post("/api/accounts")
            .send({email: "test@email.com"})
            .end((error, response) => {
                assert(_.isObject(response.body));
                assert.equal(400, response.statusCode);
                return done();
            });
    });

    it("/api/accounts Add new account", done => {
        const endpoint = request(service)
            .post("/api/accounts")
            .send({email: "test@email.com", password: "123456"})
            .end((error, response) => {
                assert(_.isObject(response.body));
                assert.equal(200, response.statusCode);
                return done();
            });
    });

    it("/api/accounts Check duplicate in add account", done => {
        const endpoint = request(service)
            .post("/api/accounts")
            .send({email: "test@email.com", password: "123456"})
            .end((error, response) => {
                assert(_.isObject(response.body));
                assert.equal(409, response.statusCode);
                return done();
            });
    });
});
