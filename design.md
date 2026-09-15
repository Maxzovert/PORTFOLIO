# Portfolio Design System

This file is the source of truth for how Abdullah’s portfolio looks and behaves. Use it when adding a section, restyling a component, or recreating the same visual language elsewhere.

The site is a single-page editorial portfolio: magazine-scale type, paper vs ink contrast, sparse cobalt accents, and collage-like marks (stars, plus signs, script overlays). It should feel premium and a little raw — not a SaaS landing page.

**Stack:** React + Vite + TypeScript, Tailwind, custom CSS in `src/index.css`, GSAP + ScrollTrigger, Lenis smooth scroll, Lucide icons.

Deep dives (the actual system): **[Theme](#3-theme)** · **[Colors](#4-colors)** · **[Graphics](#7-graphics)** · **[Animations](#11-animations)**.

---

## 1. Visual direction

**Mood:** modern editorial / fashion-magazine collage, translated into a developer portfolio.

**What makes it this site:**
- Huge condensed uppercase titles (`ABDULLAH`, `ABOUT ME`, `STRENGTHS`).
- Off-white paper background with a faint grain overlay.
- Deep cobalt blue used almost only on large type, numbers, and small accents.
- Handwritten script words sitting on or next to block titles (`Mohd`, `Introduction`, `Toolkit`).
- Alternating light paper sections and black ink sections.
- Side rails, section numbers (`01`–`07`), and ✱ marks in the margins.
- Asymmetry: titles left-aligned, script rotated, decorations scattered, images overlapping grids.
- Thin uppercase micro-labels instead of bulky nav chrome.

**What it is not:**
- Neon cyberpunk, glassmorphism, or gradient-heavy SaaS.
- Centered corporate layouts and even card grids as the hero.
- Colorful photography as the brand (hero is type-first; project screenshots stay in color because they are products).

---

## 2. Page architecture

The home page (`src/pages/Index.tsx`) is a vertical stack of full-width sections with dividers between them.

```text
Hero          paper     01
────────      thin rule + diamond
About         paper     02
╭─────        rounded cap into black
Skills        black     03
╰─────        rounded cap into paper
Experience    paper     04
╭─────        rounded cap into black
Education     black     05
╰─────        rounded cap into paper
Projects      paper     06
────────      thin rule + diamond
Contact       paper     07
```

Rhythm: **paper → paper → ink → paper → ink → paper → paper**. Dark sections never sit back-to-back. Light-to-light uses a hairline divider; light-to-dark (and reverse) uses a rounded “slide-in” cap so the next color appears to tuck under the current one.

Global chrome (not in the stack):
- Custom cursor (desktop only).
- Go-to-top button after ~480px scroll.
- Forced light theme (`ThemeProvider` `forcedTheme="light"`).
- Smooth scroll via Lenis (`duration: 1.8`, cubic ease-out).

IDs used for in-page navigation: `#about`, `#skills`, `#experience`, `#education`, `#projects`, `#contact`.

---

## 3. Theme

The site does **not** offer a user-facing light/dark toggle. `App.tsx` wraps the tree in `next-themes` with `defaultTheme="light"`, `forcedTheme="light"`, and `enableSystem={false}`. The document `html` class stays light for the whole visit.

That is a product decision, not a missing feature. Contrast is designed *inside the page*: some sections are paper, some are ink. Those two **surface themes** are the actual theme system.

### 3.1 Two surfaces, one brand

| Surface | Class | Background | Foreground | When |
|---|---|---|---|---|
| **Paper** | `.paper-bg` | `#F5F5F4` | charcoal / blue | Hero, About, Experience, Projects, Contact |
| **Ink** | `.dark-section` | `#010101` | paper / mid-gray | Skills (`STRENGTHS`), Education |

Paper is the default canvas (warm off-white, like uncoated stock). Ink is a full-bleed black “plate” dropped into the sequence so the page reads like a magazine with inserted dark spreads. Dark sections are never adjacent; dividers physically morph from one surface into the other.

A `.dark { … }` block exists in `index.css` for shadcn compatibility. Do not turn it on. Using it would invert the whole UI and destroy the paper/ink rhythm.

### 3.2 Semantic tokens (shadcn / Tailwind)

Hex brand tokens sit beside HSL tokens Tailwind consumes (`hsl(var(--background))`, `text-primary`, etc.). They are the same palette, expressed twice.

| Semantic token | HSL | Equals | Meaning on this site |
|---|---|---|---|
| `--background` | `60 6% 96%` | paper | Page fill |
| `--foreground` | `0 0% 1%` | black | Default type |
| `--card` | `60 4% 93%` | slightly warmer paper | Card fill |
| `--card-foreground` | `228 6% 14%` | charcoal | Type on cards |
| `--primary` | `222 32% 33%` | editorial blue | Titles, icons, primary actions |
| `--primary-foreground` | `0 0% 100%` | white | Text on a blue fill |
| `--primary-glow` / `--primary-dark` | same hue, 40% / 25% L | blue variants | Almost unused; do not build a glow look |
| `--secondary` | `228 6% 14%` | charcoal | Secondary fill / dark text |
| `--accent` | same as primary | blue | Alias, not a second accent |
| `--muted` | `60 3% 87%` | gray-light | Quiet fills |
| `--muted-foreground` | `228 4% 40%` | dusty charcoal | Meta copy |
| `--border` | `0 0% 1%` | black | Hairlines (usually used at low opacity) |
| `--ring` | `222 32% 33%` | blue | Focus rings |
| `--destructive` | `0 84% 60%` | red | Form errors only |
| `--green` | `140 30% 35%` | muted green | Contact “available” ping only |
| `--radius` | `10px` | — | Cards, buttons, inputs |

`--shadow-neon` is `none`. `--shadow-cyber` and `--shadow-glass` are soft black shadows (`0 4px 24px` / `0 2px 12px` at 6–8% black). The old “neon / cyber” names are leftovers; the look is editorial.

### 3.3 Theme rules

- The **user theme is always light.** Ink is a section skin, applied with `.dark-section`, not with `class="dark"` on `html`.
- On paper, type is charcoal; titles are blue; script is black.
- On ink, titles are paper (`.section-title-light`); body is `--gray-mid`; borders are white at 20–30% opacity; decorations invert via `.section-frame--light`.
- Radius stays 10px. Sharper than a blob, softer than a newspaper rule. Do not mix 999px pills except the unused `.contact-pill` recipe and the availability dot.
- Body uses `bg-background text-foreground font-inter antialiased`. Headings default to Bebas via the `h1–h6` base rule.

---

## 4. Colors

All brand hex lives in `:root`. Prefer `var(--blue)` (or `text-editorial-blue` / `text-charcoal`) over raw hex in new CSS.

### 4.1 Core palette

| Token | Hex | RGB | Role |
|---|---|---|---|
| `--bg-paper` | `#F5F5F4` | 245, 245, 244 | Canvas. Warm stone, not `#FFFFFF`. |
| `--black` | `#010101` | 1, 1, 1 | Ink sections, strongest type, dark buttons. Near-black so it does not bloom on screens. |
| `--charcoal` | `#212227` | 33, 34, 39 | Body copy on paper. Softer than pure black so paragraphs do not shout. |
| `--blue` | `#3A4870` | 58, 72, 112 | The only brand accent. Deep cobalt / ink-blue, not sky or electric. |
| `--gray-light` | `#DEDEDF` | 222, 222, 223 | Chip fills, quiet panels. |
| `--gray-mid` | `#9B9DA3` | 155, 157, 163 | Secondary copy, side-rail tags, placeholders. |
| White | `#FFFFFF` | 255, 255, 255 | Small pills sitting on paper (`bg-white`), not page background. |

**Mix ratio:** about 60% paper, 20% black, 15% blue, 5% gray marks. Blue is loud because **type is huge**, not because fills are blue.

### 4.2 Why this blue

`#3A4870` is a desaturated navy-cobalt. It sits between ink and denim. On paper it reads as printed ink; on black it is too dark to use as a fill, so dark sections switch titles to paper and keep blue only in faint glows and a few icons.

If you lighten it, it becomes “startup blue.” If you saturate it, it becomes neon. Keep it dusty.

### 4.3 Paper surface recipe

```text
Background     --bg-paper  +  .paper-bg::before grain (see Graphics)
Display title  --blue
Script         --black, Great Vibes
Body           --charcoal
Micro labels   --charcoal or --black
Borders        rgba(1,1,1, 0.12) default, 0.15 cards, 0.30 hover, 0.40 card hover
Icons          --blue at full, or charcoal at 40–70% for plus/arrow wallpaper
Pills          bg white, border black/15
Primary button fill --blue, text paper; hover fill --black
Outline button transparent, text black; hover fill black, text paper
```

`.paper-bg::before` is two black radial gradients at 5–6% opacity, overlay at 12% — a stand-in for paper grain, not a color change.

### 4.4 Ink surface recipe

```text
Background     --black  +  .dark-section::before
               radial-gradient at 20% 30% of rgba(58,72,112,0.4) at 15% overlay
               → a bruised blue pool behind the title, not a gradient background
Display title  --bg-paper  (.section-title-light)
Script         --bg-paper at ~85%  (.script-word-light)
Body           --gray-mid
Borders        white/20 chips, white/25 pills, white/30 icon boxes; hover → paper
Cards          black fill, white/20 border (.dark-section .glass-card)
Icons          paper, opacity 0.4–0.55
```

### 4.5 Opacity scale (borders and marks)

Treat opacity as a type scale:

| Opacity | Use |
|---|---|
| 0.09–0.12 | Divider hairline, paper grain, section edge wash |
| 0.15 | Default card/input border on paper |
| 0.18–0.22 | Faint section numbers, edge `✱` |
| 0.25–0.35 | Decorative icons, hover wash on About cells (`rgba(58,72,112,0.04)` fill) |
| 0.40–0.55 | Secondary decorations, rail icons |
| 0.70–0.85 | Script on dark, star beside title |
| 1.0 | Titles, body, primary buttons |

### 4.6 Interaction colors

- **Hover on paper:** border and icon/text shift to `--blue`; cards lift; buttons fill `--black`.
- **Hover on ink:** border and chip text shift to `--bg-paper`.
- **Focus (inputs):** border `--blue` + `box-shadow: 0 0 0 3px rgba(58, 72, 112, 0.12)`.
- **Focus (project card):** `outline: 2px solid var(--blue); outline-offset: 2px`.
- **Availability:** `--green` dot with `animate-ping` at 40% opacity. This is the only green on the site.
- **Destructive:** reserved for validation. Do not use red in the collage.

### 4.7 Gradients (defined, barely used)

```css
--gradient-primary: linear-gradient(135deg, var(--blue), var(--charcoal));
--gradient-neon:    linear-gradient(45deg,  var(--blue), var(--charcoal));
--gradient-cyber:   linear-gradient(135deg, var(--charcoal), var(--black));
--gradient-dark:    linear-gradient(180deg, var(--bg-paper), var(--gray-light));
```

These name leftovers from an older look. Timeline dots still reference `bg-gradient-*` classes. Do **not** paint sections or cards with large gradients. The brand is flat paper, flat ink, one blue.

Project card labels use a **local** overlay: `linear-gradient(to top, black 82% → 35% → transparent)` so white type holds on screenshots. That is photography treatment, not a brand gradient.

### 4.8 Do not add

Pastels, cyan/magenta neon, orange CTAs, rainbow skill chips, true `#FFFFFF` page background, or a second accent. If something needs emphasis, enlarge the type or use blue — do not invent a color.

---

## 5. Typography

Three families, loaded from Google Fonts in `src/index.css`:

| Role | Font | CSS class | Use |
|---|---|---|---|
| Display / titles | Bebas Neue (hero also lists Anton) | `.font-bebas`, `.section-title`, `.hero-title` | Huge condensed uppercase |
| Script accent | Great Vibes | `.font-script`, `.script-word` | Overlapping handwritten words |
| UI / body | Inter | `.font-inter`, `.body-copy`, `.micro-label` | Paragraphs, labels, buttons |

### Type recipes (implemented)

**Hero title** `.hero-title`  
Anton / Bebas, `clamp(5.5rem, 22.5vw, 22rem)`, line-height `0.72`, uppercase, slight `scaleX(1.06)`, color `--blue`. Word: `ABDULLAH`.

**Hero script** `.hero-script`  
Great Vibes, `clamp(48px, 9vw, 140px)`, rotate `-4deg`, black. Word: `Mohd`.

**Hero subtitle** `.hero-name`  
Bebas, `clamp(1.4rem, 3.6vw, 2.75rem)`, letter-spacing `0.10em`, charcoal. Line: `Full stack developer`.

**Section title** `.section-title`  
Bebas, `clamp(56px, 10vw, 150px)`, line-height `0.82`, tracking `-0.035em`, uppercase, blue. On dark: add `.section-title-light` (paper color). On paper when you need black: `.section-title-dark`.

**Script word** `.script-word`  
Great Vibes, `clamp(48px, 8vw, 120px)`, line-height `0.8`, black. On dark: `.script-word-light` (slightly smaller clamp, paper at 85% opacity). Always rotate a few degrees (`-6deg` to `+6deg`).

**Body** `.body-copy`  
Inter, `clamp(12px, 1.1vw, 16px)`, line-height `~1.35`, tracking `-0.02em`, charcoal. About section intentionally goes larger (`~1.35–1.5rem`, line-height `1.45`) because that copy is the story.

**Micro label** `.micro-label`  
Inter Bold, 11px, uppercase, letter-spacing `0.08em`. Header, tags, filter tabs, card meta.

### Type rules

- Titles stay oversized and tight. Never “fix” line-height to 1.2 on display type.
- Script sits *on* the title, not in a neat caption row.
- Left-align section titles. The hero is the only centered display lockup.
- Keep body short. Long copy is for About and expanded project cards only.

---

## 6. Spacing, radius, motion tokens

```text
Section padding     .section-padding → py 48–96px, px 16–32px
Container           max-w-7xl, centered
Card radius         --radius: 10px (buttons, cards, inputs)
Hairline borders    1px solid black/12–15% (light) or white/20–30% (dark)
Lift on hover       translateY(-2px) to (-4px)
Transition          --transition-smooth: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

Editorial spacing is tighter than typical marketing sites. Empty space is a composition tool, not leftover padding.

---

## 7. Graphics

Graphics here are **collage marks and frames**, not illustrations or 3D. Almost everything is CSS + Lucide line icons + type as image. There is no illustration library and no Lottie.

### 7.1 Graphic vocabulary

Reuse this set. Do not introduce filled blobs, illustrations, or emoji.

| Mark | Source | Stroke | Color | Job |
|---|---|---|---|---|
| Asterisk / `✱` | Lucide `Asterisk` or Bebas `✱` | 2 (icon) | blue or black | Signature star |
| Star | Lucide `Star` | 1.5 | blue at 45–60% | Smaller sparkle |
| Plus | Lucide `Plus` | 1.5 | charcoal/paper at 35–55% | Registration marks, like print sheets |
| Sparkles | Lucide `Sparkles` | 1.5 | blue | Highlight near titles |
| Heart | Lucide `Heart` | 1.5 | blue, ~40–50% | Soft counterweight to the stars |
| Arrow up-right | Lucide `ArrowUpRight` | 1.5 | charcoal or blue | “Go / external” and wallpaper arrows |
| Dot `●` | Unicode in `.section-deco-symbol` | — | blue at ~25% | Center register mark |

Icons are outline only. Stroke width 1.5 is the default; asterisks go to 2 so they read at small sizes. Never fill these icons.

### 7.2 Paper grain and ink glow

**Paper** (`.paper-bg::before`): two radial smudges (top-left and bottom-right) in 5–6% black, whole overlay at 12% opacity, `pointer-events: none`. It dirties the fill so the page does not look like a flat UI gray.

**Ink** (`.dark-section::before`): one radial at `20% 30%`, `rgba(58, 72, 112, 0.4)`, overlay 15%. Reads as a cobalt bruise behind `STRENGTHS` / `EDUCATION`, not a spotlight.

**Edge washes** (`.section-texture-left/right`, `.hero-texture-*`): 10–12% width linear fades of `--gray-mid`. Currently commented out in Hero and SectionDecorations; classes remain if you want the vignette back.

### 7.3 Section frame (the “printed page”)

`SectionDecorations` draws a non-interactive frame (`z-index: 2`, `pointer-events: none`):

```text
        [faint number 02]
  │ Creative          Story (script, rotated ~6°)     │
  │ +                                                 │
  │                      content                      │  ✱
  │ Heart                                             │
  │ Developer                                         │
```

- **Rails** (xl+): vertical 1px gradient line (`transparent → blue 28% → transparent`), uppercase 10px Inter tag (`letter-spacing: 0.18em`, `--gray-mid`, `writing-mode: vertical-rl` then rotated 180°), plus/heart icon in blue at 55% opacity.
- **Edge number:** Bebas, `clamp(3rem, 5vw, 4.5rem)`, color `rgba(58,72,112,0.1)` — a watermark, not a heading.
- **Edge script:** Great Vibes, `clamp(2.5rem, 5vw, 4.5rem)`, black at 75%, rotated 6°, parked mid-right.
- **Edge `✱`:** Bebas, blue at 18%.

On `.section-frame--light` (ink sections) every piece flips to paper/white at lower opacity so marks survive on black.

Hide rails below `xl`, hide edge script below `lg`, hide numbers/symbols below `md`. At `max-width: 768px` remaining `.section-deco` items scale to 0.75 and drop to 35% opacity.

### 7.4 Floating collage layer

Each variant lists 8–10 absolutely positioned marks in `DECO_BY_SECTION`. Positions are percentage-based (`left: 2%`, `top: 42%`, …) with `clamp()` sizes so they track the viewport. Typical size: 18–80px. Each mark is pre-rotated in CSS (`rotate(-14deg)` etc.) so even before JS they look thrown down, not gridded.

They must stay in the **margins**. If a mark collides with a title or a card, move the mark, not the content.

### 7.5 Hero graphics

Hero is type-as-graphic. No portrait in the current build.

- `ABDULLAH` is the main image: Anton/Bebas, `clamp(5.5rem, 22.5vw, 22rem)`, `line-height: 0.72`, `scaleX(1.06)`, `white-space: nowrap` so it behaves like a wordmark.
- `Mohd` in Great Vibes sits on top, rotated `-4deg`.
- Same Lucide set as sections, larger: primary asterisk top-right `clamp(48px, 8vw, 110px)`, left asterisk, arrow, plus (both sides), sparkles, heart, small star.
- Side rails: `Build` / `Ship` with plus and star.
- Watermarks: `01` and `✱`.
- Header: three 5px black dots + micro labels (`FULL STACK DEVELOPER` / `DEVELOPER`) — a magazine masthead, not a hamburger.

### 7.6 Dividers as graphics

`SectionDivider` is a graphic joint, not a `<hr>`.

- **Same surface** (`light` / `dark`): a `max-width: 52rem` 1px rule, paper uses `rgba(1,1,1,0.09)`, ink uses paper at 12%. Center gem is a 6×6 square of `--blue` (or paper on dark), rotated 45°, `border-radius: 1px` — a tiny diamond register mark.
- **Surface change** (`to-dark` / `to-light`): the *next* section’s color grows a 22px-tall bar with `border-radius: 22px 22px 0 0`, inset 20px from the sides. It looks like the next page sliding up underneath.

### 7.7 Cards, chips, and the About index

- **`.glass-card`:** paper (or black on ink), 1px 15% border, 10px radius, shadow `0 4px 24px rgba(1,1,1,0.08)`. The name is leftover; there is no blur/glass.
- **Tilted pills:** `rotate(-3deg to +3deg)`, white fill, hairline, `ArrowUpRight` + micro label. They are collage stickers (`Verience Studio`, `Tech Stack`, `Work History`, `Let's talk`).
- **About features:** not cards. A 1/2/4 column grid of cells sharing `outline: 1px solid rgba(1,1,1,0.1)`. Giant faded Bebas index (`01`–`04`) at 18% blue. Hover: 4% blue wash, number to 35%. This is a magazine contents list.
- **Timeline (Experience):** 2px vertical gradient line (`from-primary via-secondary to-accent` at 30% opacity) + round dots. `▹` bullets in blue.
- **Projects bento:** 1px `rgba(1,1,1,0.12)` tiles. Collapsed state is a screenshot with a black gradient footer. Expanded state is a paper panel (description, `▹` highlights, chips, action bar). Dimmed siblings go to 55% opacity.
- **Filter control:** one black rectangle split into tabs; active tab inverts to black fill / paper type.

### 7.8 Photography

- **About portrait** (`Heroimg.png`): color cutout, `object-contain object-top`, scaled `1.25`, max height `38rem`. On large screens copy overlaps it (`lg:-mt-64`) — collage, not a circular avatar.
- **Project shots:** full color, `object-cover` / `object-position: top center`. Product UI must stay readable; do not grayscale them.
- `.editorial-img` currently sets `filter: none` (the old grayscale recipe is retired).

### 7.9 Cursor and go-to-top

- **Cursor:** 12px circle, `1.5px` black stroke, `mix-blend-mode: difference` (inverts over blue/black). Inner 4px filled dot. Both `position: fixed`, centered with `translate(-50%, -50%)`. On ink/blue it flips to light automatically because of difference blend.
- **Go-to-top:** 44–48px paper tile, 1px 15% border, 10px radius, `ArrowUp` + 8px `TOP` label. Graphic language matches cards, not a floating FAB.

### 7.10 Graphic rules

- 1–3 marks should be noticeable; the rest are texture.
- Marks never compete with type. If the title is blue, nearby wallpaper is black/gray or very faint blue.
- No drop shadows on icons. No filled circles behind icons except the small bordered boxes on Education/Skills headers.
- Do not add photographs behind titles besides the About overlap.

---

## 8. Shared section chrome

Every section except the hero uses `SectionDecorations` (`src/components/SectionDecorations.tsx`). Pass `light` on dark sections so marks invert to paper.

### Frame (always present, hidden or quieter on small screens)

| Piece | Class | Purpose |
|---|---|---|
| Left/right fade | `.section-texture-left/right` | Soft gray edge wash |
| Side rails | `.section-side-rail` | Vertical 1px line + uppercase tag + Lucide icon |
| Big number | `.section-edge-num` | Faint Bebas index (`02`…) |
| Edge script | `.section-edge-script` | Extra Great Vibes word in the margin |
| Edge symbol | `.section-edge-symbol` | Faint `✱` |

### Section index copy

| Section | Num | Edge script | Left rail | Right rail |
|---|---|---|---|---|
| Hero | 01 | — | Build | Ship |
| About | 02 | Story | Creative | Developer |
| Skills | 03 | Craft | Stack | Tools |
| Experience | 04 | Journey | Career | Impact |
| Education | 05 | Learn | Study | Growth |
| Projects | 06 | Build | Launch | Ship |
| Contact | 07 | Hello | Reach | Connect |

### Floating marks

Lucide icons at 1.5px stroke, low opacity (0.35–0.7), slightly rotated: `Plus`, `Star`, `Asterisk`, `Sparkles`, `Heart`, `ArrowUpRight`. Positions are per-section classes in `index.css` (`.section-deco-about-*`, `.section-deco-exp-*`, etc.).

Rules:
- Marks are wallpaper, not UI. `pointer-events: none`.
- 1–3 marks should read at a glance; the rest dissolve into texture.
- On viewports ≤768px, scale marks down and hide edge script/numbers so content stays readable.

### Title block pattern (repeat this)

1. Row: oversized `.section-title` + small `✱` on the right (md+).
2. Script word, rotated, overlapping or sitting just under the title.
3. One line of `.body-copy`.
4. Optional tilted pill: white (or white/5 on dark) + 1px border + `ArrowUpRight` + `.micro-label`.

---

## 9. Section recipes (as built)

### 9.1 Hero — `ModernHero.tsx`

Full viewport, paper, type-only (no portrait in the current build).

```text
┌ dots          FULL STACK DEVELOPER          DEVELOPER ┐
│  BUILD |                     Mohd              ✱     │
│  01              ABDULLAH                            │
│               Full stack developer                   │
│  [View Projects] [Resume] [Get In Touch]             │
│                      Scroll ↓                        │
└──────────────────────────────────────────────────────┘
```

Layers: textures `z-1` → title `z-2` → content `z-3` → decorations `z-5–6` → header `z-20` → CTAs `z-10`.

Buttons (`.editorial-btn` + `.editorial-btn-hero`):
- **View Projects** — filled blue (scrolls to `#projects`).
- **Resume** — outline (downloads PDF).
- **Get In Touch** — filled black (scrolls to `#contact`).

Intro motion: GSAP timeline (header drop, title rise, script un-rotate, decorations pop with `back.out`, CTAs last). Idle loops: stars rock, plus spins, sparkles pulse. Title wrap has a light scroll-scrub parallax.

### 9.2 About — `ModernAbout.tsx` · paper

12-column grid on large screens:
- Left 6: `ABOUT ME` + script `Introduction` + Verience Studio pill.
- Right 6: portrait (`Heroimg.png`), scaled up, object-top. On lg, copy/stats pull up (`lg:-mt-64`) so text sits into the image — collage overlap.

Stats in blue Bebas (`50+`, `2+`, `100%`, `∞`) with micro labels.

Features are **not** boxed cards. `.about-features` is a 1/2/4 column grid of cells sharing a 1px outline (magazine index): giant faded number, icon, Bebas title, Inter description. Hover washes the cell with 4% blue.

### 9.3 Skills / Strengths — `ModernSkills.tsx` · black

Title `STRENGTHS`, script `Toolkit`. Six `glass-card` groups (languages, frontend, backend, databases, tools, devops). Skill names are outline chips; hover brightens the chip to paper.

### 9.4 Experience — `ModernExperience.tsx` · paper

Title `EXPERIENCE`, script `Journey`. Vertical timeline (hidden on the smallest screens): 2px faded gradient line + round dots. Each job is a `glass-card`: blue Bebas role, company, location, type pill, dates, description, `▹` achievements, tech chips.

### 9.5 Education — `ModernEducation.tsx` · black

Title `EDUCATION`, script `Learning`. Two-up `glass-card`s with graduation icon, degree in paper Bebas, institution/location/dates as icon rows, GPA as an outline chip.

### 9.6 Projects — `ModernProjects.tsx` · paper

Title `PROJECTS`, script word changes with the filter. Segmented control (All / Personal / Client / Verience): black border, active tab filled black.

**Bento grid** (`.projects-bento`): 1 col → 2 (sm) → 3 (lg), auto-rows ~260–280px, 14–18px gap. Default card is a screenshot with a bottom gradient label. Hover/focus expands that card to `span 2 / span 2`, dims siblings, reveals description, highlights, tech, and action links (live = blue fill, source = outline).

Screenshots stay in color. They are product evidence, not lifestyle photography.

### 9.7 Contact — `ModernContact.tsx` · paper

Title `CONTACT`, script `Reach out`. Two columns: sidebar (mailto/phone/location cards, social 2-up, availability ping) + form card (`Start a conversation`). Inputs: paper fill, 10px radius, blue focus ring. Submit uses `.editorial-btn`.

---

## 10. Components

### Buttons — `.editorial-btn`

Inter bold, 11px, uppercase, tracking `0.08em`, padding `12px 24px`, 1px black border, 10px radius.

| Modifier | Fill | Text | Hover |
|---|---|---|---|
| default | `--blue` | paper | black fill |
| `.editorial-btn-outline` | transparent | black | black fill, paper text |
| `.editorial-btn-dark` | black | paper | blue fill |

Do not use generic rounded “primary” Tailwind buttons in new sections.

### Cards — `.glass-card`

Paper (or black on dark sections), 1px 15% border, soft shadow `--shadow-cyber`, 10px radius, lift on hover. Dark variant: white/20 border, paper type.

### Dividers — `SectionDivider.tsx`

- `light` / `dark`: centered hairline with a 6px blue (or paper) diamond rotated 45°.
- `to-dark` / `to-light`: 22px rounded cap of the *next* section’s color, so the join feels like a tucked page.

### Cursor — `CustomCursor.tsx`

Desktop only (`cursor: none` on `body`). 12px ring (`mix-blend-mode: difference`) + 4px filled follower. Scales 1.5 on interactive elements. Touch devices keep the native cursor.

### Go to top — `.go-to-top`

Fixed bottom-right, paper tile, 10px radius, arrow + `TOP` micro label. Appears after ~480px. Hover: blue border/text.

### Contact fields

`.contact-label` (micro), `.contact-input` (paper, 10px radius, blue focus `box-shadow: 0 0 0 3px rgba(58,72,112,0.12)`), `.contact-textarea` min-height 140px.

---

## 11. Animations

Motion is editorial: type and marks *arrive*, then the page stays calm. Nothing loops loudly except wallpaper icons. Body copy never bounces.

There are three engines:

1. **Lenis** — the scroll itself.
2. **GSAP + ScrollTrigger** — enter/leave choreography and idle icon drift.
3. **CSS transitions** — hover, focus, bento expand, go-to-top, buttons.

Tailwind still defines `morphing`, `floating`, `glitch`, `hologram-scan` keyframes. Those are leftovers. Do not use them; they fight the brand.

### 11.1 Feel and easing dictionary

| Ease | Use |
|---|---|
| `power2.out` | Small UI (filters, form fields, social tiles) |
| `power3.out` | Default content, decorations intro |
| `power4.out` | Titles slamming into place |
| `back.out(1.7–2)` | Icons popping (overshoot). Never on paragraphs |
| `sine.inOut` | Idle loops (rock, pulse, drift) |
| `none` | Continuous spin; scroll-scrub parallax |

Durations: titles 0.8–1.1s, body groups 0.5–0.9s, chips 0.4–0.5s, idle loops 2.5–10s. Stagger 0.06–0.12s (skills use `amount: 0.8` so the whole grid shares one window).

### 11.2 Lenis (the scroll)

`LenisProvider` creates one Lenis instance per route:

```text
duration          1.8
easing            1 - (1 - t)^3     ease-out cubic; long deceleration
lerp              0.1               interpolation — lower = silkier
wheelMultiplier   0.8               slightly slower than native
touchMultiplier   1.5
smoothWheel       true
smoothTouch       true
```

`lenis.on('scroll', ScrollTrigger.update)` plus a `requestAnimationFrame` loop calling `lenis.raf(time)` keeps GSAP start/end points honest. The instance is also stored on `window.lenis` so Hero, GoToTop, and in-page buttons can `scrollTo` with the same 1.8s cubic.

Anchor scrolls (View Projects, Get In Touch) use `lenis.scrollTo(el, { offset: 0, duration: 2, easing: cubic })`. Go-to-top uses duration 1.8 to `0`.

Native `scroll-behavior` is not the source of smoothness. If Lenis is missing, components fall back to `scrollIntoView` / `window.scrollTo`.

### 11.3 GSAP house rules

Every section wraps tweens in `gsap.context(() => { … }, sectionRef)` and `ctx.revert()` on unmount. That kills ScrollTriggers when React remounts.

ScrollTrigger pattern:

```text
start:           'top 80%' to 'top 90%'   (element hits the lower fifth of the viewport)
end:             'bottom 20%'             (often unused except as a range)
toggleActions:   'play none none reverse'
                 onEnter play → onLeave nothing → onEnterBack nothing → onLeaveBack reverse
```

Reverse-on-scroll-up is intentional: the magazine “reassembles” when you go back. Do not switch to `play none none none` unless the animation is a one-shot load (Hero intro).

### 11.4 Hero — load timeline + idle + parallax

Hero does **not** wait for scroll. After `delay: 0.15s` a timeline runs once.

**Initial `gsap.set`:** header, content, CTAs, scroll hint, and all marks at `opacity: 0`. Extra offsets:

| Element | Hidden state |
|---|---|
| Script `Mohd` | `y: -20`, `rotation: -8` |
| Title block | `y: 40` |
| Header | `y: -20` |
| CTAs | `y: 30` |
| Right asterisk | `scale: 0`, `rotation: -90` |
| Left asterisk | `scale: 0`, `rotation: 90` |
| Arrow | `x: -20`, `y: 20` |
| Left plus | `scale: 0`, `rotation: -180` |
| Sparkles | `scale: 0.5` |
| Heart | `scale: 0`, `rotation: -20` |
| Right plus | `scale: 0`, `rotation: 180` |
| Small star | `scale: 0` |

**Timeline (overlaps via `'-=n'`):**

| Beat | What | Tween |
|---|---|---|
| 1 | Header | opacity 1, y 0, 0.8s, `power3.out` |
| 2 | Title block | opacity 1, y 0, 1.1s, `power4.out`, overlap 0.5s |
| 3 | Script | rotation `-2` (CSS rest is `-4deg`; this eases the landing), 1s, `power4.out` |
| 4–11 | Marks | scale/rotation/x-y to rest, 0.55–0.8s, mostly `back.out(1.7–2)` |
| 12 | CTAs | opacity 1, y 0, 0.8s |
| 13 | Scroll hint | opacity 1, 0.6s |

**Idle loops** (after intro, `repeat: -1`):

| Mark | Motion | Duration |
|---|---|---|
| Right asterisk | rotation `20`, yoyo `sine.inOut` | 5s |
| Left asterisk | rotation `-25`, yoyo | 6s |
| Arrow | `x: 8`, `y: -8`, yoyo | 3s |
| Left plus | rotation `90`, linear, no yoyo (continuous) | 8s |
| Sparkles | scale `1.15`, opacity `0.6`, yoyo | 2.5s |
| Heart | `y: -8`, yoyo | 3.5s |
| Right plus | rotation `-90`, linear | 10s |
| Small star | rotation `15`, yoyo | 4s |

**Parallax:** the whole hero `yPercent: -15` with `scrub: 1` from `top bottom` → `bottom top`. The section drifts up slightly as you leave it — a print sheet sliding, not a 3D camera.

Scroll hint `ArrowDown` also uses Tailwind `animate-bounce` (CSS). That is the only bounce on the page; keep it on that 12px icon.

### 11.5 Section decorations — intro + drift

On each section, when the frame hits `top 90%`:

- `.section-frame-intro` (rails, numbers, edge script/symbols): `opacity 0, y: 16` → rest, 0.8s, stagger 0.08, `power3.out`.
- `.section-deco` marks: `opacity 0, scale 0.6, rotation: -30` → rest, 0.7s, stagger 0.08, `back.out(1.8)`, start `top 88%`.

Then **every** floating mark gets two infinite tweens, alternating direction by index (`i % 2`):

- rotation `±18°`, duration `4 + i*0.6`s, yoyo sine
- `y: ±10`, `x: ∓6`, duration `3 + i*0.4`s, yoyo sine

Wallpaper should always be breathing. Content should not.

### 11.6 Per-section content reveals

All use `toggleActions: 'play none none reverse'` unless noted.

**About** (`start: top 82–85%`, `power3.out`):

| Target | From | Duration | Stagger |
|---|---|---|---|
| Title block children | opacity 0, y 36 | 0.8s | 0.12 |
| Portrait | opacity 0, y 42 | 0.9s | — |
| Story paragraphs | opacity 0, y 42 | 0.9s | 0.1 |
| Feature cells | opacity 0, y 36 | 0.7s | 0.08 |
| Stats | opacity 0, y 24 | 0.6s | 0.08 |

**Skills / Education** titles: `opacity 0, y: 100, skewY: 5` → rest, 1s, `power4.out`, `top 80%`. The skew is the “title un-warping” beat. Cards: `opacity 0, y: 60, rotationX: -15, scale: 0.9` → rest, 0.8s, stagger `amount: 0.6–0.8`, `back.out(1.7)` — slight 3D flap, then settle. This is the only `rotationX` on the site; do not put it on body copy.

**Experience** title: same skew slam. Timeline children: `opacity 0, x: -100, scale: 0.9` → rest, 0.8s, stagger amount 0.6, `power3.out` — they arrive from the line.

**Projects:** title `y: 80`, 0.9s, `power4.out`, `top 85%`. Filter tabs: `y: 16`, 0.5s, stagger 0.08, `power2.out`. Grid: `y: 40`, 0.8s, `power3.out`. Expanding a card is **not** GSAP; see CSS below.

**Contact:** title `y: 60`, 0.9s. Form fields `y: 24`, 0.5s, stagger 0.08. Info cards `y: 20`, 0.5s. Social `y: 16`, 0.4s, stagger 0.06. Contact is quieter so the form feels usable, not theatrical.

### 11.7 CSS motion (hover and layout)

`--transition-smooth`: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`.

| Element | Motion |
|---|---|
| `.editorial-btn` | color/fill 0.3s; hover `translateY(-2px)` |
| `.glass-card` | border + `translateY(-4px)` |
| About feature | background 0.2s |
| Contact input | border 0.2s; focus ring 0.2s |
| Contact info/social | border + `translateY(-2px)` |
| Skill/tech chips | border/color 0.2s |
| Go-to-top | opacity, visibility, `translateY(12px → 0)`, 0.25s. Shown after ~480px Lenis scroll |
| Cursor | scale 1 → 1.5 on `button, a, [role=button], input, textarea, select`. Position via rAF, **no lerp** (instant). Disabled on touch; `body { cursor: none }` only on fine pointers |
| Availability dot | Tailwind `animate-ping` on a `--green` ring |
| Bento card | `grid-column` / `grid-row` 0.45s cubic, opacity 0.35s, shadow 0.35s. Expanded: media height 132px, panel `opacity 0 + translateY(8px)` → visible. Dimmed: opacity 0.55 |

Bento expand is CSS grid spanning (`span 2 / span 2`). Keep it CSS so hover stays snappy; do not GSAP the grid.

### 11.8 Animation rules

- One idea per tween: fade+rise, or pop scale, not fade+skew+spin+blur.
- Reverse on scroll-up for section content so the page feels authored.
- Idle motion belongs on Lucide marks only.
- Never animate font-size of display titles on scroll (causes jank). Parallax the wrapper if needed.
- Respect `gsap.context` revert; leaking ScrollTriggers will double-fire on hot reload.
- If you add a section, copy About or Contact — not the Skills `rotationX` unless the content is a card grid.

---

## 12. File map

| Path | What it owns |
|---|---|
| `src/index.css` | Tokens, type, paper/dark, hero, bento, decorations, buttons |
| `src/tailwind.config.ts` | Font families, HSL shadcn colors, leftover keyframes |
| `src/pages/Index.tsx` | Section order and dividers |
| `src/components/Modern*.tsx` | One section each |
| `src/components/SectionDecorations.tsx` | Frame + floating marks |
| `src/components/SectionDivider.tsx` | Joins |
| `src/components/CustomCursor.tsx` | Cursor |
| `src/components/GoToTop.tsx` | Back to top |
| `src/components/LenisProvider.tsx` | Smooth scroll |

Add new visual rules in `index.css` `@layer components` next to the existing editorial classes. Do not invent a second design language inside Tailwind utilities.

---

## 13. Responsive behavior

- **< 768px:** hide edge numbers/script; scale decorations; stack grids to 1 column; keep titles clamp-scaled so `ABDULLAH` still fills width (`white-space: nowrap` + `scaleX`).
- **md:** show ✱ beside titles, script words, extra pills.
- **lg:** show side rails; About image/text overlap (`lg:-mt-64`); 12-column About; 3-column projects.

Touch: no custom cursor, Lenis still smooths scroll.

---

## 14. Do / don’t

**Do**
- Set display type in Bebas/Anton at magazine scale.
- Overlap script on titles.
- Alternate paper and ink with the existing divider types.
- Use blue for titles, numbers, and one primary action — not for large fills.
- Keep decorations thin, rotated, and low-opacity.
- Left-align content blocks; center only the hero lockup.
- Reuse `.editorial-btn`, `.glass-card`, `.micro-label`, `.section-title`.

**Don’t**
- Drop in colorful gradients, glow shadows, or “neon” as a look (legacy class names like `.neon-text` are aliases of the editorial styles).
- Center every heading.
- Use large rounded marketing cards without the hairline + paper treatment.
- Add a new accent color.
- Make section titles small or increase their line-height.
- Put heavy decoration on mobile.
- Switch the site to a real dark theme (theme is forced light; dark *sections* are a designed contrast, not a user toggle).

---

## 15. Adding a new section

1. Pick paper or ink so the paper/ink rhythm still alternates.
2. Insert the matching `SectionDivider` (`to-dark` / `to-light` / `light`).
3. Wrap with `section-padding` + `paper-bg` or `dark-section`.
4. Add `SectionDecorations` with a new variant (number, rails, script, deco list).
5. Build the title block: `.section-title` + script + optional pill.
6. Animate with GSAP `fromTo` + ScrollTrigger, `start: 'top 80%'`.
7. Check the list below before merging.

---

## 16. Section QA checklist

- [ ] Title is oversized, condensed, uppercase.
- [ ] Script overlaps or kisses the title and is rotated.
- [ ] Blue appears mainly in the title (and small accents), not as a wash.
- [ ] Background is paper or ink, never plain `#fff`.
- [ ] Layout is asymmetrical.
- [ ] Decorations are quiet; content still reads first.
- [ ] Body is compact Inter; labels are `.micro-label`.
- [ ] Hover states are border/color, not heavy shadows.
- [ ] Mobile: no overlapping edge type, CTAs still tappable.
- [ ] Motion reverses on scroll-up consistently with other sections.

---

## 17. Brand labels (this site)

```text
Name              Mohd Abdullah
Hero line         ABDULLAH
Script            Mohd
Role              Full Stack Developer
Studio            Verience Studio / Verience Media and Technology
Section titles    ABOUT ME · STRENGTHS · EXPERIENCE · EDUCATION · PROJECTS · CONTACT
```

Keep this structure if the content changes. The design is the contrast of condensed sans, script, paper, ink, and cobalt — not any one photograph or project card.
