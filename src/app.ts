import express from "express";
import passport from "passport";

import dotenv from "dotenv";
import articlesRouter from "./modules/articles/articles.routes";
import authenticationRoutes from "./modules/authentication/authentication.routes";
import authorizationRoutes from "./modules/authorization/authorization.routes";
import googleAuthRouter from "./modules/authentication/googleAuth.routes";
import "./modules/authentication/passport"; // Import the Passport configuration

dotenv.config(); // Loads variables from .env into process.env

const app = express();

app.use(express.json());
app.use(passport.initialize()); // Initialize Passport

app.get("/healthcheck", (_req, res) => {
	res.send("API is up and running!");
});

app.use("/authentication", authenticationRoutes);
app.use("/authentication", googleAuthRouter);
app.use("/authorization", authorizationRoutes);
app.use("/articles", articlesRouter);

app.listen(3000, () => {
	console.log("App is running!");
});
