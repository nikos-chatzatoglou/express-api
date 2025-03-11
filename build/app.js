"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Healthcheck route
app.get("/healthcheck", (_req, res) => {
    res.send("API is up and running!");
});
app.listen(3000, "0.0.0.0", () => {
    console.log("Server is running on http://localhost:3000");
});
