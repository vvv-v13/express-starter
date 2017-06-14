import log from "winston"
import moment from "moment"

export async function seed(knex) {
    let sid, tid, oip, pip;
    log.info("seeding servers table");
    const table = knex.table("cars");
    await table.truncate(); // reset the table

    await table.insert({
        id: 1,
        mark: "Honda",
        model: "Civic",
        created: moment().toDate(),
    });

    await table.insert({
        id: 2,
        mark: "Honda",
        model: "CR-Z",
        created: moment().toDate(),
    });
}
