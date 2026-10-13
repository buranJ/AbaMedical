import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = path.join(root, "content");
const outputRoot = path.join(root, "src", "data");

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function readCollection(directory) {
  const collectionPath = path.join(contentRoot, directory);
  const files = (await readdir(collectionPath)).filter((file) => file.endsWith(".json")).sort();
  return Promise.all(files.map((file) => readJson(path.join(collectionPath, file))));
}

async function writeGenerated(name, value) {
  await mkdir(outputRoot, { recursive: true });
  await writeFile(path.join(outputRoot, name), `${JSON.stringify(value, null, 2)}\n`);
}

const products = (await readCollection("products"))
  .sort((left, right) => (left.order ?? 9999) - (right.order ?? 9999))
  .map(({ order: _order, ...product }) => product);
const articles = (await readCollection("news"))
  .sort((left, right) => (left.order ?? 9999) - (right.order ?? 9999))
  .map(({ order: _order, ...article }) => article);
const catalog = await readJson(path.join(contentRoot, "settings", "catalog.json"));
const site = await readJson(path.join(contentRoot, "settings", "site.json"));
const home = await readJson(path.join(contentRoot, "settings", "home.json"));

await Promise.all([
  writeGenerated("products.generated.json", products),
  writeGenerated("articles.generated.json", articles),
  writeGenerated("catalog.generated.json", catalog),
  writeGenerated("site.generated.json", site),
  writeGenerated("home.generated.json", home),
]);

console.log(`CMS content generated: ${products.length} products, ${articles.length} news items.`);
