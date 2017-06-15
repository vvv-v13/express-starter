import web from "express-decorators"
import _ from "lodash"
import moment from "moment"
import uuid from "node-uuid"

import Promise from "bluebird";
import crypto from "crypto";


@web.controller("/api/accounts")
export default class AccountsController {

    @web.post("/")
    async newAccount(request, response) {

        request.check("email").notEmpty();
        request.check("password").notEmpty();

        let errors = request.validationErrors(true);
        if (!_.isEmpty(errors || undefined)) {
            response.status(400);
            return response.send({ errors });
        }

        let email = request.sanitize("email").trim();
        let password = request.sanitize("password").trim();

        const database = request.app.get("sql-db");
        const accounts = database.table("accounts");

        const columns = ["id", "email"];

        let record = await accounts
            .select(columns)
            .where({ email: email })
            .first()
        ;
    
        if (!_.isEmpty(record)) {
            response.status(409);
            return response.send({});
        }

        let id = uuid.v4();
        let created = moment().toDate();

        // pbkdf2 password
        const alg = "sha1";
        const interations = 1000;
        const keyLen = 20;
        const saltLen = 8;

        const pcrypto = Promise.promisifyAll(crypto);
        let salt = await pcrypto.randomBytesAsync(saltLen);
        salt = salt.toString('hex');
        const key = await pcrypto.pbkdf2Async(password, salt, interations, keyLen, 'sha1');
        const passwordHash = key.toString('hex');

        password = `pbkdf2:${alg}:${interations}$${salt}$${passwordHash}`;
        console.log(password, passwordHash);

        record = await accounts
            .returning(["id"])
            .insert({
                id,
                email,
                created,
                password,
            });

        console.log(record);
        response.send(record);
    }

}
