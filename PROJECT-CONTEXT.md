# Sanskriti's Portfolio: Project Context

This file is the running record of the portfolio project: what we decided, why, and what's next.
It's kept up to date after every working session, so the project can be picked up from here
in any new Claude account or conversation.

**To resume in a new conversation:** open this folder and say
"Read PROJECT-CONTEXT.md and continue the portfolio from where we left off."

---

## 1. About the project

- **Who:** Sanskriti, a product designer who also does visual design and UX thinking, and builds ideas in code ("vibe coding").
- **What:** a personal portfolio website, rebuilt from scratch.
- **How we're working:** Sanskriti describes the site **section by section**. We design and build one section at a time.
- **Personal lines to use somewhere in the copy:**
  - "If I don't know something, I learn it."
  - "Open to new creative ideas."
  - "My mind never stops thinking: a boon and a pain."
- **Interests that could appear on the site:** design meetups, ramen, sketching and drawing, reading, clay art, anime.

## 2. Where things live

| What | Where |
|---|---|
| Code folder | `sanskriti-portfolio/` (this folder) |
| GitHub repo | github.com/SanskritiGupta05/sanskriti-portfolio (currently **public**) |
| Figma file | key `ltepqkFPU0HVYh7CChNZty`, **Page 14** (node `1422:1412`), currently empty |
| Type demo | `explorations/type-demo.html` (open in a browser) |
| Local dev server | Config "portfolio" in `../.claude/launch.json`, port 3014 (`cd sanskriti-portfolio && npm run dev -- --port 3014`) |

## 3. Locked decisions

### Colour
- **Background:** plain white `#FFFFFF`. Not off-white or paper-coloured.
- **Text ink:** `#1C1B19` (headings), `#2B2A28` (body).
- **Muted grey (labels, captions):** `#6B6B6B`.
- **Divider lines:** `#E2E2E2`.

### Typography
| Role | Font | Notes |
|---|---|---|
| Headings | **Redaction** (clean cut) | Simple serif |
| Highlights | **Redaction 35** (worn/glitchy cut) | Used **instead of italics** to emphasise words, in headings and inside body text |
| Body | **Courier New** + "Printed" ink | Vintage typewriter feel, like a scanned book page |

**Size rules: max 2 heading sizes, max 3 body sizes. Never add a size outside this scale.**

| Token | Size |
|---|---|
| Heading 1 | 72px |
| Heading 2 | 36px |
| Body large | 20px |
| Body | 16px |
| Body small (labels, captions) | 13px |

Mobile (under 720px) scales H1 → 48px, H2 → 28px, body large → 18px.

**Printed ink effect (body only):** a gentle SVG filter that slightly roughens letter edges, plus a faint ink blur.
It's subtle on purpose: the stronger versions looked too distorted.

```html
<!-- put once in the layout -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <filter id="ink-printed" x="-5%" y="-5%" width="110%" height="110%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="noise"/>
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.6" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</svg>
```

```css
color: #2b2a28;
filter: url(#ink-printed);
text-shadow: 0 0 .5px rgba(0,0,0,.35);
-webkit-text-stroke: .25px #2b2a28; /* Courier New is very thin; this adds a touch of ink */
```

**Font sources:**
- Redaction: `https://cdn.jsdelivr.net/npm/@fontsource/redaction@5.1.0/index.css` and `.../@fontsource/redaction-35@5.1.0/index.css`. The other worn cuts are 20, 50, 70 and 100.
- Courier New: a system font on Mac and Windows. Use `'Courier New', Courier, monospace`.

**Labels style:** body small, uppercase, letter-spacing 0.08em, muted grey.

## 4. Things we tried and decided against

- **The old version (Japanese black-and-white, washi paper, lantern day/night, mizuhiki cord):** fully deleted on 2026-11-13 from code, GitHub history and Figma. Don't bring it back unless Sanskriti asks.
- **Instrument Serif:** rejected as overused.
- **Other heading candidates shown:** Brygada 1918, Gambarino, Young Serif, Gloock. Redaction won.
- **Body "Worn" ink effect** and the first, stronger "Printed" version: too distorted. "Soft" (blur only) was briefly chosen, then replaced by the gentler "Printed".
- **Courier Prime:** too clean and modern. **Cutive Mono** was the runner-up for the body font.

