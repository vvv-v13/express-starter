import _ from "lodash"
import log from "winston"


export function requireAccount(request, response, next) {
    let account_id = _.get(request, "account.id");
    if (_.isEmpty(account_id)) {
        let reason = "authorize yourself via login";
        log.warn("unauthorized access attempt");
        response.status(401);
        return response.send({ reason });            
    };
    return next();
}

