import { drizzle } from "drizzle-orm/bun-sql";
import { migrate } from "drizzle-orm/bun-sql/migrator";
import { sql, SQL } from "bun";

if (!process.env.MIGRATIONS_FOLDER_PATH) {
	throw new Error("Missing MIGRATIONS_FOLDER_PATH variable");
}

if (!process.env.ZERO_UPSTREAM_DB) {
	throw new Error("Missing ZERO_UPSTREAM_DB variable");
}

const db = drizzle(process.env.ZERO_UPSTREAM_DB, {});

const abc = await migrate(db, {
	migrationsFolder: process.env.MIGRATIONS_FOLDER_PATH,
});

const test = new SQL({
	url: "postgresql://user:password@127.0.0.1:5430/zstart",

	hostname: "127.0.0.1",
	port: 5430,
	database: "zstart",
	username: "user",
	password: "password",
});

const migrations_query = await test`
    SELECT COUNT(*)
    FROM drizzle.__drizzle_migrations;
`.values();

const migrations_count = Number.parseInt(migrations_query[0]);

const zero_query = await test`
    SELECT *
    FROM zero."schemaVersions";
`.values();

const minSupportedVersion = zero_query[0][0];

const maxSupportedVersion = zero_query[0][1];

if (maxSupportedVersion === migrations_count) {
	process.exit();
}

if (maxSupportedVersion < migrations_count) {
	await test`
	UPDATE zero."schemaVersions"
	SET "maxSupportedVersion" = ${migrations_count};
    `;
}
