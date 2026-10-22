import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Credentials } from "@/components/Credentials";
import { DesignWork } from "@/components/DesignWork";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Footer } from "@/components/Footer";
import { HandsOn } from "@/components/HandsOn";
import { Hero } from "@/components/Hero";
import { LearningJourney } from "@/components/LearningJourney";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Skills } from "@/components/Skills";

// Story order: who → what I do → where I've done it → what I can use → what I've built → where I'm going → contact.
export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <ExperienceTimeline />
        <HandsOn />
        <Skills />
        <Projects />
        <DesignWork />
        <LearningJourney>
          <Credentials />
        </LearningJourney>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
