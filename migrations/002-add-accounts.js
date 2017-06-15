import log from "winston"

export async function up(knex) {
    log.info("Creating accounts table");
    await knex.schema.createTable("accounts", (table) => {
        table.string("id").primary();
        table.string("email").nullable();
        table.string("password").nullable();
        table.timestamp("created").nullable();
    })
}

export async function down(knex) {
    log.info("Removing accounts table");
    await knex.schema.dropTable("accounts");
}
