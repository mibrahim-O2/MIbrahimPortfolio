import { aboutParagraphs } from '@/data/about';

export const personalInfo = {
  name: "Muhammad Ibrahim",
  greeting: "Welcome, I'm",
  title: "Full-Stack & AI Integration Engineer",
  statusPill: "Open to Work: Full-Stack and AI Engineering Roles",
  avatarUrl: "https://github.com/mibrahim-O2.png?size=400",
  location: "Sanghar, Pakistan",
  email: "mibrahimkhalid306@gmail.com",
  phone: "+92 324 2991303",
  gpa: "3.6 CGPA",
  typingSvgUrl:"https://readme-typing-svg.herokuapp.com?color=%23E5B450&size=32&center=false&vCenter=true&width=760&weight=800&lines=AI+is+not+the+future.+AI+is+the+present.;AI+Integration+%26+Automation;Building+Scalable+Systems;",
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
      url: "mailto:mibrahimkhalid306@gmail.com",
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
  ],
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Volunteer", href: "#volunteer" },
    { label: "Certificates", href: "#certificates" },
    { label: "Contact", href: "#contact" }
  ]
};
