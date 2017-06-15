import _ from "lodash"
import log from "winston"
import assert from "assert"
import jwt from "jsonwebtoken"
import request from "supertest"

import {service, jwtSecret} from "../service"


log.level = "error";

describe( `CarsController`, () => {
    it("Should respond to /api/cars", done => {
        const account = { id: "id" };
        const webToken = jwt.sign(account, jwtSecret);
        const endpoint = request(service).get("/api/cars");
        endpoint.set("Authorization", `Bearer ${webToken}`);
        endpoint.end((error, response) => {
            assert(_.isObject(response.body));
            assert.equal(200, response.statusCode);
            return done();
        });
    });
});
