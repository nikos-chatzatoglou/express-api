import express from "express";

const app = express();

app.use(express.json());

// Healthcheck route
app.get("/healthcheck", (_req, res) => {
	res.send("API is up and running!");
});

app.listen(3000, "0.0.0.0", () => {
	console.log("Server is running on http://localhost:3000");
});
