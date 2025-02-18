import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { decode, sign, verify } from "hono/jwt";

export const app = new Hono();

app.get("/login", async (c) => {
	const payload = {
		sub: "user123",
		exp: Math.floor(Date.now() / 1000) + 60 * 5,
	};

	const secret = "mySecretKey";

	const token = await sign(payload, secret);

	setCookie(c, "jwt", token);

	return c.text("ok");
});

export default {
	port: 1717,
	fetch: app.fetch,
};
