import log from "winston"
import assert from "assert"

export async function up(knex) {
    log.info("creating initial SQL structure");
}

export async function down(knex) {
    log.info("removing initial SQL structure");
}
