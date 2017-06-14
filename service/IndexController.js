import web from "express-decorators"

import { service, component } from "."


@web.controller("/")
export default class IndexController {

    @web.get("/")
    async index(request, response) {
        response.send({message: "Say hello"});
    }

    @web.get("/cars")
    async list(request, response) {
        const database = request.app.get("sql-db");
        const cars = database.table("cars");

        let columns = ["id", "mark"];
        let records = await cars
            .select(columns)
            .orderBy("mark");

        response.send(records);
    }
}
