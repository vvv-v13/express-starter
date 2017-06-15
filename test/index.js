import log from "winston"
import {migrate, database} from "../service"
import knexCleaner from "knex-cleaner"

log.level = "error";


const options = {
    mode: "delete", // Valid options "truncate", "delete"
    ignoreTables: ["knex_migrations", "knex_migrations_lock"]
}

before(async () => await knexCleaner.clean(database, options));
before(async () => await migrate);
before(async () => await database.seed.run());

after(async () => await knexCleaner.clean(database, options));
