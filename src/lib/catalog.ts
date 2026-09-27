import type { Subcategory } from "@/types/content";

export function findSubcategory(nodes: Subcategory[], path: string[]): { node?: Subcategory; trail: Subcategory[] } {
  const trail: Subcategory[] = [];
  let level = nodes;
  for (const segment of path) {
    const node = level.find((item) => item.slug === segment);
    if (!node) return { trail };
    trail.push(node);
    level = node.children || [];
  }
  return { node: trail.at(-1), trail };
}

export function leafSlugs(node: Subcategory): string[] {
  return node.children?.length ? node.children.flatMap(leafSlugs) : [node.slug];
}

export function categoryParams(direction: string, nodes: Subcategory[], prefix: string[] = []): { slug: string[] }[] {
  return nodes.flatMap((node) => {
    const path = [...prefix, node.slug];
    return [{ slug: [direction, ...path] }, ...categoryParams(direction, node.children || [], path)];
  });
}
