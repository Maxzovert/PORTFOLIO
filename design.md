# Portfolio Design System — Editorial Blue/Black Collage Style

Use this file as the implementation reference for recreating the same visual direction in code: bold editorial typography, monochrome cutout photography, off-white paper texture, deep cobalt blue, and asymmetrical collage layouts.

---

## 1. Core Style Direction

**Visual mood:** modern editorial portfolio, fashion/UGC creator style, high-contrast, magazine-like, slightly raw, premium but creative.

**Main characteristics:**
- Huge condensed uppercase titles.
- Off-white paper background with subtle grain.
- Black-and-white images with cutout/mask treatment.
- Deep cobalt blue used as the main brand accent.
- Thin header lines and small uppercase navigation labels.
- Handwritten script typography layered over large block text.
- Abstract texture marks, scribbles, stars, arrows, and rough image edges.
- Strong asymmetry: text and images intentionally overlap.

---

## 2. Color Palette

### Primary Colors

| Purpose | Hex | Usage |
|---|---:|---|
| Off-white background | `#F5F5F4` | Main page background |
| Pure black | `#010101` | Dark sections, typography, dividers |
| Editorial blue | `#3A4870` | Hero title, section titles, highlights |
| Soft paper gray | `#DEDEDF` | Texture, panels, subtle borders |
| Mid gray | `#9B9DA3` | Image overlays, secondary texture |
| Charcoal | `#212227` | Text on light background, dark details |

### Recommended CSS Variables

```css
:root {
  --bg-paper: #F5F5F4;
  --black: #010101;
  --charcoal: #212227;
  --blue: #3A4870;
  --gray-light: #DEDEDF;
  --gray-mid: #9B9DA3;
  --white: #FFFFFF;
}
```

### Color Distribution

Use this approximate ratio:

```text
60% off-white / paper texture
20% black
15% blue
5% gray texture and decorative marks
```

Do not overuse blue. It should feel bold because it appears in large typography, not because it appears everywhere.

---

## 3. Typography

The design depends heavily on typography contrast.

### Font Roles

| Role | Recommended Font Type | Examples |
|---|---|---|
| Main hero / big titles | Extra-condensed bold sans-serif | Bebas Neue, Anton, Druk Condensed, Oswald Bold |
| Script accent | Handwritten signature script | Brittany Signature, Amsterdam, Better Saturday, Playlist Script |
| Body text | Clean neutral sans-serif | Inter, Helvetica Neue, Neue Haas Grotesk, Arial |
| Small header labels | Compact uppercase sans-serif | Inter SemiBold, Helvetica Bold |

### Type Scale

For a responsive web portfolio:

```css
.hero-title {
  font-family: "Bebas Neue", "Anton", sans-serif;
  font-size: clamp(96px, 18vw, 240px);
  line-height: 0.78;
  letter-spacing: -0.04em;
  text-transform: uppercase;
}

.section-title {
  font-family: "Bebas Neue", "Anton", sans-serif;
  font-size: clamp(56px, 10vw, 150px);
  line-height: 0.82;
  letter-spacing: -0.035em;
  text-transform: uppercase;
}

.script-word {
  font-family: "Brittany Signature", "Amsterdam", cursive;
  font-size: clamp(48px, 8vw, 120px);
  line-height: 0.8;
  font-weight: 400;
}

.body-copy {
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  font-size: clamp(12px, 1.1vw, 16px);
  line-height: 1.25;
  letter-spacing: -0.02em;
}

.micro-label {
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  font-size: 11px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

### Typography Rules

- Main titles should be very large and compressed.
- Keep title line-height tight: `0.75–0.9`.
- Use uppercase for big words: `PORTFOLIO`, `ABOUT ME`, `STRENGTHS`, `PROJECT 01`, `EXPERIENCE`.
- Script words should overlap or sit very close to bold text.
- Body text should be small and compact.
- Header labels should be tiny, uppercase, and spaced far apart.

---

## 4. Layout System

### Canvas / Section Ratio

The reference design is landscape slide-based, but for a web portfolio use full-screen sections.

Recommended section sizing:

```css
.section {
  min-height: 100vh;
  padding: clamp(24px, 4vw, 56px);
  position: relative;
  overflow: hidden;
}
```

For individual portfolio panels/cards:

```css
.portfolio-panel {
  aspect-ratio: 16 / 9;
  width: 100%;
  background: var(--bg-paper);
  position: relative;
  overflow: hidden;
}
```

For Instagram/carousel style:

```css
.carousel-slide {
  width: 1080px;
  height: 1350px;
}
```

---

## 5. Header Placement

Every page/section should have a thin editorial top header.

### Header Structure

Left:
- Three small dots or menu dots.

Center:
- `UGC CREATOR` / your role / your studio category.

Right:
- Your name or brand name.

### CSS

```css
.top-header {
  position: absolute;
  top: 28px;
  left: 32px;
  right: 32px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  z-index: 20;
}

