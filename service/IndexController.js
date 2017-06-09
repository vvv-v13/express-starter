import web from "express-decorators"

import { service, component } from "."


@web.controller("/")
export default class IndexController {

    @web.get("/")
    async index(request, response) {
        response.send({message: "Say hello"});
    }
}
