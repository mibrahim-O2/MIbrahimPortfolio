// Education entries, newest first. Displayed by components/EducationTimeline.js.
// Shape: { id, period, degree, short, title, institutionName, chip, status?, campusImage, logos: [{ src, alt }], summary, metas: [{ label, value }] }
// `metas` holds facts such as a final result ({ label: "Result", value: "94%" }); leave it [] when there is none.
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
    summary: "Institute of Mathematics and Computer Science (IMCS) at the University of Sindh, Jamshoro, with a focus on artificial intelligence and software engineering.",
    metas: []
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
    metas: []
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
    summary: "",
    metas: [
      { label: "Result", value: "94%" }
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
    summary: "",
    metas: [
      { label: "Result", value: "82.6%" }
    ]
  }
];
