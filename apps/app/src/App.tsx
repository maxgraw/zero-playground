import { useZero, useQuery } from "@rocicorp/zero/react";

import type { Schema } from "schema/client";

function App() {
	const z = useZero<Schema>();

	const [users] = useQuery(z.query.user);

	const handle_insert = async () => {
		z.mutate.user.upsert({
			id: crypto.randomUUID(),
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
