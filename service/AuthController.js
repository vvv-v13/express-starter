import web from "express-decorators"
import jwt from "jsonwebtoken"

import Promise from "bluebird";
import crypto from "crypto";

import _ from "lodash"


@web.controller("/api/auth")
export default class AuthController {

    @web.post("/")
    async list(request, response) {
        const database = request.app.get("sql-db");
        const accounts = database.table("accounts");
        const jwtSecret = "my_big_secret";
        const jwtExpire = "12h";

        request.check("email").notEmpty();
        request.check("password").notEmpty();

        let errors = request.validationErrors(true);
        if (!_.isEmpty(errors || undefined)) {
            response.status(400);
            return response.send({ errors });
        }

        let email = request.sanitize("email").trim();
        let password = request.sanitize("password").trim();


        const columns = ["id", "email", "password"];

        let records = await accounts
            .select(columns)
            .where({ email })
            .limit(1);

        if (records.length === 0) {
            response.status(401);
            return response.send({});
        }

        let account = records[0];

        const hashParams = account.password.split("$");
        const salt = hashParams[1];
        const dbPasswordHash = hashParams[2];

        const pcrypto = Promise.promisifyAll(crypto);
        const key = await pcrypto.pbkdf2Async(password, salt, 1000, 20, 'sha1');
        const passwordHash = key.toString('hex');

        if (passwordHash !== dbPasswordHash) {
            response.status(401);
            return response.send({});
        }

        const payload = {
            id: account.id,
        }

        const token = jwt.sign(account, jwtSecret, {
            expiresIn: jwtExpire
        });

        response.send({ token });
    }

}
