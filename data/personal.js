import { aboutParagraphs } from '@/data/about';

export const personalInfo = {
  name: "Muhammad Ibrahim",
  greeting: "Welcome, I'm",
  title: "Agentic AI & Automation Engineer",
  // Hero: big headline (the words in headlineAccent get the copper gradient) and the paragraph under it
  headline: "I build AI agents and automation that businesses can actually trust.",
  headlineAccent: "AI agents",
  intro: "Voice agents that book appointments, multi-agent systems that run business operations, a security agent that proves its findings: I design autonomous software where every risky action is approved, verified or audited.",
  // Résumé PDF (e.g. "/resume.pdf" after uploading public/resume.pdf). Empty = no résumé button.
  resumeUrl: "",
  statusPill: "Open to Work: Agentic AI, Automation and Full-Stack Roles",
  avatarUrl: "/images/profile/portrait.webp", // self-hosted copy of the GitHub profile photo (460x460)
  location: "Pakistan",
  email: "contact@mibrahimdev.tech",
  gpa: "3.6 CGPA",
  bio: aboutParagraphs.map((paragraph) => paragraph.text),
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/mibrahim-O2",
      icon: "fab fa-github"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/muhammad-ibrahim-o2",
      icon: "fab fa-linkedin-in"
    },
    {
      name: "Email",
      url: "mailto:contact@mibrahimdev.tech",
      icon: "fas fa-envelope"
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@mIbrahim_02",
      icon: "fab fa-youtube"
    },
    {
      name: "X",
      url: "https://x.com/MIbraheem_02",
      icon: "" // no Font Awesome glyph in the loaded 6.4.0; rendered by components/XIcon.js
    }
  ]
};
