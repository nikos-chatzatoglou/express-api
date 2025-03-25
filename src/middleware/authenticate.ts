import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authenticate = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.log("authenticate");
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) {
		// Return early if no token is provided
		res.status(401).json({ message: "No token provided" });
		return;
	}

	try {
		const decoded = jwt.verify(token, "your-secret-key");
		if (typeof decoded !== "string" && "id" in decoded) {
			// Attach the user ID to `res.locals` and proceed

			res.locals.user = (decoded as JwtPayload).id;
			next();
		} else {
			// If the token is invalid
			res.status(401).json({ message: "Invalid token" });
		}
	} catch (error) {
		// Catch errors during token verification
		res.status(401).json({ message: "Invalid token" });
	}
};
