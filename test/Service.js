import _ from "lodash"
import log from "winston"
import assert from "assert"
import request from "supertest"

import { service, database } from "../service"

log.level = "error";

describe( `Service`, () => {
    it("should recognize 404 requests", done => {
        const endpoint = request(service).post("/132");
        endpoint.end((error, response) => {
            assert.equal(404, response.statusCode);
            assert(_.isString(response.body.error));
            return done();
        });
    });

    it("should have SQL database up", async () => {
        const columns = ["id", "name", "batch"]
        const migrate = database.table("knex_migrations");
        let row = await migrate.first(columns).orderBy("id");
        assert.equal(1, row.batch, "incorrect batch number");
        assert.equal(1, row.id, "missing first migration");
        assert.equal("001-initialize.js", row.name || 0);
    });
});
