import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const assets = {
  "company/event.webp": "https://static.tildacdn.one/tild6463-3739-4433-a239-333935666631/1.jpg",
  "news/kidney-transplantation.webp": "https://static.tildacdn.one/tild6463-3739-4433-a239-333935666631/1.jpg",
  "news/arrhythmology.webp": "https://static.tildacdn.one/tild3839-3663-4266-a239-396233643536/noroot.jpg",
  "news/bariatric-surgery.webp": "https://static.tildacdn.one/tild3165-3566-4265-b932-333537646330/noroot.jpg",
  "directions/surgery.webp": "https://static.tildacdn.one/tild6539-3435-4239-b439-326433396535/card1.jpg",
  "directions/cardiology.webp": "https://static.tildacdn.one/tild3633-3064-4564-b736-623264656333/Light-heart.png",
  "directions/diabetes.webp": "https://static.tildacdn.one/tild3430-3034-4565-a661-323939313636/ocr.jpg",
  "directions/neurosurgery.webp": "https://static.tildacdn.one/tild6436-3230-4437-b164-313834306236/card4.jpg",
  "directions/anesthesiology.webp": "https://static.tildacdn.one/tild3965-3238-4337-b233-376665616536/card5.JPG",
};

const fetchWithRetry = async (url, attempts = 4) => {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, attempt * 500));
    }
  }
  throw new Error(`Could not download ${url}`, { cause: lastError });
};

for (const [name, url] of Object.entries(assets)) {
  const destination = path.join(root, "public/images", name);
  await mkdir(path.dirname(destination), { recursive: true });
  const source = await fetchWithRetry(url);
  await sharp(source)
    .rotate()
    .resize({ width: 1600, height: 1000, fit: "cover", position: "attention", withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(destination);
}

console.log(`Imported and optimized ${Object.keys(assets).length} site visuals.`);
