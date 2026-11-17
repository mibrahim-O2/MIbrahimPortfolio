import { aboutParagraphs } from '@/data/about';

export const personalInfo = {
  name: "Muhammad Ibrahim",
  greeting: "Welcome, I'm",
  title: "Full-Stack & AI Integration Engineer",
  // Hero: big headline (the words in headlineAccent get the copper gradient) and the paragraph under it
  headline: "I build AI systems, optimization tools and full-stack web applications.",
  headlineAccent: "AI systems",
  intro: "I turn research-grade ideas into real, working software: from genetic-algorithm schedulers and LLM-powered learning platforms to security tooling that proves its findings.",
  // Résumé PDF (e.g. "/resume.pdf" after uploading public/resume.pdf). Empty = no résumé button.
  resumeUrl: "",
  statusPill: "Open to Work: Full-Stack and AI Engineering Roles",
  avatarUrl: "https://github.com/mibrahim-O2.png?size=400",
  location: "Pakistan",
  email: "contact@mibrahimdev.tech",
  phone: "+92 324 2991303",
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
      name: "Phone",
      url: "tel:+923242991303",
      icon: "fas fa-phone"
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
