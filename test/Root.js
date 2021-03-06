import _ from "lodash"
import log from "winston"
import assert from "assert"
import jwt from "jsonwebtoken"
import request from "supertest"

import {service, jwtSecret} from "../service"


log.level = "error";

describe( `RootController`, () => {
    it("Should respond to /", done => {
        const endpoint = request(service).get("/");
        endpoint.end((error, response) => {
            assert(_.isObject(response.body));
            assert(_.isString(response.body.message));
            assert.equal(200, response.statusCode);
            return done();
        });
    });

    it("Should respond to /private", done => {
        const account = { id: "id" };
        const webToken = jwt.sign(account, jwtSecret);
        const endpoint = request(service).get("/private");
        endpoint.set("Authorization", `Bearer ${webToken}`);
        endpoint.end((error, response) => {
            assert(_.isObject(response.body));
            assert(_.isString(response.body.message));
            assert.equal(200, response.statusCode);
            return done();
        });
    });
});
