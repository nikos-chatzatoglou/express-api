import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// Swagger definition
const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "API Documentation",
		version: "1.0.0",
		description: "This is the API documentation for the Medium-like platform",
	},
	components: {
		schemas: {
			ValidationError: {
				type: "object",
				properties: {
					message: {
						type: "string",
						example: "Validation Error",
					},
					details: {
						type: "array",
						items: {
							type: "object",
							properties: {
								message: {
									type: "string",
									example: "Title is required",
								},
							},
						},
					},
				},
			},
			Authentication: {
				type: "object",
				properties: {
					token: {
						type: "string",
						example: "JWT Token",
					},
				},
			},
			RegisterUser: {
				type: "object",
				required: ["email", "username", "password"],
				properties: {
					email: {
						type: "string",
						example: "test@mail.com",
					},
					username: {
						type: "string",
						example: "testuser",
					},
					password: {
						type: "string",
						example: "testpassword",
					},
				},
			},
			LoginUser: {
				type: "object",
				required: ["email", "password"],
				properties: {
					email: {
						type: "string",
						example: "admin@example.com",
					},
					password: {
						type: "string",
						example: "adminpassword",
					},
				},
			},
		},
	},
};

const options = {
	swaggerDefinition,
	apis: ["./src/modules/**/*.routes.ts"], // Path to the API docs (for swagger-jsdoc to parse)
};

const swaggerSpec = swaggerJSDoc(options);

// Function to setup swagger docs in Express
export const setupSwaggerDocs = (app: Express) => {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

	console.log(`Swagger docs available at http://localhost:3000/api-docs`);
};
