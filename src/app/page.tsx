"use client";

import Image from "next/image";
import {
  Linkedin,
  Github,
  Mail,
  GraduationCap,
  ExternalLink,
  ChevronDown,
  BookOpen,
  Play,
  Calendar,
  MapPin,
  ArrowRight,
  FileText,
  Trophy,
  Gamepad2,
} from "lucide-react";
import NavBar from "./components/NavBar";
import SectionHeader from "./components/SectionHeader";
import ProjectCard from "./components/ProjectCard";
import PublicationCard from "./components/PublicationCard";
import TimelineItem from "./components/TimelineItem";
import SkillTag from "./components/SkillTag";
import AnimatedSection from "./components/AnimatedSection";
import TerminalContact from "./components/TerminalContact";

/* ═══════════════════════════════════════
   DATA
   ═══════════════════════════════════════ */

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/arthur-louette/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/LouetteArthur",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://scholar.google.fr/citations?user=P0jRcPkAAAAJ",
    icon: GraduationCap,
    label: "Scholar",
  },
  {
    href: "https://x.com/arthurlouette",
    icon: XIcon,
    label: "X",
    isCustom: true,
  },
  {
    href: "mailto:arthur.louette@uliege.be",
    icon: Mail,
    label: "Email",
  },
];

const RESEARCH_FOCUS = [
  "Reinforcement Learning",
  "Multi-Agent Systems",
  "Sim-to-Real Transfer",
  "Drone Autonomy",
  "Counter-UAS",
  "Defence Applications",
  "Robotic Manipulation",
  "NVIDIA Isaac Sim",
];

const PROJECTS = [
  {
    title: "Pursuit-Evasion Drones",
    codename: "INTERCEPTOR",
    description:
      "Investigating multi-agent reinforcement learning for autonomous pursuit-evasion. Training adversarial policies in high-fidelity simulation to study robust behaviors and sim-to-real transfer capabilities.",
    tags: ["Multi-Agent RL", "Isaac Sim", "Quadcopter"],
    image: null as string | null,
    video: "/videos/pursuit_evasion.mp4",
    imageAlt: "Drone pursuit-evasion demonstration",
    status: "ACTIVE",
  },
  {
    title: "Counter-Drone Systems",
    codename: "SENTINEL",
    description:
      "Researching robust tracking and control strategies for counter-UAS applications. Focusing on reinforcement learning algorithms that can adapt to dynamic targets and uncertain environments.",
    tags: ["Control Theory", "RL", "Tracking", "Isaac Sim"],
    image: null as string | null,
    video: "/images/counter_drones.mp4",
    imageAlt: "Simulation of drone tracking algorithms",
    status: "ACTIVE",
  },
  {
    title: "Delta Robot Sorting",
    codename: "DELTA",
    description:
      "Optimizing robotic sorting efficiency through learned manipulation policies. Studying the application of reinforcement learning to improve pick-and-place performance in waste management contexts.",
    tags: ["Robotics", "Sim-to-Real", "Manipulation", "Optimization"],
    image: "/images/delta_robot.jpeg",
    video: null as string | null,
    imageAlt: "Delta robot performing high-speed sorting",
    status: "COMPLETED",
    youtubeUrl: "https://www.youtube.com/shorts/ONAUlJNZ6AA",
  },
];

