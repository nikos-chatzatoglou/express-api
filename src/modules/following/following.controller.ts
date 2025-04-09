import { Request, Response } from "express";

import {
	getFeedArticles,
	getFollowingUsers,
	followUser,
	unfollowUser,
} from "./following.service";
import { FollowUserType, FollowingFeedType } from "./following.schemas";

// Handler to get articles from followed users
export async function getFeedArticlesHandler(
	req: Request<{}, {}, {}, FollowingFeedType["query"]>,
	res: Response,
) {
	const userId = res.locals.user;
	const { limit = 5, offset = 0, search = "" } = req.query;
	// Default limit to 5 articles if limit is not provided
	// Default to no offset if offset is not provided
	// Default search to an empty string if search is not provided

	const articles = await getFeedArticles(
		userId,
		Number(limit),
		Number(offset),
		search,
	);

	return res.json(articles);
}

// Handler to get the list of users that the current user is following and followed by
export async function getFollowingUsersHandler(req: Request, res: Response) {
	const userId = res.locals.user;

	const users = await getFollowingUsers(userId);

	return res.json(users);
}

// Handler to follow a user
export async function followUserHandler(
	req: Request<FollowUserType["params"]>,
	res: Response,
) {
	console.log("followUserHandler");
	const userId = res.locals.user;
	const followUserId = Number(req.params.userId);

	try {
		await followUser(userId, followUserId);
		return res.status(201).json({ message: "User Followed Successfully" });
	} catch (error) {
		return res.status(400).json({ message: "User already followed" });
	}
}

// Handler to unfollow a user
export async function unfollowUserHandler(
	req: Request<FollowUserType["params"]>,
	res: Response,
) {
	const userId = res.locals.user;
	const followUserId = req.params.userId;

	try {
		await unfollowUser(userId, Number(followUserId));
		return res.status(204).json();
	} catch (error) {
		return res.status(400).json({ message: "User not followed" });
	}
}
