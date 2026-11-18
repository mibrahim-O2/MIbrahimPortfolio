# Add a Certification

**File to edit:** `data/certificates.js`
**Displayed by:** `sections/EducationSection.js` (the certifications list in the homepage "Education & certifications" section, and `/certificates`)

Each certificate is one object in the `certificatesData` array, **newest first**.

---

## Template

```js
  {
    id: "aws-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issuerVia: null,
    date: "Dec 2026",
    topics: "One sentence about what the certificate covers.",
    credentialUrl: "https://www.credly.com/badges/xxxxxxxx",
    credentialText: "",
    image: "/certificates/aws-cloud-practitioner.webp",
    logo: "/logos/aws-logo.png",
    viaLogo: "",
    category: "Other"
  },
```

## Fields

| Field | What it does | Example from this repo |
|---|---|---|
| `id` | Unique internal name | `"google-ai-specialization"` |
| `title` | Certificate name | `"Google AI Specialization"` |
| `issuer` | Organisation that issued it | `"Google"` |
| `issuerVia` | Platform it was taken on, shown as a small "via" chip. `null` when none. | `"Coursera"` |
| `date` | Date text as shown | `"Jul 2026"` |
| `topics` | One-sentence summary of what it covers | |
| `credentialUrl` | **Public verification link.** Shows a **"View credential"** button. `""` = no button. | Coursera share link |
| `credentialText` | Certificate number or verification note, shown in small mono text under the issuer. `""` = hidden. | `"Certificate No. 2026050256619"` |
| `image` | Image of the certificate. Shows a **"View certificate"** button that opens it full-screen. `""` = no button. | `"/certificates/piaic-certificate.webp"` |
| `logo` | Issuer logo | `"/logos/google-logo.jpg"` |
| `viaLogo` | Platform logo. **Not displayed** by the current design (kept for compatibility) | `"/logos/coursera-logo.jpg"` |
| `category` | `"AI/ML"` or `"Other"`. **Not displayed** by the current design (kept for grouping later) | `"AI/ML"` |

## Verification links

Prefer links anyone can open without logging in:

- Coursera: open the certificate → **Share** → copy the `coursera.org/share/…` or `coursera.org/verify/…` link.
- Credly: the public badge URL.
- Google / Microsoft / AWS: the public credential or transcript link.

If there is no public link, leave `credentialUrl: ""` and put the certificate number in `credentialText`.

## Certificate images

1. Export the certificate as an image (screenshot or PDF → image).
2. Landscape, ~1600 px wide, WebP, under ~300 KB.
3. Upload to **`public/certificates/`**, named after the id: `aws-cloud-practitioner.webp`.
4. Reference it as `image: "/certificates/aws-cloud-practitioner.webp"`.

Hide personal data you don't want public (date of birth, address, ID numbers) before uploading.

## Logos

Square, ~200×200, PNG/WebP/JPG, in `public/logos/`. Reuse existing ones when possible:
`google-logo.jpg`, `coursera-logo.jpg`, `piaiclogo.png`, `sts-logo.png`.

## Common mistakes

| Mistake | Result |
|---|---|
| `issuerVia: ""` with a `viaLogo` | Prefer `null` and `viaLogo: ""` when there's no platform |
| Private/login-only verification link | Visitors can't verify it |
| Image path missing the leading `/` | Broken image |

## Prompt for an AI agent

```text
Read docs/ADD-CERTIFICATION.md and add this certificate at the top of data/certificates.js:
title: … / issuer: … / via: … / date: … / topics: …
verification link: … / certificate number: …
image: public/certificates/<file> (uploaded) or none / logo: public/logos/<file>
category: AI/ML or Other
Do not modify components. Work on a branch and give me the Preview URL.
```
