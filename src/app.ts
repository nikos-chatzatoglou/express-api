import express from "express";

import articlesRouter from "./modules/articles/articles.routes";
import authenticationRouter from "./modules/authentication/authentication.routes";
import authorizationRouter from "./modules/authorization/authorization.routes";
const app = express();

app.use(express.json());

app.get("/healthcheck", (_req, res) => {
	res.send("API is up and running!");
});

app.use("/articles", articlesRouter);
app.use("/auth", authenticationRouter);
app.use("/authorization", authorizationRouter);

app.listen(3000, () => {
	console.log(`App is running!`);
});
