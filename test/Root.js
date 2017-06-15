import _ from "lodash"
import log from "winston"
import assert from "assert"
import request from "supertest"

import {service} from "../service"

log.level = "error";

describe( `RootController`, () => {
    it("Should respond to /", done => {
        const endpoint = request(service).get("/");
        endpoint.end((error, response) => {
            assert(_.isObject(response.body));
            assert.equal(200, response.statusCode);
            return done();
        });
    });
});
