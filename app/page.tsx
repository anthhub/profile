import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import OpenSource from "@/components/opensource";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Projects />
      <Skills />
      <OpenSource />
      <Footer />
    </main>
  );
}
