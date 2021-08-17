import express from "express";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import { getAuthors, writeAuthors } from "../../lib/fs-tools.js";

const authorsRouter = express.Router();

authorsRouter.get("/", async (req, resp, next) => {
  try {
    const authors = await getAuthors();
    resp.send(authors);
  } catch (err) {
    next(err);
  }
});

authorsRouter.get("/:id", async (req, resp, next) => {
  try {
    const authors = await getAuthors();
    const author = authors.find((a) => a.id === req.params.id);
    if (author) {
      resp.send(author);
    } else {
      next(createHttpError(404, `Author with id ${req.params.id} not found`));
    }
  } catch (err) {
    next(err);
  }
});

authorsRouter.post("/", async (req, resp, next) => {
  try {
    const authors = await getAuthors();
    const newAuthor = { ...req.body, id: uniqid() };
    authors.push(newAuthor);
    await writeAuthors(authors);
    resp.status(201).send(newAuthor);
  } catch (err) {
    next(err);
  }
});

authorsRouter.put("/:id", async (req, resp, next) => {
  try {
    const authors = await getAuthors();
    const remainingAuthors = authors.filter((a) => a.id !== req.params.id);
    const modifiedAuthor = { ...req.body, id: req.params.id };
    remainingAuthors.push(modifiedAuthor);
    await writeAuthors(remainingAuthors);
    resp.send(modifiedAuthor);
  } catch (err) {
    next(err);
  }
});

authorsRouter.delete("/:id", async (req, resp, next) => {
  try {
    const authors = await getAuthors();
    const remainingAuthors = authors.filter((a) => a.id !== req.params.id);
    await writeAuthors(remainingAuthors);
    resp.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default authorsRouter;
