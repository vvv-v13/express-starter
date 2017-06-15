import _ from "lodash"
import log from "winston"
import assert from "assert"
import request from "supertest"

import {service} from "../service"

log.level = "error";

describe( `AuthController`, () => {
    it("/api/auth Check request params", done => {
        const endpoint = request(service)
            .post("/api/auth")
            .send({email: "test@email.com"})
            .end((error, response) => {
                assert(_.isObject(response.body));
                assert.equal(400, response.statusCode);
                return done();
            });
    });

    it("/api/auth Authorization with valid credentials", done => {
        const endpoint = request(service)
            .post("/api/auth")
            .send({email: "test@email.com", password: "123456"})
            .end((error, response) => {
                assert(_.isObject(response.body));
                assert(_.isString(response.body.token));
                assert.equal(200, response.statusCode);
                return done();
            });
    });

    it("/api/auth Ignore Authorization with invalid credentials", done => {
        const endpoint = request(service)
            .post("/api/auth")
            .send({email: "test@email.com", password: "123"})
            .end((error, response) => {
                assert(_.isObject(response.body));
                assert.equal(401, response.statusCode);
                return done();
            });
    });         
});