const PUBLICATIONS = [
  {
    title: "Existing Gaps In Reinforcement Learning For Drone Warfare",
    authors: ["Arthur Louette", "Pascal Leroy", "Yanis Geurts", "Damien Ernst"],
    venue: "OpenReview",
    year: "2025",
    citations: 0,
    link: "https://scholar.google.fr/citations?view_op=view_citation&hl=fr&user=P0jRcPkAAAAJ&citation_for_view=P0jRcPkAAAAJ:UeHWp8X0CEIC",
    abstract: "As warfare becomes increasingly digital and autonomous, Reinforcement Learning (RL) has emerged as a promising technique for developing intelligent and adaptive drone behaviors. This paper identifies several remaining gaps in the current state of RL for drone warfare, focusing on bridging the gap between simulated training and real-world deployment.",
    tags: ["RL", "Drone Warfare", "Survey"],
    isFirstAuthor: true,
  },
  {
    title: "Autonomous Drone Combat: A Mutli-Agent Reinforcement Learning Approach",
    authors: ["Julien Hansen", "Arthur Louette", "Pascal Leroy", "Damien Ernst"],
    venue: "ORBi",
    year: "2025",
    citations: 0,
    link: "https://scholar.google.fr/citations?view_op=view_citation&hl=fr&user=P0jRcPkAAAAJ&citation_for_view=P0jRcPkAAAAJ:IjCSPb-OGe4C",
    abstract: "This paper presents a multi-agent reinforcement learning environment for drone combat built on IsaacLab. It includes an in-depth comparison between decentralized learning and self-play schemes in competitive settings, confirming the benefits of self-play for autonomous combat.",
    tags: ["MARL", "Drone Combat", "IsaacLab"],
    supervisedAuthor: "Julien Hansen",
  },
  {
    title: "Reinforcement Learning to improve delta robot throws for sorting scrap metal",
    authors: ["Arthur Louette", "Gaspard Lambrechts", "Damien Ernst", "Eric Pirard", "Godefroid Dislaire"],
    venue: "arXiv preprint arXiv:2406.13453",
    year: "2024",
    citations: 8,
    link: "https://scholar.google.fr/citations?view_op=view_citation&hl=fr&user=P0jRcPkAAAAJ&citation_for_view=P0jRcPkAAAAJ:d1gkVwhDpl0C",
    abstract: "This study proposes a novel approach based on reinforcement learning (RL) to enhance the sorting efficiency of scrap metal using delta robots and a Pick-and-Place (PaP) process. The approach uses a 3D-simulated environment to train an RL agent to perform throws of scrap metal into different bins, significantly improving sorting throughput.",
    tags: ["Robotics", "Sim-to-Real", "Manipulation"],
    isFirstAuthor: true,
  },
  {
    title: "Exploiting reinforcement learning to improve robotic throws",
    authors: ["Arthur Louette"],
    venue: "Master Thesis, ULiège",
    year: "2023",
    citations: 0,
    link: "https://scholar.google.fr/citations?view_op=view_citation&hl=fr&user=P0jRcPkAAAAJ&citation_for_view=P0jRcPkAAAAJ:u-x6o8ySG0sC",
    abstract: "A study on exploiting reinforcement learning to teach an ABB Flexpicker robot to accurately throw objects into bins using a high-fidelity simulator.",
    tags: ["Master Thesis", "Robotics"],
    isFirstAuthor: true,
  },
];

const NEWS = [
  {
    date: "JUNE 2025",
    title: "Paris Air Show — Le Bourget",
    description:
      "Live demo of our advancements in autonomous drone interception system at the Paris Air Show.",
    image: "/images/defence-expo.webp",
    imageAlt: "Defence expo booth at Paris Air Show",
    youtubeUrl: "https://youtu.be/jf7Zb3cTNNM",
    location: "Paris, France",
  },
  {
    date: "2025",
    title: "Inno4Def Drone Hackathon",
    description:
      "Participated in the Inno4Def drone hackathon organized by La Défense. Flying drones in simulation using Liftoff and developing autonomous strategies.",
    image: "/images/drone-sim.webp",
    imageAlt:
      "Arthur Louette flying drones at Inno4Def hackathon using Liftoff simulator",
    location: "Belgium",
    youtubeUrl: "https://inno4def.be/both2/",
  },
];

