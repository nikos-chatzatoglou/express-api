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

export const getArticleByIdHandler: RequestHandler = async (req, res) => {
	const article = await getArticleById(Number(req.params.id));
	res.status(200).send(article);
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
