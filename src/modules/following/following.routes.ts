import { Router } from "express";

import {
	getFeedArticlesHandler,
	getFollowingUsersHandler,
	followUserHandler,
	unfollowUserHandler,
} from "./following.controller";
import { authenticate } from "../../middleware/authenticate";
import { validate } from "../../middleware/validate";
import { followUserSchema, followingFeedSchema } from "./following.schemas";

const router = Router();

// Get articles from users the logged-in user is following
router.get(
	"/feed",
	authenticate,
	validate(followingFeedSchema),
	getFeedArticlesHandler,
);

// Get the list of users that the logged-in user is following and or followed by
router.get("/users", authenticate, getFollowingUsersHandler);

// Follow a user by their user ID
router.post(
	"/:userId/follow",
	authenticate,
	validate(followUserSchema),
	followUserHandler,
);

// Unfollow a user by their user ID
router.delete(
	"/:userId/unfollow",
	authenticate,
	validate(followUserSchema),
	unfollowUserHandler,
);

export default router;
