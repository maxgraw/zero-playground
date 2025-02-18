import { defineConfig } from "drizzle-kit";

if (!process.env.ZERO_UPSTREAM_DB) {
	throw new Error("missing ZERO_UPSTREAM_DB");
}

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/server/index.ts",
	out: "./drizzle",
	dbCredentials: {
		url: process.env.ZERO_UPSTREAM_DB,
	},
	migrations: {
		schema: "public",
	},
});
