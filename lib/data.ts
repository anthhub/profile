export interface Repo {
  name: string;
  url?: string;
  desc: string[];
  github?: string;
  tags: string[];
}

export type Categories = Record<string, Repo[]>;

// Tag chip colors (preserved from the original v1 palette — gives each repo personality)
export const tagColors = [
  "#f50",
  "#2db7f5",
  "#87d068",
  "#108ee9",
  "#fcaf17",
  "#f36c21",
  "#b2d235",
  "#ef5b9c",
  "#c77eb5",
];

export function tagColor(tag: string) {
  let h = 0;
  for (let i = 0; i < tag.length; i++) h = (h * 31 + tag.charCodeAt(i)) >>> 0;
  return tagColors[h % tagColors.length];
}