.header-dots {
  justify-self: start;
  display: flex;
  gap: 6px;
}

.header-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--black);
}

.header-center,
.header-right {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.header-center {
  justify-self: center;
}

.header-right {
  justify-self: end;
}
```

---

## 6. Hero Section — Exact Placement Guide

The hero is the most important part of this style.

### Hero Composition

Visual hierarchy:

1. Huge `PORTFOLIO` word in blue.
2. Script word `Creative` placed above and overlapping the title.
3. Black-and-white person/product image placed in front of the title.
4. Decorative black star on the right.
5. Subtle gray paper marks in the corners.
6. Minimal header at top.

### Hero Layout

```text
┌──────────────────────────────────────────────┐
│ dots          ROLE                   NAME    │
│                                              │
│               Creative                       │
│      PORTFOLIO PORTFOLIO PORTFOLIO           │
│             [cutout image overlaps title]    │
│                                      *       │
│                         gray texture mark    │
└──────────────────────────────────────────────┘
```

### Hero CSS

```css
.hero {
  min-height: 100vh;
  background: var(--bg-paper);
  position: relative;
  overflow: hidden;
  padding: 32px;
}

.hero-title {
  position: absolute;
  left: 50%;
  top: 39%;
  transform: translate(-50%, -50%);
  width: max-content;
  color: var(--blue);
  z-index: 2;
  font-family: "Bebas Neue", "Anton", sans-serif;
  font-size: clamp(110px, 19vw, 260px);
  line-height: 0.75;
  letter-spacing: -0.045em;
  text-transform: uppercase;
}

.hero-script {
  position: absolute;
  left: 49%;
  top: 23%;
  transform: translateX(-50%) rotate(-2deg);
  z-index: 5;
  color: var(--black);
  font-family: "Brittany Signature", "Amsterdam", cursive;
  font-size: clamp(56px, 8vw, 130px);
  line-height: 0.8;
}

.hero-image {
  position: absolute;
  left: 50%;
  bottom: -3%;
  transform: translateX(-50%);
  width: clamp(260px, 33vw, 520px);
  z-index: 4;
  filter: grayscale(100%) contrast(1.05);
}

.hero-star {
  position: absolute;
  right: 13%;
  top: 23%;
  width: clamp(52px, 7vw, 96px);
  z-index: 6;
}

.hero-texture-right {
  position: absolute;
  right: 3%;
  bottom: 18%;
  width: 18%;
  opacity: 0.35;
  z-index: 1;
}

.hero-texture-left {
  position: absolute;
  left: 0;
  top: 0;
  width: 12%;
  height: 100%;
  opacity: 0.18;
  z-index: 1;
}
```

### Hero Layer Order

```text
z-index 1: paper textures
z-index 2: huge blue title
z-index 4: cutout image
z-index 5: script word
z-index 6: star / decorative symbols
z-index 20: top header
```

The image must overlap the title. Do not place the image beside the text.

---

## 7. Image Treatment

### Image Style

Images should feel like editorial magazine cutouts.

Use:
- Black-and-white photos.
- High contrast.
- Slight grain.
- Cutout PNGs where possible.
- Rectangular crops with rough or irregular edges.
- Blue glow or blue shadow only on selected dark slides.

### CSS Image Filter

```css
.editorial-img {
  filter: grayscale(100%) contrast(1.08) brightness(0.98);
}
```

### Cutout Image Rules

- Hero image should be center aligned.
- Image should cover the lower center of the title.
- Keep subject height around `55–70%` of section height.
- Avoid colorful images unless converted to grayscale.
- Leave enough white space around the subject.
- Do not use rounded corners; use sharp or rough-edged masks.

### Rectangular Image Placement

For secondary sections:
- Place image in top-right, center, or right third.
- Use image boxes between `28–45%` section width.
- Let images overlap grid lines or typography slightly.
- Crops can be horizontal or vertical, but should feel intentional.

---

## 8. Decorative Elements

### Elements to Use

- Star/asterisk symbol.
- Thin arrows.
- Hand-drawn scribble circles.
- Rough gray texture patches.
- Grainy paper overlays.
- Thin dividing lines.
- Small dotted menu marks.

### Star CSS

```css
.star-symbol {
  font-family: Arial, sans-serif;
  font-size: clamp(48px, 7vw, 100px);
  font-weight: 700;
  line-height: 1;
}
```

You can use this character:

```text
✱
```

or create it using SVG for sharper control.

### Decoration Rules

- Use only 1–3 decorative marks per section.
- Keep most decorations black or gray.
- Use blue scribbles only on dark sections.
- Decorations should support the layout, not become the focus.

---

## 9. Section Layout Recipes

### About Section

**Background:** off-white  
**Title:** `ABOUT ME` in blue, left aligned  
**Image:** black-and-white rectangular crop on top-right  
**Body:** small paragraph below title  
**Script word:** `Introduction` near bottom-center/right  
**Decor:** star near title

```css
.about-title {
  position: absolute;
  left: 4%;
  top: 22%;
  color: var(--blue);
}

.about-copy {
  position: absolute;
  left: 4%;
  top: 45%;
  width: min(420px, 38vw);
}

.about-image {
  position: absolute;
  right: 13%;
  top: 19%;
  width: 34%;
  height: 26%;
  object-fit: cover;
}

.about-script {
  position: absolute;
  right: 20%;
  bottom: 15%;
}
```

---

### Strengths Section

**Background:** black  
**Title:** `STRENGTHS` in off-white  
**Image:** cutout portrait near center-left  
**Text:** right column, small bullets  
**Accent:** dark blue texture glow behind title/image

```css
.dark-section {
  background: var(--black);
  color: var(--bg-paper);
}

.strengths-title {
  position: absolute;
  left: 5%;
  top: 18%;
  color: var(--bg-paper);
}

.strengths-image {
  position: absolute;
  left: 38%;
  bottom: 12%;
  width: 22%;
  filter: grayscale(100%);
}

.strengths-list {
  position: absolute;
  right: 7%;
  top: 25%;
  width: 28%;
  font-size: 13px;
  line-height: 1.35;
}
```

---

### Project Section

**Background:** black or off-white  
**Title:** huge `PROJECT 01` / `PROJECT 02`  
**Subtitle:** script word like `Brand` or `Campaign`  
**Image:** product/person image with rough frame  
**Description:** compact paragraph in lower-left or right column

```css
.project-title {
  position: absolute;
  left: 4%;
  top: 15%;
  font-size: clamp(72px, 12vw, 170px);
  line-height: 0.8;
}

.project-script {
  position: absolute;
  left: 14%;
  top: 36%;
  transform: rotate(-5deg);
}

.project-image {
  position: absolute;
  right: 12%;
  top: 24%;
  width: 28%;
  height: 48%;
  object-fit: cover;
}

.project-copy {
  position: absolute;
  left: 5%;
  bottom: 13%;
  width: 28%;
}
```

---

### Experience Section

**Background:** off-white  
**Title:** `EXPERIENCE` in blue  
**Grid:** visible thin black lines  
**Images:** small rectangular black-and-white image blocks  
**Cards:** simple role blocks with plus icons

```css
.experience-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.8fr 1fr;
  grid-template-rows: 0.8fr 1fr 1fr;
  border-top: 1px solid var(--black);
  border-left: 1px solid var(--black);
}

