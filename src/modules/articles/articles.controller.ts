import { Request, RequestHandler, Response } from "express";

import {
	getArticles,
	createArticle,
	getArticleById,
	updateArticle,
	deleteArticle,
} from "./articles.service";

export const getArticlesHandler: RequestHandler = async (req, res) => {
	const articles = await getArticles();
	res.status(200).send(articles);
};

export const createArticleHandler: RequestHandler = async (req, res) => {
	const userId = res.locals.user;
	const article = await createArticle(req.body, userId);
	res.status(201).send(article);
};

export const getArticleByIdHandler: RequestHandler = async (
	req: Request,
	res: Response,
) => {
	const articleId = parseInt(req.params.id, 10);

	if (isNaN(articleId)) {
		return res.status(400).json({ error: "Invalid article ID" });
	}

	try {
		const article = await getArticleById(articleId);
		res.json(article);
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

export const updateArticleHandler: RequestHandler = async (req, res) => {
	const userId = res.locals.user;

	const article = await updateArticle(Number(req.params.id), req.body, userId);
	res.status(200).send(article);
};

export const deleteArticleHandler: RequestHandler = async (req, res) => {
	await deleteArticle(Number(req.params.id), res.locals.user);
	res.status(204).send();
};
