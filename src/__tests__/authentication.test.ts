import request from "supertest";
import createServer from "../server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = createServer();

const mockUser = {
	id: 1,
	username: "testuser",
	email: "test@example.com",
	password: "testpassword",
};

describe("Authentication Endpoints", () => {
	describe("Register User Endpoint", () => {
		it("should return a JWT for valid credentials", async () => {
			// Mock Prisma's create method
			//@ts-ignore
			prisma.user.create.mockResolvedValue(mockUser);

			const response = await request(app)
				.post("/authentication/register")
				.send({
					username: "testuser",
					email: "test@example.com",
					password: "testpassword",
				});

			expect(response.status).toBe(200);
			expect(response.body.token).toBeDefined();
		});

		it("should return 400 for missing username", async () => {
			const response = await request(app)
				.post("/authentication/register")
				.send({
					email: "test@example.com",
					password: "testpassword",
				});

			expect(response.status).toBe(400);
		});
	});

	describe("Login User Endpoint", () => {
		it("should login the user with valid credentials", async () => {
			//@ts-ignore
			prisma.user.findUnique.mockResolvedValue(mockUser);

			const response = await request(app).post("/authentication/login").send({
				email: "test@example.com",
				password: "testpassword",
			});

			expect(response.status).toBe(200);
			expect(response.body.token).toBeDefined();
		});

		it("should return 400 for invalid credentials", async () => {
			//@ts-ignore
			prisma.user.findUnique.mockResolvedValue(null);

			const response = await request(app).post("/authentication/login").send({
				email: "test@example.com",
				password: "wrongpassword",
			});

			expect(response.status).toBe(400);
		});
	});
});