.experience-grid > * {
  border-right: 1px solid var(--black);
  border-bottom: 1px solid var(--black);
}
```

---

### Final CTA Section

**Background:** off-white  
**Main text:** `TOGETHER` in black  
**Script:** `let's work` above title  
**Footer:** small pill-shaped contact details  
**Decor:** star, gray square texture

```css
.cta-title {
  position: absolute;
  left: 50%;
  top: 48%;
  transform: translate(-50%, -50%);
  color: var(--black);
}

.cta-script {
  position: absolute;
  left: 43%;
  top: 35%;
  transform: rotate(-4deg);
}

.contact-pill {
  border: 1px solid var(--gray-mid);
  border-radius: 999px;
  padding: 6px 16px;
  font-size: 11px;
}
```

---

## 10. Spacing System

Use tight editorial spacing, not soft corporate spacing.

```css
--space-xs: 6px;
--space-sm: 12px;
--space-md: 24px;
--space-lg: 48px;
--space-xl: 80px;
```

### Rules

- Outer section padding: `24–56px`.
- Header from top: `24–32px`.
- Body text width: `280–460px`.
- Large title should often touch or nearly touch image areas.
- Keep empty space intentional.
- Avoid centered normal paragraphs. Use left-aligned text blocks.

---

## 11. Background Texture

