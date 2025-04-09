// src/middleware/authorize.ts

import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authorize = (roles: string[]) => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		const userId = res.locals.user;
		const user = await prisma.user.findUnique({ where: { id: userId } });

		if (!user || !roles.includes(user.role)) {
			res.status(403).json({ message: "Forbidden" });
			return;
		}

		next();
	};
};
