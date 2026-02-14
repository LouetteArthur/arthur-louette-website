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
} from "lucide-react";
import NavBar from "./components/NavBar";
import SectionHeader from "./components/SectionHeader";
import ProjectCard from "./components/ProjectCard";
import TimelineItem from "./components/TimelineItem";
import SkillTag from "./components/SkillTag";
import HudCorners from "./components/HudCorners";

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
    label: "Google Scholar",
  },
  {
    href: "https://x.com/arthurlouette",
    icon: XIcon,
    label: "X / Twitter",
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
    codename: "PROJECT // INTERCEPTOR",
    description:
      "Multi-agent reinforcement learning for autonomous drone pursuit-evasion scenarios. Training adversarial pursuer and evader policies in high-fidelity simulation with sim-to-real transfer to real quadrotors.",
    tags: ["Multi-Agent RL", "Isaac Sim", "Quadcopter"],
    image: null as string | null,
    video: "/videos/takeoff.mp4",
    imageAlt: "Drone pursuit-evasion demonstration",
    status: "ACTIVE",
  },
  {
    title: "Counter-Drone Systems",
    codename: "PROJECT // SENTINEL",
    description:
      "Developing autonomous counter-UAS defence systems using reinforcement learning. Intelligent tracking and interception of hostile drone threats using teleoperated weapon station systems.",
    tags: ["C-UAS", "Reinforcement Learning", "Defence", "Isaac Sim"],
    image: "/images/turret-cuas.png",
    video: null as string | null,
    imageAlt: "Teleoperated turret system for counter-drone defence",
    status: "ACTIVE",
  },
  {
    title: "Delta Robot Sorting",
    codename: "PROJECT // DELTA",
    description:
      "High-speed robotic sorting using a delta robot controlled by reinforcement learning. Bridging the sim-to-real gap for precise, rapid pick-and-place operations at GeMMe lab.",
    tags: ["Robotics", "Sim-to-Real", "Manipulation", "Control"],
    image: "/images/delta-robot.png",
    video: null as string | null,
    imageAlt: "Delta robot performing high-speed sorting",
    status: "COMPLETED",
    youtubeUrl: "https://www.youtube.com/shorts/ONAUlJNZ6AA",
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
    date: "2024",
    title: "Inno4Def Drone Hackathon",
    description:
      "Participated in the Inno4Def drone hackathon organized by La Défense. Flying drones in simulation using Liftoff and developing autonomous strategies.",
    image: "/images/drone-sim.webp",
    imageAlt: "Arthur Louette flying drones at Inno4Def hackathon using Liftoff simulator",
    location: "Belgium",
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

export default function Home() {
  return (
    <>
      <NavBar />

      {/* ═══════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Decorative grid lines */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[20%] left-0 right-0 h-px bg-accent/5" />
          <div className="absolute top-[80%] left-0 right-0 h-px bg-accent/5" />
          <div className="absolute left-[15%] top-0 bottom-0 w-px bg-accent/5" />
          <div className="absolute right-[15%] top-0 bottom-0 w-px bg-accent/5" />
        </div>

        {/* Corner coords — B28 Montefiore, ULiège */}
        <span
          className="absolute top-20 left-6 font-mono text-[10px] text-accent/30 tracking-widest"
          aria-hidden="true"
        >
          50.5836°N 5.5611°E
        </span>
        <span
          className="absolute top-20 right-6 font-mono text-[10px] text-accent/30 tracking-widest"
          aria-hidden="true"
        >
          SYS.ONLINE
        </span>
        <span
          className="absolute bottom-8 left-6 font-mono text-[10px] text-accent/30 tracking-widest"
          aria-hidden="true"
        >
          B28 // MONTEFIORE
        </span>
        <span
          className="absolute bottom-8 right-6 font-mono text-[10px] text-accent/30 tracking-widest"
          aria-hidden="true"
        >
          LIÈGE // BELGIUM
        </span>

        <div className="section-container text-center relative z-10">
          {/* Photo — Airshow profile */}
          <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40 mb-8">
            <div className="absolute inset-0 border border-accent/40 rotate-45 scale-[1.15]" aria-hidden="true" />
            <div className="relative w-full h-full border border-accent/60 overflow-hidden border-4 border-red-500">
              <Image
                src="/images/profile.png?v=2"
                alt="Arthur Louette"
                fill
                className="object-cover object-[center_15%] rotate-180"
                priority
                sizes="160px"
              />
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-accent animate-pulse-glow" aria-hidden="true" />
          </div>

          {/* Name */}
          <div className="mb-4">
            <p
              className="font-mono text-xs text-accent/60 tracking-[0.3em] mb-3 uppercase"
              aria-hidden="true"
            >
              &#91; CALLSIGN &#93;
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider uppercase text-foreground animate-flicker">
              ARTHUR
              <span className="text-accent"> LOUETTE</span>
            </h1>
          </div>

          {/* Title */}
          <p className="font-mono text-sm md:text-base text-muted tracking-[0.15em] mb-8">
            PHD CANDIDATE{" "}
            <span className="text-accent/60">//</span> REINFORCEMENT
            LEARNING <span className="text-accent/60">//</span> ROBOTICS
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-10 h-10 border border-accent/30 flex items-center justify-center text-muted hover:text-accent hover:border-accent/60 hover:shadow-[0_0_12px_var(--color-accent-dim)] transition-all duration-200"
                  aria-label={link.label}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>

          {/* Scroll indicator */}
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-1 text-accent/40 hover:text-accent transition-colors"
            aria-label="Scroll to about section"
          >
            <span className="font-mono text-[10px] tracking-widest uppercase">
              SCROLL
            </span>
            <ChevronDown size={16} className="animate-bounce" />
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ABOUT / RESEARCH
          ═══════════════════════════════════════ */}
      <section id="about" className="relative border-t border-border">
        <div className="section-container">
          <SectionHeader
            index="01"
            title="About"
            subtitle="CURRENT STATUS: OPERATIONAL"
          />

          <div className="grid md:grid-cols-[1fr_auto] gap-12 items-start">
            <div>
              {/* Mission Status */}
              <div className="relative border border-border p-6 mb-8">
                <HudCorners />
                <p className="font-mono text-xs text-accent tracking-widest mb-3 uppercase">
                  &#9655; CURRENT MISSION
                </p>
                <p className="text-lg text-foreground leading-relaxed">
                  PhD Candidate in{" "}
                  <span className="text-accent font-medium">
                    Robotic Reinforcement Learning
                  </span>{" "}
                  at the{" "}
                  <span className="text-accent font-medium">
                    University of Liège
                  </span>{" "}
                  (Montefiore Institute), deploying RL agents
                  from simulation to reality for defence and autonomous systems.
                </p>
                <p className="text-sm text-muted mt-3 leading-relaxed">
                  Supervised by{" "}
                  <span className="text-foreground">Prof. Damien Ernst</span>.
                  Research conducted in collaboration with{" "}
                  <span className="text-warning">FN Herstal</span>,{" "}
                  <span className="text-warning">John Cockerill Defence</span>,
                  and <span className="text-warning">Thales</span>.
                </p>
              </div>

              {/* Research Focus Tags */}
              <div>
                <p className="font-mono text-xs text-muted tracking-widest mb-4 uppercase">
                  &#9655; RESEARCH MODULES
                </p>
                <div className="flex flex-wrap gap-2">
                  {RESEARCH_FOCUS.map((focus) => (
                    <SkillTag key={focus} label={focus} />
                  ))}
                </div>
              </div>
            </div>

            {/* NATO Photo */}
            <div className="hidden md:block relative w-64">
              <div className="relative border border-border overflow-hidden">
                <HudCorners />
                <Image
                  src="/images/nato.webp"
                  alt="Arthur Louette at NATO headquarters"
                  width={256}
                  height={192}
                  className="object-cover w-full"
                  style={{ filter: "saturate(0.7) brightness(0.9)" }}
                />
              </div>
              <p className="font-mono text-[10px] text-muted/60 mt-2 tracking-wider text-center">
                NATO HQ // BRUSSELS
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          RESEARCH PROJECTS
          ═══════════════════════════════════════ */}
      <section id="research" className="relative border-t border-border bg-surface/50">
        <div className="section-container">
          <SectionHeader
            index="02"
            title="Research Projects"
            subtitle="DEPLOYING RL AGENTS FROM SIMULATION TO REALITY"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.codename} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          NEWS / ACTUALITÉS
          ═══════════════════════════════════════ */}
      <section id="news" className="relative border-t border-border">
        <div className="section-container">
          <SectionHeader
            index="03"
            title="News"
            subtitle="RECENT OPERATIONS & EVENTS"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {NEWS.map((item) => (
              <div
                key={item.title}
                className="group relative border border-border bg-card hover:border-accent/40 transition-all duration-300"
              >
                <HudCorners />

                {/* Image */}
                <div className="relative h-48 overflow-hidden border-b border-border">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: "saturate(0.7) brightness(0.85)" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[10px] text-accent tracking-widest flex items-center gap-1.5">
                      <Calendar size={10} />
                      {item.date}
                    </span>
                    <span className="font-mono text-[10px] text-muted tracking-widest flex items-center gap-1.5">
                      <MapPin size={10} />
                      {item.location}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold tracking-wide uppercase text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {item.youtubeUrl && (
                    <a
                      href={item.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 border border-warning/30 text-warning font-mono text-xs tracking-wider uppercase hover:bg-warning hover:text-background transition-all duration-200"
                    >
                      <Play size={12} />
                      WATCH DEMO
                      <ExternalLink size={10} className="opacity-60" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          EDUCATION
          ═══════════════════════════════════════ */}
      <section id="education" className="relative border-t border-border bg-surface/50">
        <div className="section-container">
          <SectionHeader
            index="04"
            title="Education"
            subtitle="ACADEMIC TRAJECTORY"
          />

          <div className="max-w-2xl">
            {EDUCATION.map((item, i) => (
              <TimelineItem
                key={item.period}
                {...item}
                isLast={i === EDUCATION.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TEACHING
          ═══════════════════════════════════════ */}
      <section id="teaching" className="relative border-t border-border">
        <div className="section-container">
          <SectionHeader
            index="05"
            title="Teaching"
            subtitle="KNOWLEDGE TRANSFER PROTOCOL"
          />

          <div className="relative border border-border p-6 max-w-2xl">
            <HudCorners />
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-accent/40 flex items-center justify-center text-accent shrink-0">
                <BookOpen size={18} />
              </div>
              <div>
                <p className="font-mono text-xs text-accent tracking-widest mb-1">
                  2024 — 2026
                </p>
                <h3 className="font-display text-lg font-bold tracking-wide uppercase text-foreground">
                  Teaching Assistant — Reinforcement Learning
                </h3>
                <p className="font-mono text-sm text-muted mt-1">
                  INFO0948 // University of Liège
                </p>
                <p className="text-sm text-muted/80 mt-3 leading-relaxed">
                  Assisting in the Reinforcement Learning course, including
                  tutorial sessions, student project supervision, and exam preparation.
                  Covering value-based methods, policy gradients, actor-critic architectures,
                  and multi-agent RL.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT
          ═══════════════════════════════════════ */}
      <section id="contact" className="relative border-t border-border bg-surface/50">
        <div className="section-container">
          <SectionHeader
            index="06"
            title="Contact"
            subtitle="ESTABLISH COMMUNICATION LINK"
          />

          <div className="max-w-2xl">
            {/* Terminal prompt */}
            <div className="relative border border-border p-6 font-mono mb-8">
              <HudCorners />
              <p className="text-xs text-muted mb-4">
                <span className="text-accent">louette@uliege</span>
                <span className="text-muted">:</span>
                <span className="text-foreground">~</span>
                <span className="text-muted">$</span>{" "}
                <span className="text-foreground">cat contact.txt</span>
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-muted">EMAIL </span>
                  <span className="text-accent/40">.... </span>
                  <a
                    href="mailto:arthur.louette@uliege.be"
                    className="text-accent hover:underline underline-offset-4"
                  >
                    arthur.louette@uliege.be
                  </a>
                </p>
                <p>
                  <span className="text-muted">AFFIL </span>
                  <span className="text-accent/40">.... </span>
                  <span className="text-foreground">
                    Montefiore Institute, University of Liège
                  </span>
                </p>
                <p>
                  <span className="text-muted">ADDR  </span>
                  <span className="text-accent/40">.... </span>
                  <span className="text-foreground">
                    Allée de la Découverte 10 (B28), B-4000 Liège, Belgium
                  </span>
                </p>
              </div>
              <p className="text-xs text-muted mt-4">
                <span className="text-accent">louette@uliege</span>
                <span className="text-muted">:</span>
                <span className="text-foreground">~</span>
                <span className="text-muted">$ </span>
                <span className="animate-blink text-accent">▌</span>
              </p>
            </div>

            {/* Social Links Row */}
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-border font-mono text-xs tracking-wider text-muted hover:text-accent hover:border-accent/40 transition-all duration-200 uppercase"
                  >
                    <Icon size={14} />
                    {link.label}
                    <ExternalLink size={10} className="opacity-40" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════ */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-muted/60 tracking-wider">
            © {new Date().getFullYear()} ARTHUR LOUETTE{" "}
            <span className="text-accent/30">//</span> ALL RIGHTS RESERVED
          </p>
          <p className="font-mono text-[10px] text-muted/40 tracking-wider">
            SYSTEM STATUS: NOMINAL{" "}
            <span className="inline-block w-1.5 h-1.5 bg-accent/60 animate-pulse-glow ml-1 align-middle" />
          </p>
        </div>
      </footer>
    </>
  );
}
