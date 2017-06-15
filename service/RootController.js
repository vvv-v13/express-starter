import web from "express-decorators"

import { requireAccount } from "../library/access"


@web.controller("/")
export default class RootController {

    @web.get("/")
    async index(request, response) {
        response.send({message: "Say hello"});
    }

    @web.get("/private")
    @web.middleware(requireAccount)
    async private(request, response) {
        response.send({message: "Say secret hello"});
    }
}
