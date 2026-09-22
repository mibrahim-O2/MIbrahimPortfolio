// Education entries, newest first. Displayed by components/EducationPath.js.
// Shape: { id, period, degree, short (label on the mobile tabs), title, institutionName, chip, status?, campusImage, logos: [{ src, alt }], summary, metas: [{ label, value }] }
// `logos` holds 1 or 2 logos, shown left to right. Add `status: "In progress"` to show a pulsing badge.
// A meta value like "94%" or "82.6%" is animated as a count-up; any other value is shown as text.
export const educationData = [
  {
    id: "bscs",
    period: "2023 – 2027",
    status: "In progress",
    degree: "BSCS",
    short: "BSCS",
    title: "Bachelor of Science in Computer Science",
    institutionName: "IMCS, University of Sindh",
    chip: "Jamshoro, Sindh",
    campusImage: "/logos/UOSimage.webp",
    logos: [
      { src: "/logos/UOSlogo.png", alt: "University of Sindh logo" },
      { src: "/logos/IMCSLogo.png", alt: "IMCS logo" }
    ],
    summary: "Institute of Mathematics and Computer Science, a department dedicated to teaching and research in computer science, AI, and mathematics at the University of Sindh, Jamshoro, one of Pakistan's oldest universities.",
    metas: [
      { label: "Focus", value: "Artificial intelligence, systems engineering, and software architecture" },
      { label: "Strength", value: "Breaking down complex problems into solutions that scale" },
      { label: "Outcome", value: "A disciplined, production-minded engineering approach" }
    ]
  },
  {
    id: "piaic",
    period: "2025 – 2026",
    degree: "Professional Program",
    short: "PIAIC",
    title: "Robotic & Agentic AI Program (Year 1)",
    institutionName: "Presidential Initiative for Artificial Intelligence and Computing",
    chip: "PIAIC, Karachi",
    campusImage: "/logos/piaic-pic.webp",
    logos: [{ src: "/logos/piaiclogo.png", alt: "PIAIC logo" }],
    summary: "Completed one year of foundational training in building AI agents, multi-agent frameworks, and integrating intelligent automation with robotic systems. Continued independently while prioritizing the final year project.",
    metas: [
      { label: "Core Focus", value: "Robotic & Agentic AI" },
      { label: "Coverage", value: "Foundations and core concepts" },
      { label: "Shift", value: "From conventional software to physical and digital AI automation" }
    ]
  },
  {
    id: "fsc",
    period: "2019 – 2021",
    degree: "FSc Pre-Engineering",
    short: "FSc",
    title: "Higher Secondary Education",
    institutionName: "Memon Academy Higher Secondary School, Shahdadpur",
    chip: "BISE Nawabshah",
    campusImage: "/logos/campusimage.webp",
    logos: [
      { src: "/logos/collegeLogo.png", alt: "Memon Academy logo" },
      { src: "/logos/bise-nawabsha.png", alt: "BISE Nawabshah logo" }
    ],
    summary: "A rigorous pre-engineering foundation in mathematics, physics, and chemistry, built alongside disciplined study habits.",
    metas: [
      { label: "Result", value: "94%" },
      { label: "Core Subjects", value: "Mathematics, Physics, Chemistry" },
      { label: "Strength", value: "Quantitative reasoning" }
    ]
  },
  {
    id: "matric",
    period: "2017 – 2019",
    degree: "Matriculation (Science)",
    short: "Matric",
    title: "Secondary School Education",
    institutionName: "Memon Academy Higher Secondary School, Shahdadpur",
    chip: "BISE Mirpurkhas",
    campusImage: "/logos/campusimage.webp",
    logos: [
      { src: "/logos/collegeLogo.png", alt: "Memon Academy logo" },
      { src: "/logos/bise-mirourkhas.png", alt: "BISE Mirpurkhas logo" }
    ],
    summary: "The foundation of my academic journey, where discipline, consistency, and core science fundamentals took root.",
    metas: [
      { label: "Result", value: "82.6%" },
      { label: "Group", value: "Science" },
      { label: "Strength", value: "Consistency and focus" }
    ]
  }
];
