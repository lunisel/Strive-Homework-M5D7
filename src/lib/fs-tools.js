import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON, writeFile } = fs;

const authorsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../services/authors/authors.json"
);
const postsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../services/posts/posts.json"
);
const publicFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img/authors"
);

export const getAuthors = () => readJSON(authorsJSONPath);
export const writeAuthors = (content) => writeJSON(authorsJSONPath, content);
export const getPosts = () => readJSON(postsJSONPath);
export const writePosts = (content) => writeJSON(postsJSONPath, content);

export const saveAuthorAvatar = (filename, contentAsBuffer) =>
  writeFile(join(publicFolderPath, filename), contentAsBuffer);