Add subtle paper texture using either an image overlay or CSS noise.

```css
.paper-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.12;
  background-image: url("/textures/paper-grain.png");
  background-size: cover;
  mix-blend-mode: multiply;
  z-index: 0;
}
```

If you do not have texture assets, use a soft noise SVG or CSS radial gradients.

```css
.paper-bg {
  background:
    radial-gradient(circle at 10% 20%, rgba(0,0,0,0.04), transparent 18%),
    radial-gradient(circle at 85% 75%, rgba(0,0,0,0.05), transparent 16%),
    var(--bg-paper);
}
```

---

## 12. Implementation Checklist

Before finalizing each page, check:

- [ ] Big title is oversized and condensed.
- [ ] Script typography overlaps the main heading.
- [ ] Images are grayscale.
- [ ] Hero image is layered in front of title.
- [ ] Background is off-white or black, not plain white.
- [ ] Blue is used mainly for large title text.
- [ ] Header has tiny uppercase labels.
- [ ] Layout is asymmetrical.
- [ ] Decorative marks are minimal.
- [ ] Body text is small and compact.
- [ ] Section does not look too clean or corporate.

---

## 13. Starter HTML Structure

```html
<section class="hero paper-bg">
  <header class="top-header">
    <div class="header-dots">
      <span class="header-dot"></span>
      <span class="header-dot"></span>
      <span class="header-dot"></span>
    </div>

    <div class="header-center">CREATIVE PORTFOLIO</div>
    <div class="header-right">YOUR NAME</div>
  </header>

  <h1 class="hero-title">PORTFOLIO</h1>
  <div class="hero-script">Creative</div>

  <img class="hero-image editorial-img" src="/images/hero-cutout.png" alt="Portfolio hero portrait">

  <div class="hero-star">✱</div>
  <div class="hero-texture-right"></div>
</section>
```

---

## 14. Starter CSS

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg-paper);
  color: var(--black);
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
}

img {
  display: block;
  max-width: 100%;
}

.paper-bg {
  background: var(--bg-paper);
  position: relative;
}

.paper-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.1;
  pointer-events: none;
  background:
    radial-gradient(circle at 8% 20%, rgba(0,0,0,0.05), transparent 18%),
    radial-gradient(circle at 90% 70%, rgba(0,0,0,0.06), transparent 14%);
  z-index: 0;
}

.hero > * {
  position: relative;
}

.editorial-img {
  filter: grayscale(100%) contrast(1.08) brightness(0.98);
}
```

---

## 15. Design Do’s and Don’ts

### Do

- Use very large typography.
- Use black-and-white imagery.
- Add texture and imperfections.
- Make images overlap typography.
- Use strong contrast between script and block fonts.
- Keep body copy short.
- Use blue only as a strong editorial accent.

### Don’t

- Do not use rounded corporate cards.
- Do not use colorful photos.
- Do not use gradients everywhere.
- Do not center everything.
- Do not make titles small.
- Do not use too many decorative icons.
- Do not use soft pastel colors.
- Do not make spacing too even or symmetrical.

---

## 16. Quick Brand Adaptation

Replace the sample labels with your portfolio details:

```text
UGC CREATOR → YOUR ROLE / DESIGNER / DEVELOPER / CREATIVE STUDIO
LEAH BAYLEY → YOUR NAME / BRAND NAME
Creative Portfolio → Your portfolio category
Project 01 / Project 02 → Real case studies
Together → Contact / CTA section
```

Keep the structure the same, but change the content.
