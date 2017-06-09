import os from "os"
import fs from "fs"
import http from "http"

import express from "express"

import compression from "compression"
import log from "winston"

//import load from "express-decorators/load"

import load from "../library/load"



export const controllers = [];
export const component = module.exports || {};
export const env = process.env.NODE_ENV || "develop";


log.info(`booting a component on ${os.hostname()}`);
log.info(`${component.name} @ ${component.version}`);
log.info(`configured ${env} as NODE_ENV environment`);

export const service = express();

service.use(compression());


// this will load all controllers in the service/ directory via the
// require-all library; those must be named as *Controller.js files;
// please consult with require-all & express-decorators libraries for
// more information on how to customize this behavior if needs to be
load(service, {
    dirname: __dirname,
    resolve: function (exported) {
        let symbol = exported.default.name;
        log.debug(`loading controller ${symbol}`);
        let item = new exported.default(service);
        item.register && item.register(service);
        controllers.push(item)
        return item
    }
});

export const unsecuredServer = http.createServer(service);

for (let controller of controllers) {
    controller.wired && controller.wired(service);
}

var port = 8500;
if (require.main == module) {
    unsecuredServer.listen(port);
}
log.info(`Server started on ${port}`);

