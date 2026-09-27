import sharp from "sharp";
import { mkdir } from "node:fs/promises";

await sharp("public/images/brand/logo.svg", { density: 240 })
  .trim({ background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .resize({ width: 720 })
  .png({ compressionLevel: 9 })
  .toFile("public/images/brand/logo-cropped.png");

await sharp("public/images/brand/logo-cropped.png")
  .extract({ left: 0, top: 0, width: 180, height: 148 })
  .trim({ background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .resize({ width: 320 })
  .png({ compressionLevel: 9 })
  .toFile("public/images/brand/logo-mark.png");

await sharp("public/images/hero/operating-room.jpg")
  .resize({ width: 1665, withoutEnlargement: true })
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile("public/images/hero/operating-room-v2.jpg");

const partnerLogos = ["medtronic", "abbott", "genoss", "merit-medical", "st-jude-medical", "concept-medical"];
await mkdir("public/images/partners/optimized", { recursive: true });
for (const name of partnerLogos) {
  await sharp(`public/images/partners/${name}.png`)
    .trim({ background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .resize({ width: 240, height: 70, fit: "inside", withoutEnlargement: false })
    .png({ compressionLevel: 9 })
    .toFile(`public/images/partners/optimized/${name}.png`);
}

console.log("Optimized logo and hero assets.");
