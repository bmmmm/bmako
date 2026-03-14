# CLAUDE.md — Bartosz Makosch Website

## Skills

This project uses the official Anthropic **frontend-design** skill.
Skill file: `.claude/skills/frontend-design/SKILL.md`

Apply this skill whenever building or refining any visual component, section, or layout.
Key mandate: no generic AI aesthetics, no predictable purple gradients, no overused fonts.
Every design choice must feel intentional and specific to this project's identity.

Professional personal/business website for a German-speaking tech consultant (Kleingewerbe).
Target audience: potential clients (SMBs, associations, private individuals).
Goal: convey quality, trust, and competence — clean, not overloaded.

---

## Design Principles

- **Less is more.** Every element must earn its place. Resist adding features or cards "just because."
- **Quality over quantity.** Fewer services presented well > many services listed cheaply.
- **Trust signals over flash.** No gimmicks (3D flips, excessive animations). Subtle, purposeful motion only.
- **Static HTML first.** Do not load page content via JavaScript (`moduleLoader.js` pattern is an anti-pattern here). Static HTML is faster, SEO-friendly, and simpler to maintain.
- **Mobile-first.** Design for small screens first, then enhance for larger.

---

## Tech Stack

- **HTML5** — semantic, static, no JS-injected content
- **CSS3** — custom properties, Grid, Flexbox, no frameworks
- **Vanilla JS** — only for interactions (theme toggle, email reveal, scroll effects)
- **No build tools, no npm, no frameworks** — keep it deployable by opening index.html

---

## Visual Identity

### Color Palette (preferred direction)
Avoid generic Material Design purple. Use a more refined palette:

```css
/* Dark theme */
--primary: #4f7cff;         /* Slate blue — professional, trustworthy */
--accent: #f0a500;          /* Warm amber — distinctive, warm */
--background: #0f1117;      /* Near-black, not pure black */
--card: #1a1d27;            /* Slightly lighter than bg */
--text: #e8eaf0;            /* Slightly warm white */
--text-secondary: #8b90a0;  /* Muted */

/* Light theme */
--primary: #2d5be3;
--accent: #d4880a;
--background: #f8f7f4;      /* Warm off-white, not pure white */
--card: #ffffff;
--text: #1a1d27;
--text-secondary: #5a6070;
```

### Typography
- **Body:** `Inter` — clean, modern, highly legible
- **Headings:** `Fraunces` or `DM Serif Display` — distinctive, premium feel
- Google Fonts: `family=Inter:wght@400;500;600&family=Fraunces:opsz,wght@9..144,700`

### Icons
- Use SVG icons from **Lucide** or **Heroicons** — never emoji for service cards
- Icons should be 24–32px, stroke-based (not filled), consistent weight

### Spacing
- Section padding: `5rem 0` desktop, `3rem 0` mobile
- Card padding: `2rem`
- Max content width: `900px` (tighter than 1200px for better readability)

---

## Content Decisions

### Services — maximum 6 cards
Current 10 is too many. Preferred grouping:
1. Apple-Ökosystem
2. Microsoft Cloud (Teams, Azure, M365)
3. Datenschutz & Selfhosting (merged)
4. Prozessoptimierung & KI-Beratung (merged)
5. SmartHome & IoT
6. Coding & Multi-Plattform-Support (merged)

3D-Druck can be a small footnote or removed — doesn't fit the consultant positioning.

### Hero
- Profile photo: static circular image, no flip animation
- Subtitle: make it a value proposition, not just a job title
  - e.g. "Ich mache Technologie einfach." or "Technologie, die wirklich funktioniert."
- Navigation: minimal links below subtitle (keep as-is structurally, just style better)

### About
- Keep the 3 detail cards (Projekte, Ausbildung, Sprachen)
- References: present as named project outcomes, not bullet points
- Bio: 2 short paragraphs max — current text is fine

### Contact
- Keep email obfuscation (good for spam protection)
- Fix typo: `"...für Ihre individuellen Anforderungen ."` → remove space before period

---

## Animations & Interactions

- Section fade-in on scroll: ✅ keep (subtle, purposeful)
- Back-to-top button: ✅ keep
- Theme toggle: ✅ keep
- Service card hover lift: ✅ keep (reduce from -10px to -6px)
- Profile image 3D flip: ❌ remove — replace with subtle scale on hover
- Email reveal button: ✅ keep (good UX + spam protection)

---

## File Structure (target)

```
/
├── index.html          ← all HTML static here, no moduleLoader
├── css/
│   ├── base.css        ← reset, variables, typography, layout
│   └── components.css  ← all component styles
├── js/
│   ├── theme.js        ← theme toggle only
│   └── main.js         ← scroll effects, email reveal, back-to-top
├── favicon/
└── CLAUDE.md
```

Remove: `moduleLoader.js` — HTML goes directly in `index.html`.

---

## SEO & Performance

- All content must be in static HTML (not JS-generated) for search engine indexing
- `<meta name="description">` must reflect the actual service offering
- Images: use `loading="eager"` for above-the-fold, `loading="lazy"` for below
- Fonts: use `display=swap` on Google Fonts
- No unused CSS — keep stylesheets lean

---

## Language

- Website language: **German** (`lang="de"`)
- All UI text in German
- Code comments can be English

---

## Do Not

- Add a contact form (email reveal is intentional and simpler)
- Add JavaScript frameworks or libraries
- Load page content via JS (no moduleLoader pattern)
- Use emoji as icons in service cards
- Add more than 6 service cards
- Use generic Material Design purple color palette
- Add tracking scripts or analytics
- Over-engineer: no build pipelines, no TypeScript, no bundlers
