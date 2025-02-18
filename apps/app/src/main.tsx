import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ZeroProvider } from "@rocicorp/zero/react";
import { Zero } from "@rocicorp/zero";

import { schema } from "schema/client";

const z = new Zero({
	userID: "1",
	server: import.meta.env.VITE_PUBLIC_SERVER,
	schema,
	kvStore: "idb",
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ZeroProvider zero={z}>
			<App />
		</ZeroProvider>
	</StrictMode>,
);
