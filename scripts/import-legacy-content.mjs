import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const fetchWithRetry = async (url, attempts = 4) => {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, attempt * 500));
    }
  }
  throw new Error(`Could not download ${url}`, { cause: lastError });
};

const sitemap = await (await fetchWithRetry("https://abamed.kg/sitemap-store.xml")).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

const sectionMap = {
  diabetsmellitus: ["diabetes", "Сахарный диабет"],
  electrosurgery: ["electrosurgery", "Электрохирургия"],
  suturematerials: ["suture-materials", "Шовные материалы"],
  staplingtools: ["stapling-tools", "Сшивающие инструменты"],
  neurosurgery: ["neurosurgery", "Нейрохирургия"],
  anesthesiology: ["anesthesiology", "Анестезиология"],
  pacemaker: ["pacemakers", "Кардиостимуляция"],
  peripheralstent: ["peripheral-stents", "Периферические стенты"],
  peripheralpre: ["vascular-closure", "Устройства закрытия сосудистого доступа"],
  peripheralconductors: ["peripheral-guidewires", "Периферические проводники"],
  peripheralballoons: ["peripheral-balloons", "Периферические баллоны"],
  cornarystent: ["coronary-stents", "Коронарные стенты"],
  cornaryconductors: ["coronary-guidewires", "Коронарные проводники"],
  cornaryballoons: ["coronary-balloons", "Коронарные баллоны"],
  ablation: ["ablation", "Абляция"],
  diagnostics: ["diagnostics", "Электрофизиологическая диагностика"],
};

const inferBrand = (title) => {
  if (/covidien|ligasure|valleylab|sonicision|v-loc|endo gia|tri staple/i.test(title)) return "Medtronic";
  if (/assurity|endurity|quadra|fortify|tendril|durata|merlin|xience|supera|acculink|omnilink|absolute|tacticath|flexability|inquiry/i.test(title)) return "Abbott";
  if (/genoss/i.test(title)) return "Genoss";
  return undefined;
};

const extractProductPayload = (html) => {
  const marker = "var product = ";
  const start = html.indexOf(marker);
  if (start < 0) return undefined;
  const jsonStart = start + marker.length;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = jsonStart; index < html.length; index += 1) {
    const character = html[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') inString = true;
    else if (character === "{") depth += 1;
    else if (character === "}" && --depth === 0) {
      try { return JSON.parse(html.slice(jsonStart, index + 1)); }
      catch { return undefined; }
    }
  }
  return undefined;
};

