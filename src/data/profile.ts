// ─────────────────────────────────────────────────────────────
//  ALL portfolio content lives in this one file.
//  Edit the values below — every section of the site updates.
//  Anything marked TODO is a placeholder: replace it with your
//  real details (or delete the entry) before sharing the site.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Sudhanshu Kumar",
  role: "Full Stack Developer",
  tagline:
    "I build **secure, scalable web applications** end to end, from polished **React** interfaces to **Spring Boot** APIs backed by **PostgreSQL**, **MongoDB** and **Redis**.",
  email: "", // TODO: your email for recruiters, e.g. "you@gmail.com" — leave empty to hide email buttons
  phone: "", // optional, e.g. "+91 98765 43210" — leave empty to hide
  // TODO: link to YOUR resume (e.g. a Google Drive PDF shared as "Anyone with the link").
  // Resume buttons stay hidden while this is empty. The old link opened "Piyush_Singh.pdf".
  resumeUrl: "",
  links: {
    github: "https://github.com/ATSudhanshuKumar",
    linkedin: "https://www.linkedin.com/in/sudhanshu-kumar-54b648263/",
  },
  // Shows "See more on GitHub" under Projects. Turn on once your GitHub has public repos.
  showGithubLink: false,
};

export const about = {
  // Wrap words in **double asterisks** to highlight them in blue.
  paragraphs: [
    "I'm a **Full Stack Developer** who enjoys turning ideas into clean, reliable products, from polished **React** interfaces to secure **Spring Boot** APIs backed by **PostgreSQL**, **MongoDB** and **Redis**.",
    "I care about maintainable code, thoughtful architecture and features people genuinely enjoy using. I'm looking for a team where I can take **ownership end to end**, keep learning, and make a real impact.",
  ],
  // Core strengths shown as small tiles under the paragraphs
  strengths: ["Clean Code", "Scalable APIs", "Secure Auth", "Responsive UI"],
  // Stack chips shown on the dark card
  stack: ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL", "MongoDB", "Redis", "Keycloak"],
  // The two stat tiles (experience, roles held) are calculated from `experience` below.
};

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Java", "JavaScript", "TypeScript", "HTML", "CSS"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Vite"] },
  { group: "Backend", items: ["Spring Boot", "REST APIs", "Keycloak"] },
  { group: "Databases", items: ["PostgreSQL", "MongoDB", "Redis"] },
  { group: "Tools", items: ["Git", "GitHub", "Postman", "VS Code"] },
];

// One entry per company; roles newest first. Dates are "YYYY-MM"; leave `end`
// out for a current role (shows "Present").
export const experience: {
  company: string;
  type: string;
  mode: string;
  roles: {
    title: string;
    start: string;
    end?: string;
    summary?: string;
    focus?: { title: string; text: string; tech?: string[] }[];
    points: string[];
  }[];
}[] = [
  {
    company: "Amplied Technologies LLP",
    type: "Full-time",
    mode: "On-site",
    roles: [
      {
        title: "Full Stack Engineer",
        start: "2026-09",
        summary:
          "Contributed to building modern, scalable, and high-performance web applications, focusing on delivering seamless user experiences and reliable backend functionality.",
        focus: [
          {
            title: "Frontend Development",
            text: "Developing responsive, intuitive, and user-centric interfaces using React.js, Vite, and Next.js. Focused on reusable components, maintainable code, and performance-oriented UI development.",
            tech: ["React", "Vite", "Next.js", "JavaScript"],
          },
          {
            title: "Backend Development",
            text: "Building backend services and RESTful APIs using Java and Spring Boot, with an emphasis on clean architecture, efficient business logic, and reliable API integration.",
            tech: ["Java", "Spring Boot", "REST APIs"],
          },
        ],
        points: [
          "Develop and maintain end-to-end web application features across frontend and backend systems.",
          "Integrate frontend interfaces with backend APIs to deliver seamless application workflows.",
          "Build reusable UI components and structured backend services.",
          "Debug technical issues and improve application performance, reliability, and maintainability.",
          "Collaborate with team members to deliver quality software aligned with project requirements.",
        ],
      },
      {
        title: "Trainee - Full Stack",
        start: "2026-02",
        end: "2026-08",
        summary:
          "Worked on frontend and backend development, gained hands-on experience with modern web technologies, and contributed to real projects under the guidance of senior developers.",
        points: [],
      },
    ],
  },
];

export const projects: {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  featured?: boolean;
}[] = [
  // TODO: add 2–5 of your best real projects. Make each repo PUBLIC on GitHub
  // and put its repo URL in `github` (your GitHub currently has 0 public repos).
  {
    title: "Personal Portfolio",
    description:
      "This site — a responsive, animated portfolio built with React, TypeScript, Tailwind CSS and Framer Motion, with all content driven from a single data file.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    featured: true,
  },
];

export const education: {
  degree: string;
  school: string;
  period: string;
  detail?: string;
}[] = [
  {
    degree: "B.Tech in Computer Science and Information Technology",
    school: "Reva University",
    period: "2021 – 2025",
    detail: "",
  },
];
