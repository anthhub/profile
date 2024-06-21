// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import { join } from "path";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const filePath = join(process.cwd(), "public", "const", "repo.json");
  const repo = await fs.readFile(filePath, "utf-8");
  const repoData = JSON.parse(repo);
  res.status(200).json(repoData);
}

export interface Repo {
  name: string;
  url: string;
  desc: string[];
  github?: string;
  tags: string[];
  over?: string;
}
