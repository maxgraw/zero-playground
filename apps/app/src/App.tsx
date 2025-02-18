import { useZero, useQuery } from "@rocicorp/zero/react";

import type { Schema } from "schema/client";

function App() {
	const z = useZero<Schema>();

	const [users] = useQuery(z.query.users);

	const handle_insert = async () => {
		z.mutate.users.upsert({
			id: crypto.randomUUID(),
			first_name: "Max",
			last_name: "Samuel",
		});
	};

	return (
		<>
			<button type="button" onClick={handle_insert}>
				Submit
			</button>
			<pre>{JSON.stringify(users, null, 2)}</pre>
		</>
	);
}

export default App;
