import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get articles from followed users with optional pagination and search
export async function getFeedArticles(
	userId: number,
	limit: number,
	offset: number,
	search: string | undefined,
) {
	const followedUsers = await prisma.userFollower.findMany({
		where: {
			followerId: userId,
		},
	});

	return prisma.article.findMany({
		where: {
			authorId: {
				in: followedUsers.map((user) => user.followingId),
			},
			OR: [
				{
					title: {
						contains: search,
					},
				},
				{
					content: {
						contains: search,
					},
				},
			],
		},
		take: limit,
		skip: offset,
	});
}

// Get the list of users the current user is following and their followers
export async function getFollowingUsers(userId: number) {
	const followers = await prisma.userFollower
		.findMany({
			where: {
				followingId: userId,
			},
			select: {
				follower: {
					select: {
						id: true,
						username: true,
						email: true,
					},
				},
			},
		})
		.then((data) => {
			return data.map((user) => user.follower);
		});

	const following = await prisma.userFollower
		.findMany({
			where: {
				followerId: userId,
			},
			select: {
				following: {
					select: {
						id: true,
						username: true,
						email: true,
					},
				},
			},
		})
		.then((data) => {
			return data.map((user) => user.following);
		});

	return {
		followers,
		following,
	};
}

// Follow a user by their user ID
export async function followUser(userId: number, followUserId: number) {
	try {
		await prisma.userFollower.create({
			data: {
				followerId: userId,
				followingId: followUserId,
			},
		});
	} catch (error) {
		throw new Error("User already followed");
	}
}

// Unfollow a user by their user ID
export async function unfollowUser(userId: number, unfollowUserId: number) {
	try {
		await prisma.userFollower.delete({
			where: {
				followerId_followingId: {
					followerId: userId,
					followingId: unfollowUserId,
				},
			},
		});
	} catch (error) {
		throw new Error("User not followed");
	}
}
