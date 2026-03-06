import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle2,
  ChevronUp,
  Clock,
  Code2,
  Download,
  ExternalLink,
  Facebook,
  Globe,
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  Send,
  Twitter,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, type Variants, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const EDUCATION = [
  {
    institution: "SRM Institute of Science and Technology",
    degree: "Master of Computer Applications (MCA)",
    period: "2024 – 2026",
    result: "CGPA: 8.82 (till 3rd Semester)",
    highlight: true,
  },
  {
    institution: "JJ College of Arts and Science",
    degree: "Bachelor of Computer Applications (BCA)",
    period: "2021 – 2024",
    result: "CGPA: 6.93",
    highlight: false,
  },
  {
    institution: "SRI Manickam Matric Hr. Sec. School",
    degree: "HSC (Higher Secondary Certificate)",
    period: "2020 – 2021",
    result: "Percentage: 71.17%",
    highlight: false,
  },
  {
    institution: "SSLC",
    degree: "Secondary School Leaving Certificate",
    period: "",
    result: "Percentage: 59.4%",
    highlight: false,
  },
];

const TECH_SKILLS = [
  { name: "Python", icon: "🐍", level: 85 },
  { name: "HTML5", icon: "🌐", level: 90 },
  { name: "CSS", icon: "🎨", level: 80 },
];

