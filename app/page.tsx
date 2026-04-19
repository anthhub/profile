import { readFile } from "fs/promises";
import { join } from "path";
import WinDesktop from "@/components/win-desktop";
import type { Categories } from "@/lib/data";

async function loadRepos(): Promise<Categories> {
  const p = join(process.cwd(), "public", "const", "repo.json");
  const raw = await readFile(p, "utf-8");
  return JSON.parse(raw) as Categories;
}

export default async function HomePage() {
  const data = await loadRepos();
  return <WinDesktop data={data} />;
}