## 5. Working preferences

- Desktop first at 1440px width. Mobile comes later unless asked.
- **No placeholder boxes** for images, logos or videos. Use only real content and real assets.
- Build designs as real UI. Never paste or crop reference images into the design.
- Present ideas and get approval before building big changes.
- "Minimal" means aesthetic and not maximalist. It never means less content or bare pages.
- Keep this file updated after every change.

## 5b. Tech stack

- **Framework:** Next.js (React). Set it up when we start building the first section.
- **Styling: Tailwind CSS. No hand-written vanilla CSS.** Put the colours, fonts, the 5 type sizes and the Printed ink styles in the Tailwind theme (the SVG filter lives once in the root layout) as tokens, so the size rules are enforced in one place.
- **Use libraries freely** instead of hand-rolling things:
  - **Motion (Framer Motion)** for animation and page transitions.
  - **Three.js** (via React Three Fiber) for 3D moments, where it adds something.
  - Others as they fit, such as Lenis for smooth scrolling and GSAP for scroll-driven sequences.
- The HTML files in `explorations/` are quick throwaway demos and stay plain HTML. They are not part of the site.

## 6. References to review

Sanskriti is going through these. Note the likes and dislikes in section 7.
"Minimal" here means **aesthetic and restrained, the opposite of maximalist**: calm layouts, beautiful
imagery, careful type, room to breathe. It does not mean little content or bare text pages.

