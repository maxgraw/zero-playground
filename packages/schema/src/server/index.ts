import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: text().primaryKey(),
	email: text().notNull().unique(),
	password_hash: text().notNull(),
});
