import log from "winston"

export async function up(knex) {
    log.info("Creating cars table");
    await knex.schema.createTable("cars", (table) => {
        table.string("id").primary();
        table.string("mark").nullable();
        table.string("model").nullable();
        table.timestamp("created").nullable();
    })
}

export async function down(knex) {
    log.info("Removing cars table");
    await knex.schema.dropTable("cars");
}