const decodeEntities = (value) => value
  .replace(/&#(\d+);?/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/&#x([0-9a-f]+);?/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
  .replaceAll("&nbsp;", " ")
  .replaceAll("&amp;", "&")
  .replaceAll("&quot;", '"')
  .replaceAll("&laquo;", "«")
  .replaceAll("&raquo;", "»")
  .replaceAll("&ndash;", "–")
  .replaceAll("&mdash;", "—")
  .replaceAll("&lt;", "<")
  .replaceAll("&gt;", ">");

const extractDetails = (html) => {
  if (!html) return [];
  const text = decodeEntities(html)
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<li[^>]*>/gi, "\n• ")
    .replace(/<\/(?:p|div|li|ul|ol|h[1-6]|tr|table)>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return text.split(/\n{2,}/).map((part) => part.trim()).filter((part) => part.length > 2);
};

const createSummary = (title, details) => {
  const source = details.join(" ").replace(/•\s*/g, "").replace(/\s+/g, " ").trim();
  if (!source) return `${title} — позиция каталога ABA Medical. Характеристики и условия поставки уточняйте у специалиста.`;
  const sentence = source.match(/^.{45,260}?[.!?](?=\s|$)/)?.[0];
  if (sentence) return sentence;
  if (source.length <= 240) return source;
  const clipped = source
    .slice(0, 237)
    .replace(/\s+\S*$/, "")
    .replace(/\s+(?:и|а|но|с|со|в|во|на|для|по|из|от|до|к)$/i, "");
  return `${clipped}…`;
};

const products = await Promise.all(
  urls.map(async (url) => {
    const pathname = new URL(url).pathname;
    const html = await (await fetchWithRetry(url)).text();
    const title = ((html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || "Медицинское оборудование")
      .replaceAll("&quot;", '"')
      .replaceAll("&amp;", "&")
      .trim();
    const slug = pathname.split("/").at(-1);
    const imageUrl = (html.match(/<meta property="og:image" content="([^"]+)"/i) || [])[1];
    const trustedImageUrl = imageUrl && new URL(imageUrl).hostname.endsWith("tildacdn.one") ? imageUrl : undefined;
    const sourceProduct = extractProductPayload(html);
    const details = extractDetails(sourceProduct?.text);
    const gallerySources = [...new Set([
      trustedImageUrl,
      ...(sourceProduct?.gallery || []).map((item) => item?.img),
    ].filter((item) => item && new URL(item).hostname.endsWith("tildacdn.one")))];
    const gallery = gallerySources.map((source, index) =>
      `/images/products/normalized/${slug}${index ? `-${index + 1}` : ""}.webp`,
    );
    const sourceSection = pathname.split("/")[1] === "tproduct" ? "cardiology" : pathname.split("/")[1];
    const [subcategory, categoryLabel] = sectionMap[sourceSection] || ["cardiology", "Кардиология"];
    return {
      slug,
      legacyPath: pathname,
      title,
      brand: inferBrand(`${title} ${details[0] || ""}`),
      direction: sourceSection === "diabetsmellitus" ? "diabetes" : ["electrosurgery", "suturematerials", "staplingtools"].includes(sourceSection) ? "surgery" : ["neurosurgery", "anesthesiology"].includes(sourceSection) ? sourceSection : "cardiology",
      subcategory,
      categoryLabel,
      summary: createSummary(title, details),
      ...(details.length ? { details } : {}),
      ...(gallery.length ? {
        image: gallery[0],
        imageSource: gallerySources[0],
        gallery,
        gallerySources,
      } : {}),
    };
  }),
);

await mkdir(path.join(root, "src/data"), { recursive: true });
await writeFile(path.join(root, "src/data/legacy-products.generated.json"), `${JSON.stringify(products, null, 2)}\n`);

const productImages = products.flatMap((product) =>
  (product.gallery || []).map((image, index) => ({ image, imageSource: product.gallerySources[index] })),
);
for (let index = 0; index < productImages.length; index += 8) {
  await Promise.all(productImages.slice(index, index + 8).map(async ({ image, imageSource }) => {
    const destination = path.join(root, "public", image);
    await mkdir(path.dirname(destination), { recursive: true });
    const response = await fetchWithRetry(imageSource);
    const source = Buffer.from(await response.arrayBuffer());
    await sharp(source)
      .rotate()
      .trim({ background: { r: 255, g: 255, b: 255 }, threshold: 10 })
      .resize({ width: 1000, height: 760, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 84 })
      .toFile(destination);
  }));
}

const assets = {
  "brand/logo.svg": "https://static.tildacdn.one/tild3032-6437-4963-b264-616436343266/logov.svg",
  "hero/operating-room.jpg": "https://static.tildacdn.one/tild3432-3135-4534-b736-383030613061/noroot.jpg",
  "products/insulin-pump.jpg": "https://static.tildacdn.one/stor6661-3836-4962-b462-616337323237/31996139.jpg",
  "products/valleylab-ft10.jpg": "https://static.tildacdn.one/stor3062-6265-4466-b838-353439313837/78282608.jpg",
  "products/stealthstation-s8.jpg": "https://static.tildacdn.one/stor3936-3864-4836-b762-303064343463/35397215.jpg",
  "products/bis-monitor.jpg": "https://static.tildacdn.one/stor6231-3233-4661-a263-376664333835/91030522.jpg",
  "partners/medtronic.png": "https://static.tildacdn.one/tild3936-3864-4630-b361-383438393865/--2.png",
  "partners/abbott.png": "https://static.tildacdn.one/tild3636-3333-4466-a438-363736663539/logoalbott1473914610.png",
  "partners/genoss.png": "https://static.tildacdn.one/tild6238-6164-4131-b135-343033353136/Genoss.png",
  "partners/merit-medical.png": "https://static.tildacdn.one/tild6135-6633-4432-a431-653436653862/merit-medical-seeklo.png",
  "partners/st-jude-medical.png": "https://static.tildacdn.one/tild3134-3063-4963-b932-303465306634/st-jude-medical-seek.png",
  "partners/concept-medical.png": "https://static.tildacdn.one/tild6333-6266-4731-b136-356535623037/Concept-Medical.png"
};

for (const [name, url] of Object.entries(assets)) {
  const destination = path.join(root, "public/images", name);
  await mkdir(path.dirname(destination), { recursive: true });
  const response = await fetchWithRetry(url);
  await writeFile(destination, Buffer.from(await response.arrayBuffer()));
}

console.log(`Imported ${products.length} products, ${productImages.length} gallery images and ${Object.keys(assets).length} owned legacy assets.`);
