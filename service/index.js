import os from "os"
import fs from "fs"
import http from "http"

import express from "express"
import expressWinston from "express-winston"
import compression from "compression"
import log from "winston"


import load from "../library/load"

export const controllers = [];
export const component = module.exports || {};
export const env = process.env.NODE_ENV || "develop";


log.info(`booting a component on ${os.hostname()}`);
log.info(`${component.name} @ ${component.version}`);
log.info(`configured ${env} as NODE_ENV environment`);

export const service = express();

service.use(compression());

service.use(expressWinston.logger({
    winstonInstance: log,
    expressFormat: true,
    colorize: true,
}));

const tsFormat = () => (new Date()).toLocaleString();

log.remove(log.transports.Console).add(log.transports.Console, {
    humanReadableUnhandledException: true,
    handleExceptions: true,
    colorize: true,
    timestamp: tsFormat,
});


// this will load all controllers in the service/ directory via the
// require-all library; those must be named as *Controller.js files;
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