### Aesthetic minimal brands and editorial sites
- [aesop.com](https://www.aesop.com): skincare. Warm, quiet, beautiful photography and type.
- [readcereal.com](https://readcereal.com): Cereal magazine. Very calm travel and design editorial.
- [kinfolk.com](https://www.kinfolk.com): slow-living magazine. Soft, airy editorial layouts.
- [framacph.com](https://framacph.com): Copenhagen design studio and store. Muted, crafted, serene.
- [audocph.com](https://audocph.com): Danish furniture. Clean grid with lovely interiors.
- [menuspace.com](https://www.menuspace.com): Danish design brand. Spacious product storytelling.
- [vitsoe.com](https://vitsoe.com): Dieter Rams shelving. Functional, honest, timeless.
- [studionicholson.com](https://www.studionicholson.com): fashion. Restrained, elegant product pages.
- [apartamentomagazine.com](https://www.apartamentomagazine.com): interiors magazine. Relaxed and personal.
- [leica-camera.com](https://www.leica-camera.com): cameras. Premium, a lot of white.
- [teenage.engineering](https://teenage.engineering): product brand. Minimal, technical, with playful details.
- [nothing.tech](https://www.nothing.tech): tech brand. Monochrome with dot-matrix type accents.
- [ia.net](https://ia.net): iA Writer. Monospace-led and very typographic. The closest match to our Courier body.

### Aesthetic minimal portfolios
- [rauno.me](https://rauno.me): Rauno Freiberg. Small, precise, with delightful interactions.
- [emilkowal.ski](https://emilkowal.ski): Emil Kowalski. Calm, with lovely micro-animations.
- [dennissnellenberg.com](https://dennissnellenberg.com): designer and developer. Award-winning, smooth motion, lots of space.
- [koto.studio](https://koto.studio): brand studio. Confident and clean case-study layouts.
- [vanschneider.com](https://vanschneider.com): Tobias van Schneider. Bold editorial portfolio.
- [craigmod.com](https://craigmod.com): writer who walks Japan. Bookish, typographic, Japan-connected.
- [maggieappleton.com](https://maggieappleton.com): digital garden with serif type and hand-drawn illustrations.
- [frankchimero.com](https://frankchimero.com): designer and writer. Editorial, essay-like.
- [robinsloan.com](https://robinsloan.com): novelist. Warm, literary typography.

### Japanese studios and designers
- [nendo.jp](https://www.nendo.jp/en/): Oki Sato's studio. Pure white, a lot of space.
- [naotofukasawa.com](https://naotofukasawa.com): product designer. Quiet and minimal.
- [Hara Design Institute](https://www.ndc.co.jp/hara/en/): Kenya Hara (MUJI's art director). Emptiness as design.
- [takram.com](https://www.takram.com): design-engineering studio. Clean, thoughtful.
- [gooddesigncompany.com](https://gooddesigncompany.com): Manabu Mizuno. Bold and graphic.
- [sanaa.co.jp](http://www.sanaa.co.jp): architects. Almost nothing on the page, very striking.
- [kkaa.co.jp](https://kkaa.co.jp/en/): Kengo Kuma, architect. Structured grid.
- [sou-fujimoto.net](https://www.sou-fujimoto.net): architect. Minimal project index.
- [21_21 DESIGN SIGHT](https://www.2121designsight.jp/en/): design museum in Tokyo.
- [Tokyo TDC](https://tdctokyo.org): Tokyo Type Directors Club. Typography-focused.

### Japanese brands
- [notahotel.com](https://notahotel.com): full-bleed photography with extreme whitespace.
- [hoshinoya.com](https://hoshinoya.com/en/): luxury ryokan. Calm and spacious.
- [kinto.co.jp](https://kinto.co.jp): homeware. Soft, clean product pages.
- [postalco.net](https://www.postalco.net): Tokyo stationery. Charming and handmade.
- [kaikado.jp](https://www.kaikado.jp): Kyoto tea-caddy makers. Craft and restraint.
- [d-department.com](https://www.d-department.com): long-life design store.
- [isseymiyake.com](https://www.isseymiyake.com): fashion. Graphic and experimental.
- [snowpeak.co.jp](https://www.snowpeak.co.jp): outdoor brand. Structured grid with natural photos.

### Galleries to browse more
- [godly.website](https://godly.website): curated, very aesthetic web design.
- [Awwwards: minimal](https://www.awwwards.com/websites/minimal/): award-winning minimal sites.
- [siiimple.com](https://siiimple.com): hand-picked minimal sites since 2008.
- [minimal.gallery](https://minimal.gallery): minimal website gallery.
- [Typewolf: site of the day](https://www.typewolf.com/site-of-the-day): type-led sites, with font names listed.
- [muuuuu.org](https://muuuuu.org): Japanese web design gallery.
- [io3000.com](https://io3000.com): Japanese web design gallery.
- [1guu.jp](https://1guu.jp): Japanese web design gallery.
- [sankoudesign.com](https://sankoudesign.com): Japanese web design gallery.
- [webdesignclip.com](https://webdesignclip.com): has a Japan filter.
- [choooodoii.com](https://choooodoii.com): Japanese gallery with notes on why each design works.

## 7. Reference feedback

_Nothing yet. Add likes and dislikes here as Sanskriti reviews the list._

## 8. Sections

_Not started. Sanskriti will describe each section; record its content and decisions here._

## 9. Change log

- **2026-11-13:** Wiped the old portfolio (code, GitHub history reset to one empty commit, Figma Page 14 cleared, old notes deleted).
- **2026-11-13:** Locked the type system: Redaction headings, Redaction 50 for highlights, Courier New body with Soft ink, white background, sizes 72/36 and 20/16/13. Demo saved in `explorations/type-demo.html`.
- **2026-11-13:** Gathered minimal and Japanese website references (section 6). Created this context file.
- **2026-11-13:** Sanskriti clarified that "minimal" means aesthetic and restrained, not low-content. Swapped plain text-only sites for aesthetic minimal ones.
- **2026-11-13:** Pushed this file and the type demo (`explorations/type-demo.html`) to GitHub as a backup.
- **2026-11-13:** Made `explorations/references.html`, a browsable page of all the section 6 links, built from this file. Kept local only (gitignored); section 6 is the backed-up copy.
- **2026-11-13:** Stack decided: Next.js + Tailwind (no vanilla CSS), with libraries such as Motion and Three.js used freely (section 5b).
- **2026-11-13:** Highlight cut changed from Redaction 50 to **Redaction 35** (less broken, Sanskriti preferred it).
- **2026-11-13:** Body ink changed from Soft to **Printed** (gentle edge roughening, displacement scale 0.6).
