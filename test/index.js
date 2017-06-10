import _ from "lodash"
import log from "winston"
import assert from "assert"
import request from "supertest"

import {service} from "../service"

log.level = "error";

describe( `IndexController`, () => {

    it("should respond to /", done => {
        const endpoint = request(service).get("/");
        endpoint.end((error, response) => {
            assert(_.isObject(response.body));
            assert(_.isString(response.body.message));
            assert.equal(200, response.statusCode);
            return done();
        });
    });

    it("should recognize 404 requests", done => {
        const endpoint = request(service).post("/132");
        endpoint.end((error, response) => {
            assert.equal(404, response.statusCode);
            assert(_.isString(response.body.error));
            return done();
        });
    });
});