const SOFT_SKILLS = [
  { name: "Communication", icon: MessageSquare },
  { name: "Team Work", icon: Users },
  { name: "Time Management", icon: Clock },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = NAV_LINKS.map((l) => l.id);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "nav-glass shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-gradient-cyan font-bold text-xl tracking-tight cursor-pointer"
            onClick={() => scrollTo("home")}
          >
            MI
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.id}
                data-ocid={`nav.${link.id}.link`}
                onClick={() => scrollTo(link.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeSection === link.id
                    ? "text-[oklch(0.78_0.18_195)] bg-[oklch(0.78_0.18_195_/_0.1)]"
                    : "text-[oklch(0.72_0.04_240)] hover:text-[oklch(0.96_0.005_240)] hover:bg-[oklch(0.22_0.04_250)]"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-[oklch(0.72_0.04_240)] hover:text-[oklch(0.96_0.005_240)]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden nav-glass border-t border-[oklch(0.78_0.18_195_/_0.1)]"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  data-ocid={`nav.${link.id}.link`}
                  onClick={() => scrollTo(link.id)}
                  className={`px-4 py-2.5 rounded-md text-sm font-medium text-left transition-all ${
                    activeSection === link.id
                      ? "text-[oklch(0.78_0.18_195)] bg-[oklch(0.78_0.18_195_/_0.1)]"
                      : "text-[oklch(0.72_0.04_240)] hover:text-[oklch(0.96_0.005_240)]"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center hero-gradient overflow-hidden noise-overlay"
    >
      {/* Background geometric elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[oklch(0.78_0.18_195_/_0.04)] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[oklch(0.65_0.2_230_/_0.05)] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[oklch(0.78_0.18_195_/_0.02)] blur-3xl" />
        {/* Grid pattern */}
        <svg
          role="img"
          aria-label="Background grid pattern"
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Background grid pattern</title>
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="oklch(0.78 0.18 195)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="order-2 lg:order-1"
          >
            <motion.div variants={fadeInUp} className="mb-3">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[oklch(0.78_0.18_195_/_0.1)] text-[oklch(0.78_0.18_195)] border border-[oklch(0.78_0.18_195_/_0.25)] tracking-wide">
                👋 Hello, I'm Irshath
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-4"
            >
              <span className="text-[oklch(0.96_0.005_240)]">MOHAMED</span>
              <br />
              <span className="text-gradient-cyan">IRSHATH S</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-[oklch(0.78_0.18_195)] font-semibold tracking-wider mb-5"
            >
              MCA Student &bull; Python Developer
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-[oklch(0.72_0.04_240)] text-base sm:text-lg leading-relaxed max-w-xl mb-8"
            >
              A dedicated Computer Applications graduate with a strong
              foundation in software development and databases, passionate about
              building elegant solutions to complex problems.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Button
                data-ocid="hero.primary_button"
                size="lg"
                className="bg-[oklch(0.78_0.18_195)] hover:bg-[oklch(0.72_0.16_195)] text-[oklch(0.1_0.025_250)] font-semibold px-6 gap-2 shadow-lg shadow-[oklch(0.78_0.18_195_/_0.3)] transition-all hover:shadow-[oklch(0.78_0.18_195_/_0.5)] hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </Button>
              <Button
                data-ocid="hero.secondary_button"
                size="lg"
                variant="outline"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="border-[oklch(0.78_0.18_195_/_0.4)] text-[oklch(0.78_0.18_195)] hover:bg-[oklch(0.78_0.18_195_/_0.1)] hover:border-[oklch(0.78_0.18_195_/_0.7)] px-6 gap-2 transition-all hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </Button>
            </motion.div>

            {/* Floating stats */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-6 mt-10"
            >
              {[
                { value: "8.82", label: "Current CGPA" },
                { value: "3+", label: "Tech Skills" },
                { value: "1+", label: "Projects" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-gradient-cyan">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[oklch(0.6_0.04_240)] uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Outer glow ring - passport size (35x45mm ratio ~3:4) */}
              <div className="profile-ring w-48 h-64 sm:w-60 sm:h-80">
                <div className="profile-inner w-full h-full">
                  <img
                    src="/assets/generated/profile-upright.dim_400x400.jpg"
                    alt="Mohamed Irshath S"
                    className="w-full h-full object-cover object-center"
                    style={{ imageOrientation: "none", transform: "none" }}
                  />
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 card-tier-1 rounded-xl px-4 py-2">
                <div className="text-xs text-[oklch(0.6_0.04_240)]">
                  Academic Achievement
                </div>
                <div className="text-sm font-bold text-[oklch(0.78_0.18_195)]">
                  CGPA 8.82 🎯
                </div>
              </div>
              <div className="absolute -top-4 -right-4 card-tier-1 rounded-xl px-4 py-2">
                <div className="text-xs text-[oklch(0.6_0.04_240)]">
                  Currently
                </div>
                <div className="text-sm font-bold text-[oklch(0.78_0.18_195)]">
                  MCA Student 🎓
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[oklch(0.6_0.04_240)] text-xs">
        <span className="tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[oklch(0.78_0.18_195)] to-transparent" />
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[oklch(0.14_0.028_250)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Photo */}
          <motion.div variants={fadeInUp} className="flex justify-center">
            <div className="relative">
              <div
                className="w-48 sm:w-56 h-64 sm:h-72 rounded-2xl overflow-hidden glow-cyan"
                style={{ border: "2px solid oklch(0.78 0.18 195 / 0.25)" }}
              >
                <img
                  src="/assets/generated/profile-upright.dim_400x400.jpg"
                  alt="Mohamed Irshath S"
                  className="w-full h-full object-cover object-center"
                  style={{ imageOrientation: "none", transform: "none" }}
                />
              </div>
              {/* Decorative corner elements */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[oklch(0.78_0.18_195)]" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[oklch(0.78_0.18_195)]" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 max-w-[40px] bg-[oklch(0.78_0.18_195)]" />
              <span className="text-[oklch(0.78_0.18_195)] text-sm font-semibold tracking-widest uppercase">
                About Me
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-[oklch(0.96_0.005_240)] mb-6">
              Passionate about{" "}
              <span className="text-gradient-cyan">Technology</span>
            </h2>

            <div className="space-y-4 text-[oklch(0.72_0.04_240)] leading-relaxed text-base sm:text-lg">
              <p>
                Hello, I'm{" "}
                <span className="text-[oklch(0.96_0.005_240)] font-semibold">
                  Mohamed Irshath
                </span>
                , currently an MCA student at{" "}
                <span className="text-[oklch(0.78_0.18_195)]">
                  SRM Institute of Science and Technology
                </span>{" "}
                with a secured CGPA of{" "}
                <span className="text-[oklch(0.78_0.18_195)] font-semibold">
                  8.82 till 3rd semester
                </span>
                .
              </p>
              <p>
                I'm passionate about software development and IT technologies.
                I'm seeking exciting opportunities to work, learn, and grow in
                the field of software development.
              </p>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { label: "Location", value: "Pudukkottai, TN" },
                { label: "Degree", value: "MCA (Current)" },
                { label: "Email", value: "mdirshath1224@gmail.com" },
                { label: "Focus", value: "Python Development" },
              ].map((fact) => (
                <div key={fact.label} className="card-tier-2 rounded-lg p-3">
                  <div className="text-xs text-[oklch(0.6_0.04_240)] uppercase tracking-wider mb-1">
                    {fact.label}
                  </div>
                  <div className="text-sm font-medium text-[oklch(0.85_0.08_195)] truncate">
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillBar({
  name,
  icon,
  level,
}: { name: string; icon: string; level: number }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="skill-pill rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <span className="font-semibold text-[oklch(0.85_0.08_195)]">
          {name}
        </span>
        <span className="ml-auto text-xs text-[oklch(0.6_0.04_240)]">
          {level}%
        </span>
      </div>
      <div className="h-1.5 bg-[oklch(0.16_0.03_250)] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[oklch(0.78_0.18_195)] to-[oklch(0.65_0.2_230)] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-[oklch(0.13_0.025_250)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[oklch(0.78_0.18_195)]" />
              <span className="text-[oklch(0.78_0.18_195)] text-sm font-semibold tracking-widest uppercase">
                Skills
              </span>
              <div className="h-px w-12 bg-[oklch(0.78_0.18_195)]" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-[oklch(0.96_0.005_240)]">
              My <span className="text-gradient-cyan">Expertise</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Technical Skills */}
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[oklch(0.78_0.18_195_/_0.1)] border border-[oklch(0.78_0.18_195_/_0.2)]">
                  <Code2 className="w-5 h-5 text-[oklch(0.78_0.18_195)]" />
                </div>
                <h3 className="text-xl font-bold text-[oklch(0.96_0.005_240)]">
                  Technical Skills
                </h3>
              </div>
              <div className="space-y-3">
                {TECH_SKILLS.map((skill) => (
                  <SkillBar key={skill.name} {...skill} />
                ))}
              </div>
            </motion.div>

            {/* Soft Skills */}
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[oklch(0.78_0.18_195_/_0.1)] border border-[oklch(0.78_0.18_195_/_0.2)]">
                  <Users className="w-5 h-5 text-[oklch(0.78_0.18_195)]" />
                </div>
                <h3 className="text-xl font-bold text-[oklch(0.96_0.005_240)]">
                  Soft Skills
                </h3>
              </div>
              <div className="space-y-3">
                {SOFT_SKILLS.map((skill) => (
                  <div
                    key={skill.name}
                    className="skill-pill rounded-xl p-4 flex items-center gap-4"
                  >
                    <div className="p-2.5 rounded-lg bg-[oklch(0.78_0.18_195_/_0.1)]">
                      <skill.icon className="w-5 h-5 text-[oklch(0.78_0.18_195)]" />
                    </div>
                    <span className="font-semibold text-[oklch(0.85_0.08_195)]">
                      {skill.name}
                    </span>
                    <div className="ml-auto">
                      <Badge className="bg-[oklch(0.78_0.18_195_/_0.1)] text-[oklch(0.78_0.18_195)] border-[oklch(0.78_0.18_195_/_0.3)] hover:bg-[oklch(0.78_0.18_195_/_0.2)]">
                        Strong
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional tech badges */}
              <div className="mt-8">
                <p className="text-sm text-[oklch(0.6_0.04_240)] mb-3 uppercase tracking-wider">
                  Also familiar with
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Git",
                    "SQL",
                    "MS Office",
                    "Problem Solving",
                    "Linux basics",
                  ].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-[oklch(0.22_0.04_250)] text-[oklch(0.72_0.04_240)] border border-[oklch(0.28_0.04_250)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section id="education" className="py-24 bg-[oklch(0.14_0.028_250)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[oklch(0.78_0.18_195)]" />
              <span className="text-[oklch(0.78_0.18_195)] text-sm font-semibold tracking-widest uppercase">
                Education
              </span>
              <div className="h-px w-12 bg-[oklch(0.78_0.18_195)]" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-[oklch(0.96_0.005_240)]">
              Academic <span className="text-gradient-cyan">Journey</span>
            </h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-6 top-8 bottom-8 w-px timeline-line hidden sm:block" />

            <div className="space-y-6">
              {EDUCATION.map((edu) => (
                <motion.div
                  key={edu.institution}
                  variants={fadeInUp}
                  className={`relative sm:pl-16 card-hover rounded-2xl p-6 ${
                    edu.highlight ? "card-tier-1 glow-cyan" : "card-tier-2"
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 top-6 hidden sm:flex items-center justify-center w-12 h-12 rounded-full ${
                      edu.highlight
                        ? "bg-[oklch(0.78_0.18_195_/_0.2)] border-2 border-[oklch(0.78_0.18_195)]"
                        : "bg-[oklch(0.22_0.04_250)] border-2 border-[oklch(0.28_0.04_250)]"
                    }`}
                  >
                    <GraduationCap
                      className={`w-5 h-5 ${edu.highlight ? "text-[oklch(0.78_0.18_195)]" : "text-[oklch(0.6_0.04_240)]"}`}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <GraduationCap
                          className={`w-4 h-4 sm:hidden ${edu.highlight ? "text-[oklch(0.78_0.18_195)]" : "text-[oklch(0.6_0.04_240)]"}`}
                        />
                        <h3
                          className={`font-bold tracking-tight ${edu.highlight ? "text-lg sm:text-xl text-[oklch(0.97_0.005_240)]" : "text-base sm:text-lg text-[oklch(0.88_0.03_240)]"}`}
                        >
                          {edu.institution}
                        </h3>
                      </div>
                      <p
                        className={`text-sm font-light tracking-wide mb-3 ${edu.highlight ? "text-[oklch(0.72_0.1_195)]" : "text-[oklch(0.58_0.06_220)]"}`}
                      >
                        {edu.degree}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {edu.period && (
                          <span className="text-xs text-[oklch(0.55_0.03_240)] bg-[oklch(0.20_0.035_250)] border border-[oklch(0.26_0.04_250)] px-2.5 py-1 rounded-md font-medium">
                            {edu.period}
                          </span>
                        )}
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-md ${
                            edu.highlight
                              ? "bg-[oklch(0.78_0.18_195_/_0.18)] text-[oklch(0.82_0.16_195)] border border-[oklch(0.78_0.18_195_/_0.3)]"
                              : "bg-[oklch(0.20_0.035_250)] text-[oklch(0.65_0.04_240)] border border-[oklch(0.26_0.04_250)]"
                          }`}
                        >
                          {edu.result}
                        </span>
                      </div>
                    </div>
                    {edu.highlight && (
                      <span className="shrink-0 self-start px-3 py-1 bg-[oklch(0.78_0.18_195)] text-[oklch(0.1_0.025_250)] text-xs font-bold rounded-full shadow-[0_2px_12px_oklch(0.78_0.18_195_/_0.4)]">
                        Current
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-[oklch(0.13_0.025_250)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[oklch(0.78_0.18_195)]" />
              <span className="text-[oklch(0.78_0.18_195)] text-sm font-semibold tracking-widest uppercase">
                Projects
              </span>
              <div className="h-px w-12 bg-[oklch(0.78_0.18_195)]" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-[oklch(0.96_0.005_240)]">
              Featured <span className="text-gradient-cyan">Work</span>
            </h2>
          </motion.div>

          <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
            <div
              data-ocid="projects.item.1"
              className="card-tier-1 rounded-2xl overflow-hidden card-hover glow-cyan"
            >
              {/* Project header stripe */}
              <div className="h-2 bg-gradient-to-r from-[oklch(0.78_0.18_195)] via-[oklch(0.65_0.2_230)] to-[oklch(0.78_0.18_195)]" />

              <div className="p-8">
                <div className="flex items-start gap-4 mb-5">
                  <div className="p-3 rounded-xl bg-[oklch(0.78_0.18_195_/_0.1)] border border-[oklch(0.78_0.18_195_/_0.2)]">
                    <Globe className="w-7 h-7 text-[oklch(0.78_0.18_195)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[oklch(0.96_0.005_240)] mb-1">
                      Advanced E-Voting System
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Python", "Web App", "Academic Project"].map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-[oklch(0.22_0.04_250)] text-[oklch(0.65_0.08_195)] border border-[oklch(0.28_0.04_250)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-[oklch(0.72_0.04_240)] leading-relaxed mb-6">
                  Developed an Advanced E-Voting System as part of my academic
                  project. The system enables secure digital voting with voter
                  authentication, real-time result tracking, and tamper-proof
                  data management.
                </p>

                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    className="gap-2 border-[oklch(0.78_0.18_195_/_0.4)] text-[oklch(0.78_0.18_195)] hover:bg-[oklch(0.78_0.18_195_/_0.1)] hover:border-[oklch(0.78_0.18_195_/_0.7)]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { actor } = useActor();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const mutation = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.sendMessage(data.name, data.email, data.message);
    },
    onSuccess: () => {
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    },
    onError: () => {
      toast.error("Failed to send message. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <section id="contact" className="py-24 bg-[oklch(0.14_0.028_250)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[oklch(0.78_0.18_195)]" />
              <span className="text-[oklch(0.78_0.18_195)] text-sm font-semibold tracking-widest uppercase">
                Contact
              </span>
              <div className="h-px w-12 bg-[oklch(0.78_0.18_195)]" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-[oklch(0.96_0.005_240)]">
              Get In <span className="text-gradient-cyan">Touch</span>
            </h2>
            <p className="mt-4 text-[oklch(0.72_0.04_240)] max-w-md mx-auto">
              Have a question or want to work together? I'd love to hear from
              you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[oklch(0.96_0.005_240)] mb-5">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: "mdirshath1224@gmail.com",
                      href: "mailto:mdirshath1224@gmail.com",
                    },
                    {
                      icon: Phone,
                      label: "Phone",
                      value: "+91 7599941224",
                      href: "tel:+917599941224",
                    },
                    {
                      icon: MapPin,
                      label: "Location",
                      value: "Pudukkottai, Tamil Nadu",
                      href: null,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-4 p-4 card-tier-2 rounded-xl hover:border-[oklch(0.78_0.18_195_/_0.45)] hover:shadow-[0_4px_20px_oklch(0.78_0.18_195_/_0.07)] transition-all group"
                    >
                      <div className="p-2.5 rounded-lg bg-[oklch(0.78_0.18_195_/_0.1)] group-hover:bg-[oklch(0.78_0.18_195_/_0.15)] transition-colors">
                        <item.icon className="w-5 h-5 text-[oklch(0.78_0.18_195)]" />
                      </div>
                      <div>
                        <div className="text-xs text-[oklch(0.6_0.04_240)] uppercase tracking-wider mb-0.5">
                          {item.label}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm font-medium text-[oklch(0.85_0.04_240)] hover:text-[oklch(0.78_0.18_195)] transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-sm font-medium text-[oklch(0.85_0.04_240)]">
                            {item.value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-sm font-semibold text-[oklch(0.6_0.04_240)] uppercase tracking-wider mb-4">
                  Follow Me
                </h4>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, label: "Facebook", href: "#" },
                    { icon: Twitter, label: "Twitter", href: "#" },
                    {
                      icon: Mail,
                      label: "Email",
                      href: "mailto:mdirshath1224@gmail.com",
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="p-3 bg-[oklch(0.17_0.03_250)] border border-[oklch(0.28_0.04_250)] rounded-xl text-[oklch(0.6_0.04_240)] hover:text-[oklch(0.78_0.18_195)] hover:border-[oklch(0.78_0.18_195_/_0.4)] hover:bg-[oklch(0.78_0.18_195_/_0.08)] transition-all hover:-translate-y-0.5"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={fadeInUp}>
              <div className="card-tier-1 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-[oklch(0.96_0.005_240)] mb-6">
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[oklch(0.72_0.04_240)] uppercase tracking-wider mb-2"
                    >
                      Your Name
                    </label>
                    <Input
                      id="contact-name"
                      data-ocid="contact.input"
                      placeholder="Mohamed Irshath"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                      className="bg-[oklch(0.22_0.04_250)] border-[oklch(0.28_0.04_250)] text-[oklch(0.96_0.005_240)] placeholder:text-[oklch(0.45_0.03_240)] focus:border-[oklch(0.78_0.18_195)] focus:ring-[oklch(0.78_0.18_195_/_0.2)]"
                      disabled={mutation.isPending}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[oklch(0.72_0.04_240)] uppercase tracking-wider mb-2"
                    >
                      Email Address
                    </label>
                    <Input
                      id="contact-email"
                      data-ocid="contact.email.input"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, email: e.target.value }))
                      }
                      className="bg-[oklch(0.22_0.04_250)] border-[oklch(0.28_0.04_250)] text-[oklch(0.96_0.005_240)] placeholder:text-[oklch(0.45_0.03_240)] focus:border-[oklch(0.78_0.18_195)] focus:ring-[oklch(0.78_0.18_195_/_0.2)]"
                      disabled={mutation.isPending}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-[oklch(0.72_0.04_240)] uppercase tracking-wider mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="contact-message"
                      data-ocid="contact.textarea"
                      placeholder="Tell me about your project or opportunity..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, message: e.target.value }))
                      }
                      rows={5}
                      className="bg-[oklch(0.22_0.04_250)] border-[oklch(0.28_0.04_250)] text-[oklch(0.96_0.005_240)] placeholder:text-[oklch(0.45_0.03_240)] focus:border-[oklch(0.78_0.18_195)] focus:ring-[oklch(0.78_0.18_195_/_0.2)] resize-none"
                      disabled={mutation.isPending}
                    />
                  </div>

                  {/* Status states */}
                  {mutation.isPending && (
                    <div
                      data-ocid="contact.loading_state"
                      className="flex items-center gap-2 text-sm text-[oklch(0.78_0.18_195)] py-2"
                    >
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending your message...
                    </div>
                  )}

                  {mutation.isSuccess && (
                    <div
                      data-ocid="contact.success_state"
                      className="flex items-center gap-2 text-sm text-[oklch(0.7_0.2_160)] bg-[oklch(0.7_0.2_160_/_0.08)] border border-[oklch(0.7_0.2_160_/_0.3)] rounded-lg py-2 px-3"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Message sent successfully!
                    </div>
                  )}

                  {mutation.isError && (
                    <div
                      data-ocid="contact.error_state"
                      className="flex items-center gap-2 text-sm text-[oklch(0.7_0.22_25)] bg-[oklch(0.7_0.22_25_/_0.08)] border border-[oklch(0.7_0.22_25_/_0.3)] rounded-lg py-2 px-3"
                    >
                      <AlertCircle className="w-4 h-4" />
                      Failed to send. Please try again.
                    </div>
                  )}

                  <Button
                    data-ocid="contact.submit_button"
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full bg-[oklch(0.78_0.18_195)] hover:bg-[oklch(0.72_0.16_195)] text-[oklch(0.1_0.025_250)] font-semibold gap-2 shadow-lg shadow-[oklch(0.78_0.18_195_/_0.25)] transition-all hover:shadow-[oklch(0.78_0.18_195_/_0.4)] disabled:opacity-60"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[oklch(0.11_0.025_252)] border-t border-[oklch(0.28_0.04_250)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="text-gradient-cyan font-bold text-lg mb-1">
              Mohamed Irshath S
            </div>
            <p className="text-xs text-[oklch(0.6_0.04_240)]">
              MCA Student · Python Developer · Pudukkottai, TN
            </p>
          </div>
          <p className="text-xs text-[oklch(0.5_0.03_240)] text-center">
            © {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[oklch(0.78_0.18_195)] hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-[oklch(0.78_0.18_195)] text-[oklch(0.1_0.025_250)] shadow-lg shadow-[oklch(0.78_0.18_195_/_0.3)] hover:bg-[oklch(0.72_0.16_195)] transition-all hover:shadow-[oklch(0.78_0.18_195_/_0.5)] hover:-translate-y-0.5"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[oklch(0.13_0.025_250)]">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "oklch(0.17 0.03 250)",
            border: "1px solid oklch(0.28 0.04 250)",
            color: "oklch(0.96 0.005 240)",
          },
        }}
      />
    </div>
  );
}
