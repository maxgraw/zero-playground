import {
	createSchema,
	definePermissions,
	table,
	string,
	number,
	ANYONE_CAN,
	type Row,
} from "@rocicorp/zero";

const user = table("user")
	.columns({
		id: string(),
		email: string(),
	})
	.primaryKey("id");

export const schema = createSchema(1, {
	tables: [user],
	relationships: [],
});

export const permissions = definePermissions(schema, () => {
	return {
		user: {
			row: {
				insert: ANYONE_CAN,
				select: ANYONE_CAN,
			},
		},
	};
});

export type Schema = typeof schema;
export type User = Row<typeof schema.tables.user>;
