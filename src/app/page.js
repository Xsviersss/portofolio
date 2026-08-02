import { getProfile, getProjects } from "@/lib/db";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Work } from "@/components/site/Work";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

// Always read fresh from data/db.json so admin edits show up immediately.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);

  return (
    <>
      <Nav />
      <Hero profile={profile} />
      <Work projects={projects} />
      <About profile={profile} />
      <Contact profile={profile} />
      <Footer />
    </>
  );
}
