import { readFile } from "fs/promises";
import { join } from "path";
import Header from "@/components/header";
import Carousel from "@/components/carousel";
import Article from "@/components/article";
import Tips from "@/components/tips";
import type { Categories } from "@/lib/data";

async function loadRepos(): Promise<Categories> {
  const p = join(process.cwd(), "public", "const", "repo.json");
  const raw = await readFile(p, "utf-8");
  return JSON.parse(raw) as Categories;
}

export default async function HomePage() {
  const data = await loadRepos();
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Header />
      <div className="mb-16">
        <Carousel />
      </div>
      <Article data={data} />
      <Tips />
    </main>
  );
}
