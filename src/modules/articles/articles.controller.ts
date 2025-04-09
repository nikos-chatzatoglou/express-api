import { Request, Response } from "express";

import {
	getArticles,
	createArticle,
	getArticleById,
	updateArticle,
	deleteArticle,
} from "./articles.service";
import {
	ArticleParamsInput,
	CreateArticleInput,
	UpdateArticleInput,
} from "./articles.schemas";

export async function getArticlesHandler(
	req: Request,
	res: Response,
): Promise<void> {
	console.log("getArticlesHandler");
	const articles = await getArticles();
	res.status(200).send(articles);
}

export async function createArticleHandler(
	req: Request<{}, {}, CreateArticleInput>,
	res: Response,
): Promise<void> {
	try {
		const userId = res.locals.user;
		const article = await createArticle(req.body, userId);
		res.status(201).send(article);
	} catch (e: any) {
		console.error(e.message);
		res.status(400).send(e.message);
	}
}

export async function getArticleByIdHandler(
	req: Request<ArticleParamsInput>,
	res: Response,
): Promise<void> {
	try {
		const article = await getArticleById(Number(req.params.articleId));
		res.status(200).send(article);
	} catch (e: any) {
		console.error(e.message);
		res.status(400).send(e.message);
	}
}

export async function updateArticleHandler(
	req: Request<UpdateArticleInput["params"], {}, UpdateArticleInput["body"]>,
	res: Response,
): Promise<void> {
	try {
		const userId = res.locals.user;
		const articleId = Number(req.params.articleId);

		// Check if article exists and user is the author
		const article = await getArticleById(articleId);
		if (!article || article.authorId !== userId) {
			res
				.status(400)
				.send({ message: "You are not the author of this article" });
			return;
		}

		const updatedArticle = await updateArticle(articleId, req.body, userId);
		res.status(200).send(updatedArticle);
	} catch (e: any) {
		console.error(e.message);
		res.status(400).send(e.message);
	}
}

export async function deleteArticleHandler(
	req: Request<ArticleParamsInput>,
	res: Response,
): Promise<void> {
	try {
		const userId = res.locals.user;
		const articleId = Number(req.params.articleId);

		// Check if article exists and user is the author
		const article = await getArticleById(articleId);
		if (!article || article.authorId !== userId) {
			res
				.status(400)
				.send({ message: "You are not the author of this article" });
			return;
		}

		await deleteArticle(articleId, Number(userId));
		res.status(204).send();
	} catch (e: any) {
		console.error(e.message);
		res.status(400).send(e.message);
	}
}