const EDUCATION = [
  {
    period: "2023 — PRESENT",
    title: "PhD in Robotic Reinforcement Learning",
    institution: "University of Liège — Montefiore Institute",
    description:
      "Research on reinforcement learning for robotic systems with defence applications, supervised by Prof. Damien Ernst.",
    isActive: true,
  },
  {
    period: "2021 — 2023",
    title: "MSc Data Science & Engineering",
    institution: "University of Liège",
    description:
      "Specialization in machine learning and artificial intelligence. Thesis on reinforcement learning for robotic control.",
  },
  {
    period: "2018 — 2021",
    title: "BSc Engineering",
    institution: "University of Liège",
    description: "Foundation in mathematics, physics, and computer science.",
  },
];

/* ═══════════════════════════════════════
   PAGE
   ═══════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <NavBar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen flex items-center justify-center gradient-mesh overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/[0.02] rounded-full blur-3xl" />
        </div>

        <div className="section-container text-center relative z-10 max-w-5xl mx-auto px-6">
          {/* Profile Photo */}
          <AnimatedSection>
            <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40 mb-10">
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-accent/30">
                <Image
                  src="/images/profile.png"
                  alt="Arthur Louette"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="160px"
                />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary leading-[1.1] mb-4">
              Arthur
              <span className="text-accent"> Louette</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="font-mono text-sm md:text-base text-text-secondary tracking-wide mb-8">
              PhD Researcher · Co-Founder @ Belerion · Robotics
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <p className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto leading-relaxed mb-10">
              Developing robust RL agents for robotic autonomy in complex, unpredictable environments.
              Bridging the gap from simulation to reality for dual-use applications.
            </p>
          </AnimatedSection>

          {/* Social Links */}
          <AnimatedSection delay={0.5}>
            <div className="flex items-center justify-center gap-3 mb-12">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-10 h-10 border border-border-dark flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-200"
                    aria-label={link.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection delay={0.6}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#research"
                className="group px-8 py-3.5 bg-accent text-bg-dark font-medium tracking-wide hover:bg-accent-hover transition-all duration-200 flex items-center gap-2"
              >
                View Research
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 border border-border-dark text-text-secondary hover:text-text-primary hover:border-text-secondary transition-all duration-200 flex items-center gap-2"
              >
                Download CV
                <ExternalLink size={14} className="opacity-60" />
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.9}>
            <a
              href="#about"
              className="inline-flex flex-col items-center gap-2 mt-20 text-text-tertiary hover:text-accent transition-colors"
              aria-label="Scroll down"
            >
              <ChevronDown size={16} className="animate-bounce" />
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ 01 — ABOUT ═══════════ */}
      <section id="about" className="section-light">
        <div className="section-divider-light" />
        <div className="section-container">
          <AnimatedSection>
            <SectionHeader index="01" title="About" light />
          </AnimatedSection>

          <div className="grid md:grid-cols-[1fr_auto] gap-12 items-start">
            <div>
              <AnimatedSection delay={0.1}>
                <p className="text-2xl md:text-3xl font-display font-semibold text-text-dark leading-snug mb-8">
                  PhD Researcher in{" "}
                  <span className="text-accent">
                    Robotic Reinforcement Learning
                  </span>{" "}
                  at ULiège & Co-founder of{" "}
                  <a
                    href="https://belerion.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline decoration-accent/30 underline-offset-4 transition-all"
                  >
                    Belerion
                  </a>.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="text-text-dark-secondary leading-relaxed mb-10">
                  My research focuses on deploying RL agents from simulation to
                  reality for autonomous systems that must operate in extreme conditions.
                  I work on problems where decisions need to be fast and robust:
                  high-speed robotic manipulation, autonomous drone navigation, and
                  adversarial counter-UAS scenarios.
                </p>
              </AnimatedSection>

              <div className="grid sm:grid-cols-3 gap-6 mb-10">
                <AnimatedSection delay={0.25}>
                  <div className="border-l-2 border-accent pl-5">
                    <p className="font-mono text-[10px] text-accent tracking-[0.2em] uppercase mb-2">
                      Supervisor
                    </p>
                    <p className="text-base text-text-dark-secondary leading-relaxed">
                      Prof. Damien Ernst, Montefiore Institute, University of
                      Liège.
                    </p>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.35}>
                  <div className="border-l-2 border-accent pl-5">
                    <p className="font-mono text-[10px] text-accent tracking-[0.2em] uppercase mb-2">
                      Collaborations
                    </p>
                    <p className="text-base text-text-dark-secondary leading-relaxed">
                      FN Herstal, John Cockerill Defence, and Thales.
                    </p>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.45}>
                  <div className="border-l-2 border-accent pl-5">
                    <p className="font-mono text-[10px] text-accent tracking-[0.2em] uppercase mb-2">
                      Location
                    </p>
                    <p className="text-base text-text-dark-secondary leading-relaxed">
                      B28 Montefiore, Allée de la Découverte 10, Liège,
                      Belgium.
                    </p>
                  </div>
                </AnimatedSection>
              </div>

              {/* Research Focus Tags */}
              <AnimatedSection delay={0.5}>
                <p className="font-mono text-[10px] text-accent tracking-[0.2em] uppercase mb-4">
                  Research Focus
                </p>
                <div className="flex flex-wrap gap-2">
                  {RESEARCH_FOCUS.map((focus) => (
                    <SkillTag key={focus} label={focus} />
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* NATO Photo */}
            <AnimatedSection delay={0.3} className="hidden md:block">
              <div className="relative w-64">
                <div className="relative overflow-hidden border border-border-light">
                  <Image
                    src="/images/nato.webp"
                    alt="Arthur Louette at NATO headquarters"
                    width={256}
                    height={192}
                    className="object-cover w-full"
                    style={{ filter: "saturate(0.7) brightness(0.9)" }}
                  />
                </div>
                <p className="font-mono text-[10px] text-text-dark-secondary/60 mt-2 tracking-wider text-center">
                  NSPA — Capellen
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════ 02 — RESEARCH PROJECTS ═══════════ */}
      <section id="research" className="section-dark">
        <div className="section-divider" />
        <div className="section-container">
          <AnimatedSection>
            <SectionHeader
              index="02"
              title="Research Projects"
              subtitle="Deploying RL agents from simulation to reality."
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, i) => (
              <AnimatedSection key={project.codename} delay={0.1 * (i + 1)}>
                <ProjectCard {...project} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 03 — PUBLICATIONS ═══════════ */}
      <section id="publications" className="section-light">
        <div className="section-divider-light" />
        <div className="section-container">
          <AnimatedSection>
            <SectionHeader
              index="03"
              title="Publications"
              subtitle="Peer-reviewed papers and preprints."
              light
            />
          </AnimatedSection>

          <div className="flex flex-col gap-6">
            {PUBLICATIONS.map((pub, i) => (
              <AnimatedSection key={pub.title} delay={0.1 * (i + 1)}>
                <PublicationCard {...pub} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 04 — NEWS ═══════════ */}
      <section id="news" className="section-dark">
        <div className="section-divider" />
        <div className="section-container">
          <AnimatedSection>
            <SectionHeader
              index="04"
              title="News"
              subtitle="Recent events and conferences."
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {NEWS.map((item, i) => (
              <AnimatedSection key={item.title} delay={0.1 * (i + 1)}>
                <div className="group relative h-full border border-border-dark bg-bg-dark-card hover:border-accent/40 hover:shadow-lg transition-all duration-500">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden border-b border-border-dark">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ filter: "saturate(0.7) brightness(0.9)" }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-light-card via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-[10px] text-accent tracking-[0.2em] flex items-center gap-1.5">
                        <Calendar size={10} />
                        {item.date}
                      </span>
                      <span className="font-mono text-[10px] text-text-dark-secondary tracking-widest flex items-center gap-1.5">
                        <MapPin size={10} />
                        {item.location}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold tracking-tight text-text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-base text-text-secondary leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {item.youtubeUrl && (
                      <a
                        href={item.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-highlight/30 text-highlight font-mono text-xs tracking-wider uppercase hover:bg-highlight hover:text-bg-light transition-all duration-200"
                      >
                        <Play size={12} />
                        Watch Demo
                        <ExternalLink size={10} className="opacity-60" />
                      </a>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 05 — EDUCATION ═══════════ */}
      <section id="education" className="section-light">
        <div className="section-divider-light" />
        <div className="section-container">
          <AnimatedSection>
            <SectionHeader
              index="05"
              title="Education"
              subtitle="Academic trajectory."
              light
            />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="max-w-2xl">
              {EDUCATION.map((item, i) => (
                <TimelineItem
                  key={item.period}
                  {...item}
                  isLast={i === EDUCATION.length - 1}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ 06 — TEACHING ═══════════ */}
      <section id="teaching" className="section-dark">
        <div className="section-divider" />
        <div className="section-container">
          <AnimatedSection>
            <SectionHeader index="06" title="Teaching" />
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="relative max-w-2xl p-6 border border-border-dark bg-bg-dark-card hover:border-accent/40 hover:shadow-lg transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                  <BookOpen size={18} />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-accent tracking-[0.2em] uppercase mb-1">
                    2024 — 2026
                  </p>
                  <h3 className="font-display text-lg font-semibold text-text-primary">
                    Teaching Assistant — Reinforcement Learning
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">
                    INFO0948 · University of Liège
                  </p>
                  <p className="text-base text-text-secondary mt-3 leading-relaxed">
                    Assisting in the Reinforcement Learning course, including
                    tutorial sessions, student project supervision, and exam
                    preparation. Covering value-based methods, policy gradients,
                    actor-critic architectures, and multi-agent RL.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ 07 — HOBBIES ═══════════ */}
      <section id="hobbies" className="section-dark">
        <div className="section-divider" />
        <div className="section-container">
          <AnimatedSection>
            <SectionHeader index="07" title="Passions" subtitle="Beyond the lab." />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Football */}
            <AnimatedSection delay={0.1}>
              <div className="group relative h-64 overflow-hidden border border-border-dark bg-bg-dark-card hover:border-accent/40 transition-all duration-500">
                <Image
                  src="/images/football.jpg"
                  alt="Football Team"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark-card/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="flex items-center gap-2 mb-2 text-accent">
                    <Trophy size={16} />
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Football</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-primary">Team Spirit</h3>
                  <p className="text-text-secondary text-sm mt-2 max-w-sm">
                    Playing football with my team is how I disconnect. Simple as that.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* FPV */}
            <AnimatedSection delay={0.2}>
              <div className="group relative h-64 overflow-hidden border border-border-dark bg-bg-dark-card hover:border-accent/40 transition-all duration-500">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <source src="/videos/takeoff.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark-card/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="flex items-center gap-2 mb-2 text-accent">
                    <Gamepad2 size={16} />
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase">FPV Piloting</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-primary">Free Flight</h3>
                  <p className="text-text-secondary text-sm mt-2 max-w-sm">
                    Building and flying FPV drones allows me to experience flight from a different perspective.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════ 07 — CONTACT ═══════════ */}
      <section id="contact" className="section-light">
        <div className="section-divider-light" />
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="font-mono text-[10px] text-accent tracking-[0.2em] uppercase mb-4">
                08
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-dark mb-6">
                Get in Touch
              </h2>
              <p className="text-text-dark-secondary leading-relaxed">
                Initiate communication sequence.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <TerminalContact />
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="flex justify-center mt-10">
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border-light text-text-dark font-medium tracking-wide hover:bg-border-light/50 transition-all duration-200 text-sm"
              >
                <FileText size={16} />
                Download CV
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="section-dark border-t border-border-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-display text-sm font-medium text-text-tertiary tracking-wide">
            Arthur Louette
          </p>
          <p className="text-xs text-text-tertiary">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
