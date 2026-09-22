// Certifications, newest first. Displayed by components/CertificateWall.js.
// Shape: { id, title, issuer, issuerVia, date, topics, credentialUrl, credentialText, image, logo, viaLogo, category }
//  - issuerVia: platform name shown as a small "via" chip (null when there is none)
//  - credentialUrl: public verification link, "" when there is none (no button is rendered)
//  - credentialText: text shown in a mono chip (e.g. "Certificate No. 123"), "" when there is none
//  - image: path of the certificate image in /public ("" = no "View Certificate" button)
//  - logo / viaLogo: issuer and platform logos in /public/logos (exact file names and casing)
//  - category: "AI/ML" or "Other"
export const certificatesData = [
  {
    id: "google-ai-specialization",
    title: "Google AI Specialization",
    issuer: "Google",
    issuerVia: "Coursera",
    date: "Jul 2026",
    topics: "Generative AI tools for research, writing, content creation, data analysis, and app building, with a focus on effective prompting and planning.",
    credentialUrl: "https://coursera.org/share/077eb557e47d2f7f71d96e263f4d8f56",
    credentialText: "",
    image: "",
    logo: "/logos/google-logo.jpg",
    viaLogo: "/logos/coursera-logo.jpg",
    category: "AI/ML"
  },
  {
    id: "piaic-prompt-context-l1",
    title: "Prompt and Context Engineering: Level 1 Developer",
    issuer: "Presidential Initiative for Artificial Intelligence and Computing (PIAIC)",
    issuerVia: null,
    date: "Jan 2026",
    topics: "Foundations of prompt and context engineering for building applications with large language models.",
    credentialUrl: "",
    credentialText: "Certificate No. 2026050256619",
    image: "/certificates/piaic-certificate.webp",
    logo: "/logos/piaiclogo.png",
    viaLogo: "",
    category: "AI/ML"
  },
  {
    id: "google-it-automation-python",
    title: "Google IT Automation with Python Specialization",
    issuer: "Google",
    issuerVia: "Coursera",
    date: "Sep 2025",
    topics: "Python scripting, operating system automation, Git and GitHub, debugging and troubleshooting, configuration management, and automating real-world IT tasks.",
    credentialUrl: "https://coursera.org/share/db286114502274e1d9ca6dd5213c42a3",
    credentialText: "",
    image: "",
    logo: "/logos/google-logo.jpg",
    viaLogo: "/logos/coursera-logo.jpg",
    category: "Other"
  },
  {
    id: "google-cybersecurity",
    title: "Google Cybersecurity Specialization",
    issuer: "Google",
    issuerVia: "Coursera",
    date: "Aug 2025",
    topics: "Network security, Linux and SQL, threat and vulnerability analysis, incident detection and response, and Python automation for security tasks.",
    credentialUrl: "https://coursera.org/share/7b389a0226a21040ab9018cc716218a1",
    credentialText: "",
    image: "",
    logo: "/logos/google-logo.jpg",
    viaLogo: "/logos/coursera-logo.jpg",
    category: "Other"
  },
  {
    id: "sts-intermediate-sindh",
    title: "STS Intermediate Category Certificate (Government of Sindh)",
    issuer: "SIBA Testing Services (STS)",
    issuerVia: null,
    date: "Jul 2023",
    topics: "Government of Sindh eligibility test certificate at the Intermediate category, valid for three years.",
    credentialUrl: "",
    credentialText: "Verify through the QR code on the certificate",
    image: "/certificates/sts-certificate.webp",
    logo: "/logos/sts-logo.png",
    viaLogo: "",
    category: "Other"
  }
];
