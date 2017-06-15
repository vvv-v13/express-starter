import web from "express-decorators"

import { requireAccount } from "../library/access"


@web.controller("/api/cars")
export default class CarsController {

    @web.get("/")
    @web.middleware(requireAccount)
    async list(request, response) {
        const database = request.app.get("sql-db");
        const cars = database.table("cars");

        let columns = ["id", "mark", "model"];
        let records = await cars
            .select(columns)
            .orderBy("mark");

        response.send(records);
    }
}
