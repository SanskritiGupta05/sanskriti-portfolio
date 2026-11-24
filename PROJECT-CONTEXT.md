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
| Framer content | `docs/framer-content.md`: real content pulled from the Framer project "New folio 2026" (hero lines, experience, case studies, testimonials, vibe-coded projects), with the leftover template text marked as not hers. Framer is connected through the Framer connector (read-only use so far). |
| Site code | `src/app/` (layout, page, `globals.css` with the Tailwind tokens) and `src/components/` (Nav, Clock, Mascot, Lantern, FujiScene, Footer, SoundToggle, ThemeProvider). The asset engines stay plain JS in `assets/` and are imported by the components. |

## 3. Locked decisions

### Colour
- **Background:** plain white `#FFFFFF`. Not off-white or paper-coloured.
- **Text ink:** `#1C1B19` (headings), `#2B2A28` (body).
- **Muted grey (labels, captions):** `#77716A` (a warmer grey; was `#6B6B6B`).
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
| Heading 1 | 60px (was 72px; reduced 2026-11-16 at Sanskriti's request) |
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

- **Framework:** Next.js 16 (App Router, TypeScript, `src/`), set up 2026-11-15 from `create-next-app@16.4.6`. Tailwind 4 through `@tailwindcss/turbopack`. Fonts from `@fontsource/redaction` and `@fontsource/redaction-35`.
- **Tokens (in `src/app/globals.css`):** colours `bg / ink / head / muted / line` are CSS variables that flip under `html[data-theme="dark"]`; fonts `font-serif` (Redaction), `font-worn` (Redaction 35), `font-mono` (Courier New); the **only** text sizes are `text-h1` 24 (was 72, 60, 48, 32, 20), `text-h2` 36, `text-lg` 20, `text-base` 16, `text-sm` 13, plus mobile `text-h1m` 18, `text-h2m` 28, `text-lgm` 18 (all other Tailwind sizes are removed). Utilities `printed` (the ink effect) and `label` (small caps labels).
- **Gotcha (Next 16 cacheComponents):** don't call `new Date()` in a server component (it breaks prerendering); compute times on the client (see `Clock.tsx`).
- **Styling: Tailwind CSS. No hand-written vanilla CSS.** Put the colours, fonts, the 5 type sizes and the Printed ink styles in the Tailwind theme (the SVG filter lives once in the root layout) as tokens, so the size rules are enforced in one place.
- **Component library: shadcn/ui (2026-11-15, Sanskriti's pick) + Motion.** shadcn uses Base UI primitives and the `cn` helper package (shadcn's own replacement for clsx + tailwind-merge). Its colour names (`background`, `foreground`, `primary`, `muted`, `border`…) are mapped in `globals.css` onto our own day/night variables, and its `dark:` variant follows `html[data-theme="dark"]`, so every shadcn component follows the lantern. `font-sans` points to Courier New; shadcn's Geist font was removed. Add components with `npx shadcn@latest add <name>`, then restyle them to the type scale (only `text-sm/base/lg/h2/h1`).
  - `src/components/ui/button.tsx`: `Button` (a real button) and `ButtonLink` (a link styled as a button). Variants `solid`, `outline`, `ghost`, `link`; pill-shaped; small-caps Courier; a springy Motion lift on hover and a squeeze on press.
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

### Batch 1: Sanskriti's own picks (2026-11-14)

I opened each one in a browser at 1440px, hovered and clicked through the interactions, and checked what it's built with.

| Site | What stands out (small details included) | Built with |
|---|---|---|
| [piyushjain.in](https://piyushjain.in) | The whole page is a **postage stamp** with perforated edges. Click a tile in the pattern strip to "pick up" a stamp, which leaves a white perforated hole; it follows the cursor and you click to stick it anywhere. Keyboard support and a reset button. Condensed italic display name with a small photo. | Custom JS; Roobert + Morganite |
| [siddique26.vercel.app](https://siddique26.vercel.app/) | **Word-by-word reveal**: each word appears behind a sliding highlight block. Company names are monospace tags with tinted backgrounds. A **"/ Jump anywhere" command bar** styled like a terminal (`/siddique work microsoft`, `open the case-study deck`, `email`), with coloured verb tags. Cursor-following spotlight on cards; accordion rows. | Next.js; Basier Square + Roboto Mono |
| [prabhavs.com](https://prabhavs.com/) | Greeting changes with the time of day ("Good morning…"). Hovering the company name swaps it for its logo; hovering his name shows a photo stack. A **pixel character walks into a scene for each hobby** (running, then a marathon arch) with a lesson under each. Folder-style project cards. Footer is an **animated illustrated chai stall** with steam, a flickering lamp, a moth, and a man on a bench nodding, plus "Ek chai ho jaaye? Text me". | Rive + Lottie, CSS keyframes; Cirka serif + Geist Mono |
| [karidesign.studio/work/claims](https://karidesign.studio/work/claims) | Case study: a row of phone screens up top, a metadata grid (role, timeline, team, scope, skills) as grey chips, and **big results in an italic serif** (−50%, Oct 2025). Sticky left contents list with an active dot, a thin **scroll progress bar** at the top, a **Before / After toggle** on the screenshots, a "Notes" switch (coming soon), and a next-case-study footer. Tiny labels in a **pixel font**. | Next.js; PP Neue Montreal + PP Editorial Old + PP NeueBit |
| [janehou.ca](https://www.janehou.ca/) | Dark, small intro with a year/company/role table. Scrolling moves the project cards sideways on a **curved, cylinder-like WebGL surface**, and the cards autoplay video. **"Leave feedback" mode** shrinks the site into a rounded card and opens a Figma-style comments panel; click anywhere to comment. | Astro + WebGL; TeX Gyre Heros |
| [mythili.site](https://www.mythili.site/) | Keywords in the bio ("interface", "motion", "3D") each get their own **colour and tiny icon**. Hovering a project icon **blurs the page** while the icon grows and real product screens fan out from it with a one-liner and "View" button. Work history is a **flight path**: a plane icon travels down a curved dotted line. Bottom dock with links and a **sound toggle**. Handwritten accent font. | Next.js; Public Sans + DM Mono + handwriting |
| [henribredt.de](https://henribredt.de/) | **All monospace** (IBM Plex Mono) on near-black. **Live clock** ("07:12:46 CET"). Linked words sit in grey highlight boxes. Hovering the black-and-white photo **turns it to colour** and shows a small caption ("Henri, eating. A little surprised. Shot on Olympus…"). Logo line-draws on hover. Footer has a **colophon** dialog listing the fonts, plus theme and text-size toggles. Handwriting font for notes. | Astro; IBM Plex Mono + Reenie Beanie |
| [knowspace.si](https://knowspace.si/?k=airplane-windows) | Landing: a **ring of photographed museum objects slowly drifting** around a serif headline. Inside: an **infinite canvas** of fact cards you drag around, zoom %, ⌘K search, "Surprise me", a daily counter ("0 of 20 today"), and a side scrubber. | Custom; Newsreader + Geist |
| [samworks.vercel.app](https://samworks.vercel.app/) | **Pixel-art banner** and avatar. Job title **cycles letter by letter** (Design Engineer ↔ Frontend Developer). Visitor counter. Thin full-width rule lines frame every section like a blueprint grid. Project cards with live status dots and tech tags. "Tech stack: hover to play". | Next.js + Motion + Tailwind; Instrument Serif + Inter |
| [dutilh.net](https://dutilh.net/) | Header is a **mosaic-tile picture** (Sutro Tower) drawn on a canvas. Big italic serif headline. Live status ("I'm away from my laptop right now"). **Tiny hand-drawn doodles** inline next to words, and a live counter in an accent colour. **Scattered polaroids** at slight angles with handwritten captions. Sound and theme toggles. | Next.js; Cormorant Garamond + Inter |
| [kshv.me](https://www.kshv.me/) | Around "design engineer" sits a **Figma-style selection box** with a dimension label (118 × 23): a design-tool joke inside a sentence. A **3D pixel/dithered temple scene** with a **time-of-day slider** (labels दिन / रात, Devanagari numerals, and a **postage-stamp slider handle**) that relights the scene. GitHub stars roll like an **odometer**. Section icons are **stamps**. "Hover to preview, click to try it live" sandbox. | Next.js + Three.js; Geist + Rozha One |
| [benlau.design](https://benlau.design/) | Pages stacked like **sheets of paper** peeking at the top. A **hand-drawn red circle** around "fractional design", and a **signature** under the bio. **Custom cursor.** Hovering a list row **dims all other rows**; tooltips like "Copy email" and "Draw something". Playground projects are Japanese-inspired: Ink (calligraphy), Sumi, Washi. | Next.js; Geist |
| [X: Pixel Play](https://x.com/SolutionB2u/status/2119458988165370270) | **Interactive pixel-art trees** (cherry blossom, bush, autumn tree) that sway with wind. Controls for weather, wind direction, speed and gusts, plus skeleton and sound toggles; "Grow back" after leaves fall. | Asset pack by feralui.dev |
| [X: Line art animation](https://x.com/dhruvtwt_/status/2119845363058426066) | A **Japanese street in thin line art** (machiya shopfronts, a canal with a boat, cyclists, umbrellas, power lines). It moves through a **day → dusk → night cycle**: windows light up warm, the moon rises, lanterns glow and reflect in the water, and bikes get headlights. A small clock sits in the corner. | Made with Claude; inspired by @zzzzshawn |
| [X: WebGL butterfly](https://x.com/Navedux/status/2119808000768741439) | A **dot-matrix butterfly** in WebGL with a technical HUD: "TRACKING 25 POINTS", live X/Y coordinate pins following the wing flutter, and a target box on the cursor. | WebGL + illos.dev shader style |

### Patterns across the batch

1. **One hand-made "world" moment per site:** an illustrated or pixel scene that's clearly personal (chai stall, temple, mosaic tower, Japanese street, sakura trees). The rest of the page stays quiet.
2. **Time and liveness:** time-of-day greetings, live clocks, day/night sliders, "away from my laptop" status, visitor counters. The site feels alive right now.
3. **Rich details inside sentences:** highlighted tags, keyword icons, a selection box, hand-drawn circles and doodles. The text is simple, but words carry small surprises. This fits our Redaction 35 highlights.
4. **Design-tool and terminal jokes as UI:** command bar, comment mode, before/after toggle, selection box, HUD coordinates. They show "I make interfaces" without saying it.
5. **Hover is where the richness lives:** photo turns to colour, icons fan out, siblings dim, logos swap in. Layouts are calm; the delight is in the interaction.
6. **Text motion:** word-by-word reveals, letter cycling, odometer digits.
7. **Paper and object metaphors:** postage stamps (two sites), polaroids, stacked sheets, signatures, folders.
8. **Type:** almost all pair a serif or display face with a mono or neutral sans, often plus a handwriting accent for notes. That's very close to our Redaction + Courier.
9. **Sound toggles** on several sites (Mythili, Dutilh, Pixel Play).
10. **Tech:** mostly Next.js (some Astro). Delight comes mostly from CSS transitions plus one heavier piece where it matters: Rive/Lottie, Three.js or WebGL.

### Ideas that fit our direction (white, Redaction, Courier typewriter)

- A **typewriter command bar** ("/sanskriti open work…") set in Courier.
- **Inline highlights** in Redaction 35, plus small hand-drawn marks (circles, arrows) for key words.
- A **live detail**, such as a local-time clock or a "currently…" line.
- **Hover reveals**: a black-and-white photo turning to colour with a typed caption, and project rows dimming their siblings.
- One **hand-made scene** as the signature moment, for example a line-art street with a day → night cycle or interactive pixel cherry trees. To be decided section by section.
- A **case-study template** like Kari's: metadata chips, big serif results, sticky contents list, before/after toggle.
- A **colophon** listing the fonts and tools: a nice nod for a type-led site.

_Still waiting on Sanskriti's own likes and dislikes from this batch._

## 8. Sitemap and section ideas

Source: Sanskriti's sitemap (`docs/portfolio-sitemap.pdf`, 2026-11-14). The ideas below are **proposals, not decisions yet**.
Bracketed names point to the references in section 7.

### Sitemap

- **Home:** logo · top scene (Mount Fuji + Japanese temple, lantern = dark/light mode) · intro (floating design objects, visual work showcase, intro text, CTA: resume + work) · tech stack · case studies (primary, vibe-coded; other projects live on the Work page) · visual experiments · why I like Japanese design (archive) · what I'm learning these days (archive) · footer
- **About:** pictures + journey · interests · design meetups · why I like Japanese design
- **Work:** primary · vibe-coded · other (GFG, Keploy, Dualite)
- **Playground**

**Content from the sitemap:**
- Primary projects: AppX, DreamLaunch × Bounce, eight.money.
- Vibe-coded projects: Uxie, Spiderman cards, "Little lights" for Diwali.
- Intro text mentions: where she works now, previous employers, B.Tech CSE graduate.
- **Journey:**
  1. Dad was the first in the family to get a computer and loved digital gadgets; that's where the interest in tech came from.
  2. Started with MS Paint and Photoshop; always the kid drawing teachers loved, and got sent to drawing competitions.
  3. Was amazed by how much information was on the internet, and got curious about how tech works.
  4. Started on Twitter, attended tech meetups, wrote blogs, did 100 Days of Code (a lot of frontend dev).
  5. Internship at GFG, one of the biggest tech-education platforms ("a dream come true"). Picked up design there, learned and explored a lot of visual design, and got a really nice farewell. Childhood creative instincts mixed with tech and creative direction gave her a head start.
  6. "Then, sky was the limit": lots of freelance gigs to understand the industry, mostly with Bangalore tech startups such as Keploy and Dualite.
  7. Worked with some of the best Bangalore startup founders and a design studio; now at AppX, a YC-backed company.
- **Interests:** painting, anime, movies, clay modelling, rangoli, cafe hopping, sketching, and now vibe coding.
- **One thing she especially likes:** going to design meetups.
- **Footer copy idea:** "Reach out / hire me so I can fund my dream Japan trip" + Calendly + a Japanese illustration.

### Ideas: Home

- **Logo:** a postage-stamp mark with perforated edges and a small Ghibli-style mascot inside [Piyush, Keshav]. **Envelope interaction:** click the stamp and it peels off and lands on an envelope, which opens to show contact links. A small detail: the stamp gets a circular Japanese postmark with today's date and time, so it's slightly different every visit [Henri's live clock].
- **Top scene:** Mount Fuji and a temple in thin line art [Dhruv line art]. **Pulling the lantern switches day → night:** the sky dims, windows and lanterns glow warm, the moon rises, and reflections appear. The page loads in the visitor's own time of day [Prabhav greeting, Keshav day/night slider]. Light mode keeps the white page; dark mode is "night". Small ambient motion: drifting clouds, birds, a swaying lantern tassel.
- **Floating design objects:** a loose ring of her real objects drifting slowly (pen-tool cursor, colour swatch, sketchbook, clay piece, rangoli powder, ramen bowl). Each has a Courier label on hover and can be dragged [Knowspace]. They can double as the visual work showcase: click one to open that work.
- **Intro text:**
  - Types itself out in Courier, typewriter style, word by word [Siddique reveal].
  - Inline details inside the sentence:
    - "product designer" wrapped in a Figma-style selection box with its size label [Keshav].
    - "AppX" swaps to its logo on hover [Prabhav].
    - A few keywords in Redaction 35 with tiny icons [Mythili].
    - "B.Tech CSE" as a typed footnote marker¹ that expands on hover.
- **CTA (Resume + Work):**
  - "Work" scrolls to the case studies.
  - "Résumé" is a sheet of paper that slides up, as if pulled out of a typewriter.
- **Tech stack:** each tool printed on a mini postage stamp, in a short row or a stamp-album strip. On hover a stamp lifts and tilts; optional typewriter-key click sound [Keshav stamps, Sam "hover to play"].
- **Case studies:**
  - **Primary** (AppX, DreamLaunch × Bounce, eight.money): large rows. On hover the page softly blurs and real screens fan out from the project [Mythili], or the other rows dim [Ben].
  - **Vibe-coded** (Uxie, Spiderman cards, Little lights): "hover to preview, click to try it live" cards that play the actual project [Keshav sandbox].
- **Case study page template:** metadata chips (role, timeline, team, scope), big results in Redaction, sticky contents list with an active dot, a reading-progress line, and a before/after toggle on screens [Kari].
- **Visual experiments:** polaroids scattered at slight angles with handwritten captions, draggable [Dutilh]. On hover a photo straightens and turns from black-and-white to colour [Henri].
- **Archive notes** (why Japanese design, what I'm learning): dated, typed index cards or journal entries, each with a "read more" to the long read. Margin notes in a handwriting accent.
- **Footer:**
  - An illustrated Japanese scene with her mascot, for example a small ramen stall or a train passing Fuji [Prabhav chai stall, Dhruv]. It changes with day/night mode.
  - **"Japan trip fund"** joke: a tiny savings jar or progress meter, with "Hire me so I can fund my dream Japan trip".
  - Calendly as "Book a chat", like a seat at the stall [Prabhav "bench pe jagah hai"].

### Ideas: About

- **Journey as a train line:** each milestone is a station. Scrolling moves a small train or her mascot along the line [Mythili flight path, Prabhav walking character]. Photos hang at stations as polaroids [Dutilh].
- **Each era styled in its own tool:**
  - The MS Paint / Photoshop station looks like MS Paint pixels.
  - The Twitter station looks like a tweet.
  - The 100 Days of Code station looks like a terminal.
  - GFG shows the farewell note.
- **Interests:** one small interactive moment each, instead of a list:
  - **Rangoli:** a symmetry drawing pad where visitors draw a rangoli with mirrored strokes.
  - **Clay:** a 3D clay piece you can spin (Three.js).
  - **Painting and sketching:** sketchbook pages that flip.
  - **Anime and movies:** ticket stubs.
  - **Cafe hopping:** a mini map with pins.
  - **Vibe coding:** a blinking cursor.
- **Design meetups:** a wall of real meetup lanyards and name badges you can swing or drag.
- **Why I like Japanese design:** the long read, typed in Courier with handwritten margin notes and Redaction highlights.

### Ideas: Work and Playground

- **Work:** an index list with filters (Primary / Vibe-coded / Other: GFG, Keploy, Dualite). Hovering a row dims the others and shows a small preview near the cursor [Ben].
- **Playground:** an infinite canvas of experiments you drag around, with "Surprise me" [Knowspace].

### Global ideas

- **Command bar** in Courier, opened with "/" (for example `/sanskriti open work`, `/sanskriti email`, `/sanskriti résumé`) [Siddique].
- **Live detail:** her local time in India.
- **Colophon:** the fonts and tools used.
- **Sound toggle:** typewriter clicks, and a wind chime in night mode.

### Open questions

- Dark mode: the lantern implies a night theme. Is white only the day theme?
- Mascot: who is it (her as a character, an animal, or an object), and how Ghibli-like?
- Navigation: top bar, bottom dock, or command bar only?
- Which reference ideas does she like or reject?

## 8b. Assets

### Mascot: pixel Sanskriti (v3, 2026-11-14)

- **Look:** must match Sanskriti's chosen reference **exactly**: a chibi pixel bust with big, dark, wavy hair and brown streaks, a peach face, large dark eyes, round orange blush, a small smile and a visible ear. She wears a cream cardigan over a red top and holds a mug with a red heart, with steam curls and gold four-point sparkles around her. **No glasses.**
- **How it's built:** the reference image was read cell by cell (the original pixel art is about 15.8 screen pixels per art pixel, a 79×79 grid). Its colours were grouped into a palette, and the result was cropped and padded to **64×64**. That grid is stored as text in `BASE` inside `assets/mascot/mascot.js`. The reference PNGs (`mascot-ref.png`, `mascot-reading-ref.png`, `mascot-ramen-ref.png`, `mascot-drawing-ref.png`) are kept locally in `explorations/_ref/` (not pushed).
- **API:** `buildFrame(activity, frame, { blink })` returns a pixel grid; `toSVG(grid, scale)` renders crisp SVG.
- **Activities** (auto mode cycles every ~6 s):
  - **Coffee:** the reference pose. The steam drifts and she sips with happy closed eyes now and then.
  - **Reading:** its own exact sprite, read pixel by pixel from Sanskriti's second reference: a red book with a leaf emblem, a stack of books on the left, the heart mug on the right, and a wooden table. It's 93×86 at about 11.4 px per art pixel, a finer grid than the coffee pose. **Pages flip:** every ~3 s a curved cream page lifts from the right, arcs over the spine and settles on the left. She also blinks, and one of the three sparkles rests at a time so they twinkle.
  - **Ramen:** its own exact sprite, read pixel by pixel from Sanskriti's ramen reference (97×92, 11 px per art pixel). She slurps noodles with chopsticks from a red patterned bowl with egg, greens and narutomaki, sitting at the wooden table. **Animation:** the hanging noodles wiggle (slurp), the steam curl on the left rises and settles, she blinks, and the sparkles twinkle.
  - **Drawing:** its own exact sprite, read pixel by pixel from Sanskriti's drawing reference (115×100, about 10.6 px per art pixel). A 2× sharper read was tried and **rolled back**: Sanskriti prefers the chunkier, 16-bit pixel look. Don't sharpen any pose. She draws Mount Fuji, a pagoda, cherry blossoms and a red sun in a sketchbook, with a heart mug on books, a pencil cup and a sleeping calico cat. **Animation:** the pen hand bobs as if mid-stroke, the steam rises, she blinks, and the sparkles twinkle.
  - She blinks at random in every pose, and the sparkles twinkle.
- **Shared frame:** every pose renders over the same area of its original 1254px artwork (source x 20–1235, y 140–1180; widened so the drawing pose's books and cat fit). `toSVG(grid, height)` uses each grid's `viewBox` with `preserveAspectRatio="none"` and a 1215:1040 aspect, so switching poses doesn't jump.
- **How coffee-based poses are made:** each prop is drawn over the mug-and-hands area of the base. Eyes and mouth are swapped by clearing fixed boxes: left eye x19–25, right eye x33–38, rows 23–29; mouth at rows 31–32, x27–31. Steam pixels are removed for non-coffee poses.
- **Preview:** `explorations/mascot.html` (local only), served by the "portfolio-explorations" config, port 3015.
- **Known small issue:** a 1px dark mark stays beside the left eye when the eyes are closed. That's the hair edge in the reference.
- **All four poses are exact copies of her references.** Any new pose should come from a new reference image, extracted the same way: find the art-pixel size, sample cell centres over the shared frame, map colours to the palette, and add new keys for new colours.
- **Extraction tool:** `node assets/mascot/tools/extract.mjs <image.png> <cellX> <cellY> <originX> <originY> <cols> <rows> <out.json>`. It uses only Node built-ins. Read at the image's **native art-pixel size** (not 2×): Sanskriti wants the chunky pixel look.
- **Drawing motion (2026-11-15):** Sanskriti's screen recording showed the old version looked static: the hand only bobbed up and down. Now the drawing pose (64 frames × 140 ms, about a 9 s loop) has:
  - **Writing strokes:** her fist glides left and right (`STROKE`), the pen cap stays attached, and pencil marks build up on the page, then reset.
  - **Breathing:** her head, hair and shoulders lift 1 px for about 2 s of every 4.5 s (rows 0–54, x 20–95; the bottom row stays put so nothing tears).
  - **Smile:** once per loop she pauses her pen and smiles with happy closed eyes (^ ^) for about 1 s.
  - **Cat breathing:** its back rises 1 px on a slower rhythm, out of step with her.
  - **Wavy steam:** the curl from her mug sways side to side as it rises.
  - **Blinks and sparkles:** she blinks at random, and resting sparkles disappear fully (no leftover dot) in every pose.
- **Performance note:** on the real site, render the sprites to a `<canvas>` (or pre-render frames to PNG) instead of rebuilding SVG every tick.
- **Ideas for later:** clay modelling, painting, rangoli, vibe coding on a laptop, at a design meetup; using her inside the stamp logo and the footer scene.
- **Superseded:** v1 (40×40, glasses on her head) and v2 (64×64, hand-drawn) were replaced because she must look exactly like the reference.

### Stamp asset: the S stamp (2026-11-15)

- **The asset is Sanskriti's own image**, used as-is (not redrawn): a red postage stamp with cream perforated edges, an embossed cream **S** inside a scalloped frame, cherry blossoms, Mount Fuji with a rising sun, and a seigaiha wave pattern, all with a paper texture.
- **Files:**
  - `assets/stamp/stamp-s.png`: the master, 996×1073, transparent background, trimmed.
  - `public/assets/stamp-s.png`: the web copy, 557×600, about 800 KB. On the real site, serve it through Next `<Image>` so it's converted to WebP or AVIF and resized automatically.
- **Interaction idea (demo):** on hover it lifts and tilts with a soft drop shadow; on click it presses down with a small bounce. Preview: `explorations/stamp.html` (local only).
- **Superseded:** the first round of pixel-art stamps (postage, wax seal, hanko in `assets/stamp/stamp.js`) was removed when Sanskriti chose this image instead.
- **Likely uses:** the logo or brand mark, the envelope interaction from the sitemap, the favicon (check it reads at 32px), and section accents.

### Fuji scene: an interactive pixel-art banner (v1, 2026-11-15)

- **Brief:** a Japanese take on Sam's pixel waterfall banner (samworks.vercel.app). It has Mount Fuji, a temple, a lady in a kimono, cherry blossoms and birds. The edges are soft so the **top fades into the page**, like the feathered footer scene on mythili.site. Sanskriti's photo references: Fuji framed by cherry blossoms over Lake Kawaguchi, the Chureito pagoda with Fuji, and torii gates in front of Fuji.
- **Source:** `assets/scene/fuji-scene.js` (no framework). `mountFujiScene(canvas, { seed, fps })` paints a **400×170** pixel canvas, which is scaled up with `image-rendering: pixelated`, and returns `{ destroy() }`. The soft edges are a CSS mask on the canvas: the top fades from transparent to 34%, the bottom fades out over the last 12%, and the sides over 7%. See `explorations/scene.html` (local only, port 3015).
- **What's in it, back to front:**
  - **Sky:** calm colour bands with a dither only where they meet.
  - **Fuji:** concave slopes lit from the left, ridges and gullies fanning from the summit, a jagged snow cap with snow fingers running down the ridges, haze at the base, and a cloud bank on its shoulders.
  - **Hills and lake:** three hill ranges, and a lake with Fuji's snow reflected and twinkling sparkles.
  - **Right side:** a wooded rise with green and blossom treetops, and a red five-storey pagoda (Chureito-style) with dark swept roofs, gold eave bells and a bronze spire.
  - **Left side:** a red torii gate.
  - **Foreground:** a meadow with a path that climbs to the pagoda's stone steps, a stone lantern, three cherry trees, fallen petals and tiny white flowers.
- **Life (14 fps):**
  - **Movement:** drifting clouds, falling petals that sway, and flocks of birds that flap across the sky.
  - **The lady:** she walks up the path, stops, and every so often scatters food. Sparrows fly down to peck at it, then leave. After a while she walks up to the pagoda and fades into the temple, then the loop starts again from the bottom of the path.
- **Clicks:**
  - **Pagoda:** its wind bells ring (a Web Audio chime with three bell partials and random pentatonic notes), the bells sway, and gold sparkles rise.
  - **A bird** (in the sky or on the ground): it and its neighbours fly off.
  - **The lady:** she throws food, and sparrows come down to eat.
  - The cursor turns into a pointer over anything clickable.
- **Ideas for later:** a night mode tied to the lantern idea (lit pagoda windows, a glowing stone lantern, the moon, fireflies), the lady sitting on a bench, ripples on the lake, a mute toggle, reduced motion for people who turn animations off, and pausing when the scene is off-screen.
- **Feedback (2026-11-15):** Sanskriti says v1 doesn't look as good as Sam's banner. The code-drawn art is flatter than hand-made art.
- **How Mythili's footer scene is built (inspected 2026-11-15):**
  - A top-down park, drawn on a **WebGL canvas** with no image files loaded, plus **two 2D canvases** on top for the small moving things: people walking with soft shadows, ducks and swans.
  - A soft, painterly, felt-like texture with film grain over everything. Drifting **cloud shadows**, and an umbrella casting a shadow.
  - The edge is **feathered and blurred**, like torn paper.
  - **Clicking the pond makes ripple rings.** There's a "Turn park sound on" button for ambient park audio, and the cursor is a pointer over the scene.
  - Its aspect is 4:5 on mobile and wider on desktop.
- **Proposed rebuild:** the quality in both Sam's and Mythili's scenes comes from art made by hand or with tools, then brought to life in code. Plan: Sanskriti makes or generates the base illustration (pixel like Sam's, or painterly like Mythili's), and I add the life on top (petals, birds, the lady, bells, lake ripples, cloud shadows, grain, feathered edges, an ambient sound toggle). **Waiting on her choice of style.**
- **Both versions built to compare (2026-11-15).** Sanskriti meant the live, interactive scene, not generated images. AI image previews were also made in Canva (in her Canva uploads), but the comparison that matters is the code:
  - **A · Pixel:** `assets/scene/fuji-scene.js`, 400×170 pixels.
  - **B · Painterly:** `assets/scene/fuji-scene-painted.js`, a 1200×510 logical space at 3× the pixel layout, so everything lines up. It uses soft gradient shapes, blur, fluffy blossom clusters, a reflected Fuji in the lake, a film-grain overlay and a vector lady and sparrows. It renders at the device's pixel density at 30 fps.
  - **Same life and clicks in both:** bells on the pagoda, birds flying off, the lady feeding sparrows (now even mid-walk: she stops to feed them), and **ripples where you click the lake** (new). **Drifting cloud shadows** over the meadow are also new.
  - **Shared sound:** `assets/scene/scene-audio.js` has `chime()`, `chirp()`, and `setAmbient(on)` for a breeze with occasional birdsong, like Mythili's "park sound". The comparison page has a Sound on/off toggle.
  - **Comparison page:** `explorations/scene.html` (local only).
  - **Decision (2026-11-15): A · Pixel.** The painterly version (`fuji-scene-painted.js`) was deleted; it's still in git history. The scene keeps lake ripples, cloud shadows and the shared ambient sound.
  - **v2 rewrite (2026-11-15), after Sanskriti's feedback** that the interactions felt unrefined, the cherry trees weren't good enough, and Fuji and the temple needed work. The torii should be near the temple, with a bell.
    - **Canvas:** now **440×170** (wider), running at 30 fps with time-based motion.
    - **Cherry trees in the Pixel Play style** (from the Twitter video): a recursive dark branch skeleton drawn into the backdrop, plus hundreds of tiny pale-pink blossom clusters drawn every frame. The clusters are airy with ragged edges, lit from the top left and paler higher up. The canopy **sways in the wind** with occasional gusts, and petals pool under each tree. **Clicking a tree** shakes it and sheds a burst of petals; a few clusters thin out, then grow back. Hovering makes it rustle.
    - **Fuji:** four-tone lighting, gullies and sunlit ridges fanning from the summit, rocky speckle, and a snow cap with fingers down the gullies and rocks poking through. There's a belt of forest at the base, then haze.
    - **Temple complex on the right:**
      - A **wide main hall**: stone platform and steps, red pillars, white walls with lattice doors, a big swept hip-and-gable roof with tiles, gold ridge ornaments and a name plaque.
      - A **wider five-storey pagoda** with tiled swept roofs, balconies and a bronze spire.
      - Wind bells on both work as damped pendulums.
    - **The torii sits on the path just in front of the hall**, flanked by two stone lanterns, with a **shrine bell (suzu) on a red-and-white rope** hanging from its beam. Clicking it makes the bell swing with pendulum physics and play a jingly `suzu()` sound. The lady rings it on her way into the hall.
    - **Hover reactions:** temple bells sway, the torii bell glints, a tree rustles, the lady pauses and bows, and **sparrows fly off if the pointer gets too close**. The cursor is a pointer over anything clickable.
    - **Refined motion:**
      - **Birds:** three-frame flaps with glides; they flee by climbing and speeding up, with a chirp.
      - **Sparrows:** glide in on an eased arc, land with a hop, then peck, look around and hop between grains.
      - **Seeds:** arc out of her hand and bounce once.
      - **Lady:** a four-frame walk cycle with a step bob, a two-frame throw, and a soft shadow.
      - **Lake:** clicking makes ripples, and sometimes a **koi leaps** and lands with a splash.
    - **New sounds** in `scene-audio.js`: `suzu()`, `rustle()` and `splash()`.
    - **Lady made more visible (2026-11-15):**
      - A bigger **14×28 sprite** in the original **indigo kimono** (darker indigo shading, light-blue flower dots; Sanskriti preferred it over a pink version), with a white collar, a red obi with a gold cord, a black hair bun with a pink kanzashi, a visible eye, tabi and zori.
      - The path is now a polyline that **enters from the left edge**, runs along the front of the lake, through the torii, up to the hall, so her whole walk stays on screen. She feeds the sparrows at x≈150 and rings the torii bell as she passes.
      - The bottom edge fade was shortened to the last 6%.
    - **Clouds move with the wind (2026-11-15):** the cloud bank on Fuji's shoulders is now drawn live instead of painted into the backdrop. It drifts slowly across the mountain (x 30–330) and fades in and out at the ends. The sky clouds move faster, each at its own speed, and both layers speed up in gusts.
    - **More birds and the lady enters the temple (2026-11-15):** small grey far-off birds now fly in loose flocks across the sky (three at the start, up to 14 birds, a nearer flock always around). After the torii the lady no longer vanishes: she turns her back to us (a back-view sprite with her hair bun and a red drum-knot obi bow), climbs the steps, claps twice, bows, and the deep temple bell (bonshō) rings while the doorway glows warm. She then fades inside, and after about 12 seconds she starts the walk again from the left. Clicking the hall also rings the temple bell; the pagoda keeps its wind chimes. New sounds in `scene-audio.js`: `templeBell()` (a low 98 Hz strike with beating partials and a long tail) and `clap()`. `mountFujiScene` returns a `_debug` handle (`lady`, `flock`) for testing.
    - **Night version (2026-11-15), switched by the lantern:** `scene.setNight(on, instant?)` (or `mountFujiScene(canvas, { night: true })`) fades the scene to night over about 1.3 s.
      - **How it works:** each frame the finished day picture is re-graded to moonlight, a blue tint that darkens towards the top of the sky so it melts into the dark page; snow and white walls stay pale. Then the things that glow are drawn on top.
      - **What glows:** about 70 twinkling stars (only on open sky, never over clouds), and a full moon top-left with a halo and a shimmering moon path on the lake. The paper walls of the hall and pagoda light up warm with a slow flicker (not where a tree or the lady is in front). The two stone lanterns by the torii glow, fireflies drift over the meadow, and the lady carries a little glowing paper lantern.
      - **Moonlight on the trees:** the moon sits at (70, 46), low enough to clear the faded top edge. Blossom pixels facing the moon turn silvery (higher clusters more), so the canopies are lit on the moon's side and shadowed underneath. Bark edges, the lighter foliage and the meadow highlights catch a faint cool rim.
      - **The lady stays visible at night:** she isn't darkened like the rest. Her own pixels are re-lit after the moonlight grading: at least 60% of her day colours, warmer and brighter near her lantern, with a faint cool moonlit edge on her outline. Her lantern's halo is drawn behind her so it doesn't speckle her kimono.
      - **Quieter by night:** the sun rays and cloud shadows fade out, and birds mostly roost (at most a few far flocks).
      - **Sound:** `setNightSound(on)` in `scene-audio.js` swaps the ambient birdsong for crickets (`cricket()`).
      - **Wiring:** in `explorations/scene.html` the lantern hangs top-right; its `onToggle` sets the page theme, `scene.setNight` and `setNightSound` together.
  - **Polish after choosing pixel (v1):**
    - **Trees:** lumpy outlines, dark rims underneath and speckled highlights, with slim dark pines mixed in on the pagoda's hill.
    - **Sun rays:** faint diagonal rays from the top right, gently pulsing.
    - **Grass:** taller tufts, denser toward the front.

### Lantern: the light/dark switch (2026-11-15)

- **Brief:** Sanskriti's reference is a paper chōchin lantern hanging from a wooden wall bracket on a bronze hook and ring. It has bronze rims, a cherry branch with blossoms and buds, a red Fuji with a snow cap over seigaiha waves, and a red knot, bead and tassel below. **The site starts in light mode with the lantern unlit. Pulling the tassel lights the lantern and switches the whole site to dark mode. Pulling again switches back.**
- **Source:** `assets/lantern/lantern.js`, built in SVG (not the reference image). `mountLantern(host, { lit, bracket, sound, onToggle })` returns `{ setLit, lit, destroy }`. The page sets its own theme in `onToggle(lit)`; the demo sets `data-theme="dark"` on `<html>` and swaps CSS colour variables with a 0.7 s fade. See `explorations/lantern.html` (local only, port 3015).
- **Art wraps around the barrel:** the branch, blossoms, buds, Fuji and waves are laid out flat, then wrapped onto the cylinder (`warp()`): they squeeze in towards the sides, and blossoms and wave scales narrow as they turn away. Horizontal lines bow slightly because we look up at the lantern. The ribs run around the barrel and the seams follow its bulge. The branch is a gnarled, tapering curve with curved twigs (Catmull-Rom spline), not straight strokes. The cord from the bottom rim to the knot is 16 units longer than at first.
- **Unlit:** warm cream paper with horizontal ribs, faint seams, and edge shading.
- **Lit:** a multiply layer turns the paper amber, and a screen layer adds a bright core with a gentle candle flicker. A soft orange glow spreads around the lantern, the bottom opening glows, and the bracket dims. The light flickers on over about 0.9 s.
- **Interaction:** drag the tassel down: the cord stretches with resistance and the light switches once it's pulled past about half way. A tap, Enter or Space also pulls it. **Clicking the lantern itself (body, rims, hook) also switches**: it works like a quick tug, so the cord jolts and the lantern swings. The glow around a lit lantern doesn't catch clicks. The cord springs back with a bounce, the lantern swings from the pull and sways gently in a breeze all the time, and the tassel trails behind. Hovering nudges it. Sound: `cordPull(on)` in `scene-audio.js`, a soft click plus a small rising (on) or falling (off) tone. Reduced motion turns off the sway.
- **Placement:** the bracket sits flush in the page's top-right corner, with no gap above or to the right (Sanskriti's call). The SVG viewBox is cropped to the bracket (`0 12 384 688`), and the host is `position: absolute; top: 0; right: 0`, outside any centred column.
- **Gotcha:** the lantern must sit above other content (`z-index`), or the page text catches the clicks.

## 8c. Hero section: versions to choose from (2026-11-15)

All six are live, with the real assets, in `explorations/hero.html` (local only, port 3015). Pick one with the switcher at the bottom, or open `#A` … `#F`. Every version shares the nav (S stamp + name, Work / About / Playground, live India time), the corner lantern that switches the page and the scene to night, the cycling mascot (click it to change pose), and the same copy: "Hi, I'm Sanskriti." (name in Redaction 35) plus a lead line in Printed Courier (AppX, YC-backed; before: Keploy, Dualite, GeeksforGeeks; "If I don't know something, I learn it") and Résumé / See work buttons.

| Version | Idea |
|---|---|
| **A · Scene banner** | Sam + Keshav. The Fuji scene is a full-width banner melting into the page (cropped to about half the screen height); the mascot sits beside the intro below it. |
| **B · Horizon** | Text first, editorial. Heading, lead line and buttons up top with the reading mascot beside them; the scene sits low like a horizon you scroll into. |
| **C · Postage** | Piyush + Keshav. The scene is framed as a big perforated postage stamp on cream paper, tilted slightly, with a live postmark (today's date and India time). Intro and the drawing mascot on the left. |
| **D · Moon window** (custom) | A round marumado window, like a Japanese tea room's: Fuji is seen through a wooden circle on a sill, with the mascot eating ramen on the sill. |
| **E · In the scene** (custom) | The scene is the whole hero. The headline floats in its sky; the mascot sits in the meadow drawing, with a typed speech bubble ("Psst. I'm the one drawing all this…"). The lead line and buttons come below. |
| **F · Postcard** (custom) | The hero is a postcard from her: Fuji on the picture side ("Kawaguchiko, someday: the trip this portfolio is saving for"), a "Dear visitor," letter signed in Redaction 35 on the other side, the S stamp with a live postmark, and the mascot peeking from behind. |

_Sanskriti picked **A**, with the Fuji scene moved to the footer (see 8d)._

## 8d. Home page as built (2026-11-15)

- **Layout:** one narrow centred column, `max-w-[720px]`, with wide empty margins on both sides, like Sam's and Mythili's sites (Sanskriti's call). The lantern hangs outside the column from the page's top-right corner, at `w-[clamp(80px,8.8vw,128px)]` (20% smaller than first built, at Sanskriti's request).
- **Hero = version A without the scene banner** (Sanskriti chose A, with the Fuji scene moved to the footer and "mascot + intro only" on top):
  - nav: S stamp + "Sanskriti", Work / About / Playground, "India · live time";
  - **sizes reduced a bit (2026-11-16):** the H1 is 60px, the intro line is body 16px (was 20px), and the buttons are 48px tall with 16px labels and a smaller sprig;
  - **everything centre-aligned** (mascot, label, heading, lead line, buttons), at Sanskriti's request;
  - the pixel mascot at **210px** (30% smaller than first built), cycling poses (click to change), with only a small gap (12px) above the label;
  - label "Product designer · builds in code", the H1 "Hi, I'm Sanskriti." (name in Redaction 35), a lead line in Printed Courier, and two **sakura buttons** built in code in the style of Sanskriti's two references (`src/components/ui/sakura-button.tsx`, `SakuraButtonLink`). **The references set the style only; the labels stay "Résumé" and "See work"** (Sanskriti's clarification):
    - **Primary "Résumé"** (`tone="lacquer"`): a lacquer-red pill with a felt texture, a pale cherry-blossom sprig top-left, gold seigaiha waves bottom-right fading towards the label, and a cream Redaction label.
    - **Secondary "See work"** (`tone="paper"`, no arrow: Sanskriti removed it): a cream paper pill with a thin red border, a pink sprig of three flowers on the left, a loose petal and a red Redaction label.
    - **The flowers are drawn to feel painted, not stiff** (Sanskriti found the first version stiff): each petal has its own size, width and angle, a gradient from a deeper pink base to a pale edge, a notched tip and a faint vein; there are stamens with pollen dots, teardrop buds with sepals, and soft shadows. **The branch is a gentle S-curve** that tapers smoothly (drawn in five pieces that get thinner), with curving twigs ending in buds on bent stems. A stronger drooping arch was tried and rejected as droopy; Sanskriti picked the gentle S-curve. Petals are round and full, each leaning slightly differently. The sprig sways gently all the time.
    - Motion on hover: the button lifts, the sprig sways more, each flower bobs, a petal drifts away and fades, the waves drift (primary) and the arrow bounces (secondary); pressing squeezes it.
    - **Border:** the See work button's border is now its own cream hue (`#e2cdaf`), not dark red, so it reads as part of the button (Sanskriti's ask).
    - **Skeuomorphic finishes** (`finish` prop) to choose from, compared live at **`/lab/buttons`** (a scratch page, not linked and not indexed): `flat` (current), `gloss` (A, soft lacquer: glossy top highlight, bevel, soft shadow), `stitched` (B, embroidered patch: raised rim, dashed stitch line, pressed-in label), `raised` (C, a physical key: a thick base in a darker shade of its own colour that it sinks into when clicked). **Sanskriti picked C, `raised` (physical key), for the hero (2026-11-16).**
    - Flower numbers are rounded so the server and browser render the same (avoids a hydration warning).
    - The nav links and buttons don't point anywhere yet.
  - The mascot sits 16px under the nav (Sanskriti found the first gap too big).
- **Footer:** the Fuji scene at column width (it follows day/night), "Hire me, so I can fund my dream Japan trip." (H2, "Japan trip" in Redaction 35), a line inviting people to click around the scene, then links, a Sound toggle (breeze and birds by day, crickets by night), and "Set in Redaction & Courier New · © 2026 Sanskriti".
- **Day/night:** `ThemeProvider` holds `night`; the lantern sets it, which flips `data-theme`, the Fuji scene (`setNight`) and the ambient sound together.
- **Hero copy now comes from her Framer portfolio** (2026-11-16, hero section only, at her request; see `docs/framer-content.md`):
  - label: "Product Designer · Engineer turned Designer";
  - H1: **"From messy problems to meaningful products."** (Sanskriti's own line, 2026-11-16; replaced the Framer "I design products, that people actually use!"), on two lines with "meaningful products." in Redaction 35. On desktop the heading may extend 64px past the column on each side (`md:-mx-16`);
  - lead: "Turning complex ideas into simple, scalable digital experiences.";
  - a label under the buttons: "Delhi NCR, India · Open to work · Trusted by 20+ startups".
  The other Framer content (experience, case studies, testimonials, projects) is saved but not used yet.

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
- **2026-11-14:** Analysed Sanskriti's first batch of 16 inspiration links (11 sites + X posts): interactions, details, tech and patterns, in section 7.
- **2026-11-14:** Added Sanskriti's sitemap and a first round of section ideas based on the references (section 8).
- **2026-11-14:** Made the pixel mascot v1 (ramen, drawing and reading poses, random blinks, auto cycling) in `assets/mascot/mascot.js` (section 8b).
- **2026-11-14:** Mascot v3: rebuilt pixel-for-pixel from Sanskriti's reference image (coffee pose), with ramen, drawing and reading poses on top.
- **2026-11-14:** Reading pose rebuilt pixel-for-pixel from Sanskriti's reading reference, with flipping pages, blinks and twinkling sparkles.
- **2026-11-14:** Ramen pose rebuilt pixel-for-pixel from Sanskriti's ramen reference, with a noodle slurp wiggle, rising steam, blinks and twinkling sparkles.
- **2026-11-14:** Drawing pose rebuilt pixel-for-pixel from Sanskriti's drawing reference (pen stroke, steam, blinks, sparkles). The shared frame was widened for all poses. All four mascot poses now match her references.
- **2026-11-15:** Drawing pose re-read at 2× resolution: the sketchbook painting, cat and props now match the reference closely. Precise closed-eye blink, sparkles hide fully when resting, and a reusable extraction tool added (`assets/mascot/tools/extract.mjs`).
- **2026-11-15:** Rolled the drawing pose back to the 1× version: Sanskriti prefers the chunkier 16-bit look over the sharper 2× read. The drawing hand motion is to be redone from her video. The extraction tool is kept.
- **2026-11-15:** Drawing motion redone after Sanskriti's screen recording: short side-to-side writing strokes with marks appearing, instead of the hand bobbing up and down.
- **2026-11-15:** Drawing pose brought to life: breathing, an occasional happy smile, the cat breathing, wavy steam. The resting-sparkle dot is removed in all poses.
- **2026-11-15:** Stamp asset, first round: postage stamp, wax seal and hanko, each with an S, in the mascot palette (`assets/stamp/stamp.js`).
- **2026-11-15:** The S stamp asset is now Sanskriti's own stamp image, saved with a transparent background (`assets/stamp/stamp-s.png` + web copy `public/assets/stamp-s.png`). The pixel stamp versions were removed.
- **2026-11-15:** Fuji scene v1: an interactive pixel-art banner with Fuji, the pagoda, a torii, cherry trees, the lady in a kimono, birds and sparrows, bell sounds, and soft transparent edges (`assets/scene/fuji-scene.js`).
- **2026-11-15:** Built a painterly version of the Fuji scene next to the pixel one, with the same interactions. Added lake ripples, cloud shadows and shared ambient sound with birdsong and chimes to both. Comparison page set up.
- **2026-11-15:** Sanskriti chose the pixel Fuji scene. Removed the painterly version, then polished the pixel one: richer trees and pines, sun rays, grass tufts.
- **2026-11-15:** Fuji scene v2: Pixel-Play-style swaying cherry trees, a more detailed Fuji, a wide temple hall and wider pagoda, the torii moved in front of the hall with a shrine bell, hover reactions, refined bird, sparrow and lady motion, and a koi that leaps from the lake. Canvas widened to 440×170.
- **2026-11-15:** The lady is bigger (14×28), in a pink kimono, and walks in from the left along a longer path that stays fully in view. The bottom fade is smaller.
- **2026-11-15:** Kimono colours set back to indigo with a red obi (pink was tried; Sanskriti preferred the original). The bigger size stays.
- **2026-11-15:** Clouds now drift with the wind: Fuji's cloud bank moves slowly, the sky clouds faster, and both quicken in gusts.
- **2026-11-15:** More background birds (far-off flocks). The lady now enters the temple: back view, two claps, a bow, the deep temple bell with a glowing doorway, then she goes inside and later restarts. Clicking the hall rings the temple bell.
- **2026-11-15:** Lantern asset: an SVG paper lantern from Sanskriti's reference. Pulling the tassel lights it (glow + flicker) and switches the page to dark mode (`assets/lantern/lantern.js`, `cordPull` sound).
- **2026-11-15:** Fuji scene night version, switched by the lantern: moonlight grading, stars, moon and moon path, glowing hall, pagoda and stone lanterns, fireflies, the lady carries a lantern, birds roost, crickets replace birdsong.
- **2026-11-15:** Night scene: moonlight falls on the trees (silvery blossoms on the side facing the moon, a cool rim on bark and foliage); the moon moved lower so it isn't lost in the top fade.
- **2026-11-15:** Night scene: the lady is lit by her lantern and the moon so she stays clearly visible.
- **2026-11-15:** Lantern bracket now meets the top and right edges of the page with no spacing.
- **2026-11-15:** Clicking the lantern body now switches light/dark too, not only the tassel.
- **2026-11-15:** Lantern: the art now wraps around the cylinder (the branch curves and tapers, things squeeze towards the sides, ribs and seams follow the barrel), and the tassel hangs on a slightly longer string.
- **2026-11-15:** Made a local all-assets page, `explorations/assets.html` (port 3015, not in git). It shows the mascot (4 poses), the stamp, the Fuji scene and the lantern together, and the lantern switches the whole page and the scene to night.
- **2026-11-15:** Built six hero versions with the real assets (A banner, B horizon, C postage, plus custom D moon window, E in the scene, F postcard) in `explorations/hero.html` for Sanskriti to choose from (section 8c).
- **2026-11-15:** Set up the real site (Next.js 16 + Tailwind 4, tokens for the type scale and day/night colours). Built the home page: a narrow 720px column with wide margins, hero A without the banner (nav, mascot, intro, buttons), the corner lantern switching the whole site to night, and the Fuji scene in the footer.
- **2026-11-15:** Hero centre-aligned: mascot, label, heading, intro and buttons.
- **2026-11-15:** Site lantern made 20% smaller (max 128px wide).
- **2026-11-15:** Hero buttons changed from sharp corners to rounded pills.
- **2026-11-15:** Added shadcn/ui + Motion. Mapped shadcn's colours onto the day/night variables and removed its Geist font. The hero buttons are now the shadcn Button (pill, springy hover and press). Mascot made 30% smaller (210px), with a smaller gap to the text.
- **2026-11-15:** Hero buttons rebuilt from Sanskriti's references: primary red "View work ↗" with blossom sprig and waves, secondary cream "Contact ✉" with a falling petal, both animated with Motion. Résumé dropped from the hero. Less space between the nav and the mascot.
- **2026-11-16:** Hero buttons: labels back to "Résumé" (primary) and "See work ↓" (secondary), since the references were for style only. Flowers redrawn to feel painted rather than stiff (varied gradient petals, stamens, buds, tapered branch, idle sway, per-flower hover motion).
- **2026-11-16:** Button branches reshaped into a drooping arc with curving twigs and bent bud stems (they looked stiff), and the petals made rounder.
- **2026-11-16:** Branches back to the gentle S-curve (the arch looked droopy). See work border now in its own cream hue. Added three skeuomorphic finishes (soft lacquer, stitched patch, physical key) to compare at `/lab/buttons`.
- **2026-11-16:** Hero buttons now use the "physical key" finish: a darker base in each button's own colour that the button sinks into when clicked.
- **2026-11-16:** Brightened the colours across the site: Résumé is a brighter vermilion (`#e3563f`→`#b0321f`) with a lighter base and seigaiha; See work is a lighter cream with a vermilion label; the blossoms are pinker; the lantern red is brighter (`#e5583a`); the footer Fuji scene gets `saturate(1.2) brightness(1.05)`; labels use a warmer grey; night mode is a little lighter (bg `#17161e`, text `#eee8dc`).
- **2026-11-16:** Removed the ↓ arrow from the See work button.
- **2026-11-16:** Hero made a bit smaller: H1 token 72 → 60px, intro text 20 → 16px, buttons 56 → 48px tall with 16px labels and a scaled-down sprig and waves.
- **2026-11-16:** Connected Framer and pulled the real content from "New folio 2026" into `docs/framer-content.md` (read-only; nothing changed in Framer). Waiting for Sanskriti to choose what to use.
- **2026-11-16:** Hero text replaced with the hero copy from her Framer portfolio ("I design products, that people actually use!" and friends).
- **2026-11-16:** Hero heading changed to "From messy problems to meaningful products."
- **2026-11-16:** Tried an envelope intro (washi envelope with a mizuhiki knot and the S stamp that unties, opens and turns into a note card beside the hero). Sanskriti found the transitions not smooth enough and **dropped the idea**; the prototype was deleted and the site stays as it was.
- **2026-11-16:** Hero heading changed to "a designer by craft, / an engineer by education. / a builder by curiosity." in all lowercase, three lines on desktop, with the last line in Redaction 35.
- **2026-11-16:** H1 made smaller: 48px desktop (was 60), 40px mobile (was 48), line height 1.1.
- **2026-11-16:** H1 down to 20px desktop, 18px mobile, line height 1.35 (Sanskriti asked for 32, then 20). Note: H2 (36) and text-lg (20) are now as big or bigger than H1; revisit the scale when H2 is first used.
- **2026-11-16:** Removed the "Product Designer · Engineer turned Designer" label above the heading. Heading line breaks removed, so at 20px it sits on one line on desktop.
- **2026-11-16:** Heading now opens with "Hey, i'm Sanskriti" as its own line inside the H1. `NameSwap` (src/components/NameSwap.tsx, Motion) swaps the name into katakana サンスクリティ sound by sound (Sa→サ, n→ン, s→ス, kri→クリ, ti→ティ, 140 ms apart), 2.5 s after load, then back and forth every 3.5 s. Katakana uses `font-jp` (Hiragino Mincho / Yu Mincho / Noto Serif JP). Screen readers always hear "Sanskriti"; with reduced motion it stays in English.
- **2026-11-16:** Hero description replaced with Sanskriti's new text ("Product designer working across visual design, UX, motion and AI-assisted development…"), centred, max 58 characters wide.
- **2026-11-16:** Page column widened from 720 to 874px (side margins at 1440 down 20%, 384→307px). Mascot 20% smaller (168px). "Hey, i'm Sanskriti" moved out of the H1 into a **speech bubble above the mascot** (rounded, `border-line`, `bg-bg`, small tail). `NameSwap` rebuilt for smoothness: both spellings overlap in one spot and cross-fade sound by sound with a soft blur, while the width eases 86→105px; swaps every 4 s. Katakana now in a light Japanese sans (`font-jp`: Hiragino Sans / Yu Gothic / Noto Sans JP, weight 300, 0.92em), which reads cleaner and narrower than the Mincho serif. H1 back up to 24px on desktop (18px mobile).
- **Dev gotcha:** edits to `globals.css` theme tokens sometimes don't reach the browser, even after restarting `next dev`. Stop the server, delete `.next/dev`, and start it again.
- **2026-11-16:** Heading breaks after "education." on desktop (two lines).
- **2026-11-16:** New hero description: "A product designer at AppX (YC'21). I work across visual design, UX and motion, helping startups take ideas from 0 to 1. With a background in computer science, I'm also exploring AI-assisted development and building things beyond the design canvas." The four skills are `Keyword` chips (src/components/Keyword.tsx: soft vermilion fill, underline, tilt on hover, night colours). Max width 62ch.
- **2026-11-16:** `Keyword` chips can pop out tool icons: hovering (or focusing, or tapping) "visual design" springs out a little fan of Figma, Photoshop and Illustrator app icons above it. Icons are drawn in SVG/CSS in `TOOLS` (Keyword.tsx); add a tool there and pass `tools={[...]}`. UX, motion and AI-assisted development have no tools yet (waiting on Sanskriti's list).
- **2026-11-16:** Tool pop-outs added for **UX** (FigJam, a design cursor with name tag, a mini flow diagram) and **motion** (Jitter, Figma motion, Claude). Claude is the real mark (Simple Icons outline). **FigJam, Jitter and Figma motion are drawn stand-ins** (no official outline was available; Figma motion has no logo of its own): swap in real SVGs if Sanskriti provides them. AI-assisted development has no tools yet.
- **2026-11-16:** **AI-assisted development** pops out Claude, Cursor, GitHub, Xcode and VS Code (all real marks from Simple Icons, in their brand colours). All four keywords now have tool pop-outs.
- **2026-11-16:** Jitter icon now matches the real logo Sanskriti shared: white "Jttr" wordmark on violet `#7444F2` (system sans). FigJam and Figma motion are still stand-ins.
- **2026-11-16:** Xcode icon redrawn to match the app icon Sanskriti shared: blue gradient tile with a faint blueprint grid and a dark diagonal hammer (SVG).
- **2026-11-16:** Cursor icon redrawn to match the app icon Sanskriti shared: faceted grey hexagon cube (white top triangle, light arrow facet, gradient sides) on black.
- **2026-11-16:** Claude icon now matches the app icon Sanskriti shared: cream starburst `#FBF1EC` on terracotta `#D97757` (shown under both motion and AI-assisted development).
- **2026-11-16:** Tried a cherry blossom branch on the left edge (two pixel versions, then a smooth SVG). Sanskriti **removed it**; the component was deleted (last versions in git: pixel cde2c80, smooth 73bfef9).
- **2026-11-16:** **New nav:** Work · About · [S stamp] · Playground · 👁 visitor count, centred on a 3-column grid so the stamp sits exactly in the page centre. The "Sanskriti" wordmark and the India clock were removed from the nav (`Clock.tsx` is unused now). Visitor count: `src/components/VisitorCount.tsx` (lucide `Eye` + number, Indian digit grouping) calls `src/app/api/visits/route.ts`; each browser is counted once (POST on first visit, marked in localStorage; GET after). Storage: **Upstash Redis when `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` are set** (needed once deployed, since serverless can't keep a file), otherwise a local `.data/visits.json` (gitignored) for dev.
- **2026-11-16:** Nav stamp was blurry (Next resized it to 96px at q75, the browser shrank it again, and the tilt resampled it). Now uses `public/assets/stamp-s-nav.png`: a 144px copy made from the 996px master with Lanczos + light unsharp mask, shown at 36px and served `unoptimized`.
- **2026-11-16:** Tighter hero spacing: heading → description 16px (was 24), description → buttons 20px (was 32).
- **2026-11-16:** Hero mirrored into **Figma**: file `ltepqkFPU0HVYh7CChNZty` (Portfolio), page "creative direction", frame **"Home · Hero (1440)"** (node 1535:237, right of "Portfolio sitemapp") plus a **"Hero components"** frame (1535:224) with the `Keyword chip` component (Label text property) and the `Sakura button` component set (Tone = Lacquer/Paper, Label property). All editable layers: auto-layout nav (3 columns, stamp centred), speech bubble, text, chips, buttons. Artwork imported as vectors (mascot ramen pose merged to one path per colour; button sprigs, petals and waves straight from the site's SVG); the stamp is the 144px PNG. Figma has no Redaction or Courier New: it uses **Newsreader** for the serif and **Courier Prime** for the mono; the worn "a builder by curiosity." line is plain Newsreader there. The name shows in English only (the katakana swap lives in code).
- **2026-11-16:** Speech bubble moved to the **mascot's upper left** (desktop): two lines ("Hey, i'm" / name), rounded-3xl, px-6 py-2.5, 32px line spacing, tail at bottom-right pointing at her, overlapping her by 6px. On phones (< md) it sits centred above her with the tail at bottom-centre.
- **2026-11-16:** Button shadows updated from Sanskriti's Figma edits (Sakura button set 1535:236): Résumé's soft shadow is darker `rgba(124,32,15,.45)`, See work's is stronger `rgba(140,79,31,.54)`.
- **2026-11-16:** Speech bubble made smaller: 13px text (`text-sm`), 20px line spacing, px-4 py-2, rounded-2xl, smaller tail; about 104×58 (was ~150×90).
- **2026-11-16:** Removed the "Delhi NCR, India · Open to work · Trusted by 20+ startups" line under the hero buttons.
- **2026-11-17:** Hero heading changed to "product design is my craft. / engineering is my foundation." (lowercase like before, two lines on every screen, second line in Redaction 35).
- **2026-11-17:** Added a third heading line, "curiosity is my compass." It is now the Redaction 35 (worn) line; the first two lines are regular Redaction.
- **2026-11-17:** Heading no longer forced onto 3 lines: one running sentence ("product design is my craft. engineering is my foundation. curiosity is my compass."), a single line on desktop, wrapping (balanced) on phones; the last sentence stays in Redaction 35.
- **2026-11-17:** Heading is two lines: "product design is my craft." / "engineering is my foundation. curiosity is my compass." (the last sentence in Redaction 35).
- **2026-11-17:** Heading capitalised: "Product Design is my craft. / Engineering is my foundation. Curiosity is my compass." (no longer all lowercase).
- **2026-11-17:** Description: "AppX (YC'21)" is now bold and black (`text-black`, `text-head` at night, kept on one line), with an inline Y Combinator logo (Simple Icons path, #F26522) before "YC'21".
- **2026-11-17:** "AppX (YC'21)" no longer bold: regular weight, still black.
- **2026-11-17:** "AppX (YC'21)" made half-bold: Courier New has no medium weight, so it is regular weight with a 0.4px text stroke in the text colour.
- **2026-11-17:** Description now opens "I'm a product designer at AppX (YC'21)."
- **2026-11-17:** Description now opens "Currently a product designer at AppX (YC'21)."
- **2026-11-17:** **Work fan** under the hero (`src/components/WorkFan.tsx`): six work visuals (`public/assets/work/*.webp`: mosaic, context-window, figma-to-react, keploy, concertpal, espresso) as tilted rounded cards in a back row and a front row, spilling past the text column full-bleed, fading out at the bottom with a CSS mask. Laid out on a 1440×520 stage that scales down to fit narrower screens. Cards spring up from the middle outwards when scrolled into view and lift/straighten on hover (none of this with reduced motion). Hero bottom padding cut from pb-32 to pb-12.
- **2026-11-17:** **Dotted background** on every page: a 22px dot grid on `html` (`--dot` #dcd7cf by day, #34313d at night).
- **2026-11-17:** Work fan gets a **curved-glass edge** (after janehou.ca's carousel): the row bends like the inside of a cylinder (`perspective: 1400px`, outer cards `rotateY` up to ±24°), a **progressive blur** on the left and right ends (6 stacked `backdrop-filter` layers, 0.5→16px, each masked to a band nearer the edge; zone `clamp(90px, 15vw, 240px)`), and a faint prism sheen (soft-light rainbow gradient) on the outermost cards only.
- **2026-11-17:** Side curve, side blur and prism sheen removed (wrong place). Instead the work fan's **bottom fade is now a progressive blur**: 6 stacked `backdrop-filter` layers (0.5→16px) over the bottom half, each masked to a lower band, under the existing fade-out mask, so the cards blur more as they sink into the dotted background.
- **2026-11-17:** Work fan kept **inside the page column** (no longer full-bleed): re-laid on a tighter 1000×440 stage (cards 250–420px wide, more overlap) scaled to the column's width (~0.83 on desktop). At 1440 the cards span 316–1127px inside the 307–1133px column.
- **2026-11-17:** Lab page **`/lab/work`** (not linked) compares cleaner overlapping layouts for the work visuals against the current fan. All share `src/components/work/shared.tsx`: the `WORK` list, a `Frame` (white mat, hairline, soft shadow, one radius), `ProgressiveBlur` and `useFit`. **A · Hand of cards** (`WorkArc`): six same-size cards fanned evenly, symmetric tilt, gentle arc. **B · Cascade** (`WorkCascade`): six same-size cards in a straight staircase, no tilt. **C · Two layers** (`WorkLayers`): four cards in a straight back row, two larger in front over the gaps. Homepage still uses `WorkFan` until one is picked.
- **2026-11-17:** Picked **A · Hand of cards**: the homepage now uses `WorkArc` under the hero. The old `WorkFan` is deleted; `/lab/work` keeps A, B and C for reference.
- **2026-11-17:** Hand of cards: **hovering a card shows the whole image**. It lifts 30px, straightens, and its width springs to the image's own proportions at the same height (so nothing is cropped), widening around its centre but clamped inside the stage. Leaving it springs back.
- **2026-11-17:** Hand of cards: the full-image hover now applies **only to the last card** (Figma → React); the others just lift and half-straighten. **Bottom blur removed** (a plain fade-out mask remains). Gap from the buttons to the cards **halved** (~83px → ~43px; hero `pb-12` → `pb-2`).
- **2026-11-17:** **Paper sheet scroll** (`src/components/PaperStack.tsx`): the hero (nav + intro + hand of cards) is `sticky`, pinned where its bottom meets the bottom of the screen (top 0 when it fits), and the next section slides up over it as a sheet of paper: nearly full width (12px gutters), rounded 22px, hairline border, upward shadow, the same 22px dot grid, a small steel **paperclip** (16×46 SVG) at its top-left. While the sheet rises it straightens from −1.6° and the hero behind sinks to 95% scale and 55% opacity (none with reduced motion). The sheet has `id="work"` (See work scrolls to it), holds a "Selected case studies" heading (no content yet) and the footer.
- **2026-11-17:** Fixed the page dots sliding past the pinned hero while scrolling: the `html` dot grid is now `background-attachment: fixed`, so it stays still behind the hero; the paper sheet carries its own dots that move with it. (Needed a `.next/dev` wipe to show up in dev.)
- **2026-11-17:** Paper sheet **merges into the page at the top**: over the last 20% of its rise (scroll progress 0.8→1) its side gutters shrink 12px→0 (width `calc(100vw - 2×inset)`) and its corners 22px→0, so once it reaches the top it is full width. Plan for later sections: each arrives the same way, as an inset sheet sliding over the previous one, then widens to full width.
- **2026-11-17:** Lab page **`/lab/cases`** (not linked) with two case-study layouts, using the hero's work images as stand-in screens and dummy one-liners (`src/components/cases/data.ts`). **A · Contents page + bento** (`CasesContents`): primary projects as contents-page rows (kanji numeral 一二三, Redaction name, Courier one-liner, role/year label); hover dims the other rows, presses a small red hanko (作) beside the title and fans two screens out. Vibe-coded projects in a bento box (one big + two small compartments), each showing its project faded in black and white until hover brings it to colour; "Live ↗". **C · Stamp album** (`CasesStamps`): primary projects as large perforated postage stamps (CSS mask perforation) with a kanji "value" and a TOKYO postmark; vibe-coded as small stamps with a red "vibe coded" overprint; hover lifts and tilts. Needs real screens, one-liners, roles/years, results and live links.
- **2026-11-19:** **Sushi conveyor footer** prototype on lab page **`/lab/footer`** (not linked; the real footer still has the Fuji scene, which will move elsewhere later). From Sanskriti's reference: a red **noren** (3 panels, steaming bowl), "One last roll before you go?" (Redaction italic), "Thanks for stopping by…♡", then a **full-column-width conveyor belt** (back rail, dark surface with moving slats, red front rail with ◀◀ ▶▶) carrying six plates to the right forever: salmon nigiri, ikura gunkan, maki, tamago, ebi, tuna (4 plate styles: blue with white dots, pink, cream, red). One shared clock moves plates and slats together (34px/s); hovering the belt eases it to a stop, hovering a plate lifts and wiggles it; plates fade at both ends; then a ✿ divider and "Back to top ↑". All art is hand-written SVG in `src/components/sushi/art.ts`. Two looks from the same drawings (`SushiBelt look="smooth" | "pixel"`): smooth = vector; pixel = drawn at ~1/2.6 size on a canvas with hard alpha edges and scaled up with `image-rendering: pixelated` (clean, readable pixels).
- **2026-11-19:** Picked the **smooth** sushi belt: `Footer.tsx` now renders `<SushiBelt look="smooth" />` on the homepage (inside the paper sheet). Removed from the footer for now: the Fuji scene, the "Hire me, so I can fund my dream Japan trip" line, the footer link row, the sound toggle and the colophon line (`FujiScene.tsx` and `SoundToggle.tsx` are kept for later). "Back to top ↑" links to `#`. The pixel look stays available on `/lab/footer`.
- **2026-11-19:** Sushi footer scenery added (`src/components/sushi/Decor.tsx`, smooth SVG, desktop only): a **cherry branch** in each top corner (330px wide, sakura-button petal shape, buds, a slow sway), a **paper chōchin lantern** (64px, cream with ribs and a sakura, red tassel) hanging from each branch and swinging gently, a **shoji window** down each side standing on the belt, and small red **"tasty!" ticks** pulsing over every third plate. The right side is a mirror of the left (`-scale-x-100` wrapper).
- **2026-11-19:** Sushi footer: the **shoji windows sit behind the belt** (moved down to top 214px, so the back rail and belt cover their bottom ~34px), and the **cherry branches + lanterns moved 22px outward** past each side of the column (windows stay at the column edges).
- **2026-11-19:** Sushi footer improvements:
  - **Belt reads as a loop:** redrawn so every layer (red rail, dark rim, running surface) is a full pill with the same end radius, so the rails curve round both ends; the ◀◀ ▶▶ arrows are gone. The straight run has moving slats, and each round end is a half-disc of slats that **turns with the belt** (rotation = distance ÷ radius) with a small hub.
  - **Menu:** salmon nigiri, tamago, maki, ikura gunkan, ebi nigiri, **inari** (tuna removed), each on a **different plate**: indigo with white dots, vermilion, stoneware cream, sakura pink, black lacquer with gold dots, matcha green with a white ring.
  - **Cherry branches** now sit 40px lower and are **clipped at the column edges** (the 22px outward shift stays, hidden past the edge).
- **2026-11-19:** Footer is **smooth only**: the pixel look is removed from `SushiBelt` (no `look` prop, no canvas rasteriser) and the `/lab/footer` page is deleted.
- **2026-11-19:** Dot grid (page and paper sheet): dots **bigger** (radius 1px → 1.6px, edge 1.9px) at **60% opacity** (`color-mix(in srgb, var(--dot) 60%, transparent)`), same 22px spacing.
- **2026-11-19:** Dot grid opacity lowered to **40%** (page and paper sheet).
- **2026-11-19:** Footer: removed the ✿ divider line and the "Back to top ↑" link under the belt; the footer now ends with the belt.
- **2026-11-19:** Undid the from-above belt with plates turning the corners (b3d75d0): back to the front-view pill loop with turning half-disc ends.
- **2026-11-19:** Sushi belt **extends 64px past both sides** of the column and is **clipped at the column edges** (belt container `overflow-hidden`), so its rounded ends are hidden and it looks like it keeps running beyond the page.
- **2026-11-19:** Sushi belt: removed the see-through fade on plates near the edges; plates stay solid and simply slide out of sight at the clipped column edges.
- **2026-11-19:** Sushi redrawn with more detail (`art.ts`): soft gradients on fish, egg, prawn and tofu; scattered **rice grains** clipped inside each rice bed; blurred glossy highlights; **nori** with a gradient sheen and fibre lines; **ikura** as glossy translucent pearls with specular dots and a cucumber garnish; **tamago** with layer lines and browned spots; **maki** with three fillings (salmon, cucumber, tamago) and grain texture; **inari** with pores, wrinkles, rice and sesame on top; soft contact shadows; plates with a gradient rim, a glazed well and a highlight arc. Each drawing renders at 3× its shown size for sharpness.
- **2026-11-19:** Footer cherry branches redrawn **watercolour-style and more graceful** (after Sanskriti's three watercolour references): a single tapering, slightly knobbly limb (built along a curve, bark gradient, highlight and bark marks) with thin twigs; open five-petal flowers with notched petals, a soft pink-to-white wash, a deep pink eye and ~11 stamens with yellow tips; several flowers tilted or **hanging on thin stalks**; buds with red-brown calyxes; a few young leaves. A watercolour SVG filter (turbulence displacement + slight blur) softens every edge. **Falling petals** (`FallingPetals`, 14 petals, desktop only, off with reduced motion): they drop from both branches, flutter (turning over in 3D), sway, drift with a light breeze and fade out before the counter, each on its own timing.
- **2026-11-19:** Footer branches made **less stiff**: the limb now follows hand-placed waypoints through a Catmull-Rom spline (a wavy, slightly knobbly taper that **droops towards its tip** under its own weight), with five tapered **twigs** (one behind at the corner, two rising, two drooping under their flowers). Flowers, buds and leaves sit on the twigs, and **each twig sways from its joint on its own** (SVG `animateTransform`, 4.4–6.2 s, 2.4–4.6°), while the whole branch still breathes slightly. Lantern tie point unchanged.
- **2026-11-19:** Footer cherry branches (and their lanterns) pulled a further **20px outward** on both sides (now 42px past the column edge, still clipped there), so they take up less room.
- **2026-11-19:** **Chopsticks pick-up on the sushi belt:** each menu item is now two layers (`plateSvg`, `sushiSvg`). Clicking a sushi (a real `<button>`, "Pick up the …") brings a pair of wooden chopsticks (tapered, darker tips) down from the upper right; the front stick closes in to pinch, then chopsticks and sushi lift up out of frame and fade (1.7 s). The plate rides on empty. The belt counts its wraps so every plate keeps an identity (`id = slot − 6 × wraps`): an eaten plate stays empty until it rides off the right edge, and plates coming in from the left are always full ("refilled"). The belt and plate layers now clip only at the sides (`clip-path: inset(-400px 0 0 0)`) so the chopsticks can reach in from above. Reduced motion: the sushi simply disappears.
- **2026-11-19:** Chopsticks now come in **from the side** nearer the clicked plate (left half → from the left, right half → from the right), lying low at a shallow angle; the upper stick closes down to pinch, they lift the sushi a little and **carry it back out the same side**, vanishing at the column edge (2 s). The drawing is mirrored for the left side.
- **2026-11-19:** Footer cherry branches and lanterns pulled another **20px outward** (now 62px past each column edge, clipped there).
- **2026-11-19:** Footer cherry branches and lanterns moved **30px lower** (branch top 70px); the lanterns now just overlap the top of the shoji windows, hanging in front of them.
- **2026-11-19:** Footer text removed ("One last roll before you go?" and "Thanks for stopping by…"). The **noren** is now **80px lower** (`mt-20`) and the **cherry branches + lanterns 50px lower** (branch top 120px). With the text gone the belt sits higher, so the scene is more compact and the lanterns hang in front of the shoji windows.
- **2026-11-19:** Footer: **shoji windows lowered 100px** (top 314px) so the lanterns clear them, with the **belt moved down** the same amount so the windows still stand on it at full height; the **noren another 30px lower** (`mt-[110px]`, belt gap `mt-[72px]`).
- **2026-11-19:** Footer: **noren and cherry branches + lanterns another 50px lower** (noren `mt-[160px]`, branch top 170px); shoji windows lowered 50px too (top 364px) so the lanterns still clear them, with the belt following; falling petals now start at the branches' new height (petal layer 560px tall).
- **2026-11-19:** Footer: the belt now sits **right under the noren and branches** (belt gap back to `mt-2`, so it rose 64px) and the shoji windows came up with it (top 300px); the lanterns hang in front of the windows, which Sanskriti is fine with.
- **2026-11-19:** Footer cherry branches and lanterns another **20px outward** (82px past each column edge, clipped).
- **2026-11-19:** Footer: noren **20px lower** (`mt-[180px]`), belt held in place (`-mt-3`), so the noren sits closer to the sushi.
- **2026-11-19:** Footer **lanterns redrawn in 3D and lit**: a rounded barrel of warm paper (shaded orange at the sides, bright in the middle, a light from inside), curved bamboo ribs that follow the barrel, a soft shine down one side, a soft warm glow around it, wooden caps as little cylinders with a lit lower rim, a brighter gradient sakura with a gold centre, and a red tassel with a knot and fringe. The **whole footer scene is brighter**: a `saturate(1.15) brightness(1.05)` filter on the footer.
- **2026-11-19:** Footer: **lantern shading toned down** (paper edges pale peach instead of orange, lighter ribs and outline, softer glow). **Fuller cherry branches:** ~17 more flowers and ~8 more buds across the limb and every twig (about 40 blossoms per branch now). **Twice the falling petals** (28, starting about every half second).
- **2026-11-19:** **Pixel lucky cat** (`src/components/LuckyCat.tsx`) beside the "Selected case studies" heading: a maneki-neko on a 24×26 grid (2.5px pixels, crisp edges) built from simple shapes whose edge cells become a dark outline: white fur with orange spots, pink inner ears, happy closed eyes, pink nose and cheeks, a red collar with a gold bell, a resting paw holding a gold koban. Its raised paw **waves in two sprite frames** (wave, wave, pause; 260ms beats). Still for reduced motion.
- **2026-11-19:** Lucky cat **refined**: a finer 35×42 grid (1.9px pixels, ~67×80px), a soft warm-brown outline instead of near-black, every shape shaded (highlight upper-left, shadow lower-right), whiskers, a bigger nose and mouth, a shaded gold bell and koban with a highlight, and a **red zabuton cushion** with gold tassels. The paw waves through **three frames** (up, halfway, bent; 130ms beats, twice, then a rest). It is now **pinned beside the heading** (absolute, `left-full`) so it no longer pushes the heading away from the "Work" label (gap back to 16px).
- **2026-11-19:** **Primary case studies copy** on the work sheet (`src/components/CaseStudies.tsx`, Sanskriti's copy): label "Primary case studies", heading "From problems to shipped products." (with the lucky cat), intro "A collection of products I've helped shape…", "Selected work, 2025 — 2026" under it, then three rows: **AppX (YC'21)** (Product Design · 2026), **Bounce Daily** (renamed from DreamLaunch × Bounce; Product Design · 2025), **eight.money** (Product Design · 0 to 1), each with its line. Rows are separated by hairlines; hovering one fades the others to 40% and slides in a ↗. Text only for now (no screens yet); links are `#` until the case-study pages exist.
- **2026-11-19:** Primary case studies are now **three cards side by side** (after Sanskriti's reference): warm near-black cards (#211d1b, 20px radius) with the project **banner from her Framer site** (`public/assets/cases/{appx,bounce-daily,eight-money}.webp`, 1200px wide, from the "New folio 2026" Framer project's home cards via `framerusercontent.com/assets/<id>.jpg`), the name in Redaction with a salmon ↗, the one-liner, and the tags as outlined rounded chips (Product Design · 2026 / 2025 / 0 → 1). Hover lifts the card and zooms the banner slightly. Links are still `#`; the Framer case pages are /work/appx, /work/bouncedaily-redesign, /work/eightmoney.
- **2026-11-19:** Case study cards are now **white**: page background colour with a hairline border and a soft warm shadow (deeper on hover), heading colour for the name, the printed Courier style for the line, a vermilion ↗, and chips with a hairline border on a faint surface tint. They follow the day/night theme.
- **2026-11-19:** Case study layout: **AppX is a full-width lead card** (banner on the left at 58% width, name, line and chips on the right), with **Bounce Daily and eight.money side by side** in a second row (2-column grid; stacks on phones).
- **2026-11-19:** Removed the "Selected work, 2025 — 2026" label from the case studies intro.
- **2026-11-19:** Case studies intro line ("A collection of products…") now spans the **full column width** (no 58ch cap).
- **2026-11-19:** **Vibe-coded projects section** (`src/components/VibeProjects.tsx`, after Sanskriti's reference) under the primary case studies: a tilted cream `</>` tag and a pink "Vibe-coded projects" label, the italic heading **"Small ideas, big curiosities"** (with the red ticks), the line "Playful experiments, creative interactions and ideas I brought to life with code + AI.", then **three wide white cards** stacked (the reference's three-across row doesn't fit the 826px column): thumbnail left (240px, 4:3), name + ↗, line, soft pink chips. **Spider-Verse Interaction** (Creative Coding, AI → spider-verse-cards.netlify.app), **UX Laws: Learn Design Psychology** (Learning Experience, AI; no live link yet), **Little Lights** (Creative Experiment, Diwali → diwali-album.vercel.app; typo "thie accasion" fixed). Thumbnails: the first two from her Framer "Process" cards, Little Lights a capture of the live site (`public/assets/cases/`). The case studies section lost its `min-h-[70vh]`.
- **2026-11-19:** **Stacked paper sheets:** `PaperStack` now takes `sheets: { id, content }[]` and renders each as its own clipped `Sheet`. Every sheet except the last **pins** once its bottom meets the bottom of the screen (sticky, top = innerHeight − height), so the next one slides up over it; each straightens from a slight tilt and widens to full width with square corners as it reaches the top. Alternate sheets tilt the other way and carry their paperclip on the right. Sheets: `#work` (primary case studies) and `#vibe` (vibe-coded projects + footer). Gotcha: on a sticky element `left` is a pin threshold, not an offset, so sheets centre with `ml-[50%] -translate-x-1/2` instead of `left-1/2`.
- **2026-11-19:** **Pixel tamagotchi** (`src/components/Tamagotchi.tsx`) beside "Small ideas, big curiosities": a pink egg-shaped shell on a gold keyring, cream bezel, three coloured buttons and a green LCD with a little ink cat (34×42 grid, 1.9px pixels, same outline/highlight/shadow painter as the lucky cat). Idle loop: sits, blinks now and then, hops. It's a button: **clicking feeds it** (happy squint eyes, hops, a red heart). Reduced motion: still, a brief happy face on click.
- **2026-11-19:** **Sheets sink behind the next one:** while a sheet rises, the pinned sheet under it scales to 95% and a **white veil** fades over it (0 → 50%), like the hero's fade but without making the sheet see-through (fading its opacity showed the hero behind it).
- **2026-11-19:** AppX case study card title shows the **Y Combinator logo** before "YC'21" (same orange mark as the hero, sized to the serif title).
- **2026-11-19:** Sushi footer is now **full screen width** (edge to edge, `ml-[50%] w-screen -translate-x-1/2`, `overflow-x-clip` so the plate track can't widen the page): the belt, branches, lanterns, shoji windows and petals sit at the screen edges instead of the column margins. The belt carries enough menu copies to cover any screen width (`ceil(width / menu length) + 2`, 24 plates at 1440).
- **2026-11-19:** **Footer performance pass** (was ~29 fps with long frames; now a steady 60 fps, 0 long frames at 1440 in the preview):
  - Removed the footer-wide `saturate/brightness` filter (it re-filtered the whole animated scene every frame).
  - Removed the watercolour turbulence filter from the branches (it re-ran every frame because the twigs sway).
  - Each flower's 11 stamens + anthers are now 2 paths instead of 22 elements (branches ~2,600 → 832 nodes).
  - Branch, lantern and plate-track layers get `will-change: transform`.
  - Sushi data-URLs are encoded once and cached (they were re-encoded on every belt re-render); images decode async.
  - The belt's animation loop and the falling petals **pause while the footer is off screen** (`useInView`, 200px margin).
- **2026-11-19:** Footer cherry branches **bigger** (440px wide, was 330) and **no outward offset** (they start at the screen edge, top 150px); lanterns 68px, still hanging from the branch.
- **2026-11-19:** Footer: cherry branches **smaller** (380px wide, was 440; lanterns follow) and shoji windows **bigger** (84px wide, was 66; top 252px so they still stand on the belt).
- **2026-11-19:** Removed the little red "tasty!" tick marks everywhere: over the sushi plates and beside the "Small ideas, big curiosities" heading (`Ticks` stays in `Decor.tsx`, unused).
- **2026-11-19:** Lab page **`/lab/case-study`** (not linked) with three layouts for the internal case study pages, filled with the **real Bounce Daily case study** (copy and 6 screens from her Framer page /work/bouncedaily-redesign; content in `src/components/casestudy/content.ts`, images in `public/assets/cases/bounce/`). Tabs switch between:
  - **A · Margin notes** (`LayoutMargin`, after Kari): sticky contents with an active dot, a red reading-progress line, meta chips, a Redaction 35 pull quote, fact cards, the 7-stage lifecycle grid, a Before/After switch on the screens, principles as taped yellow notes.
  - **B · Chapters** (`LayoutChapters`): centred and quiet, a hanko seal, meta in a ruled row, big pale kanji numerals 一 二 三 opening each chapter, the lifecycle as an ink line with 7 red dots, the three questions as cards with kanji, a drag/hover compare slider, a hanko on the key line.
  - **C · Clipped sheets** (`LayoutSheets`): a perforated "admit one" ticket for the meta, each chapter on its own paperclipped dotted sheet with a slight tilt, clickable pastel index-card tabs for the 7 stages, the three questions as red round stamps, before/after as taped polaroids with handwritten-style captions.
- **2026-11-19:** Case study design direction: **Margin notes (A) as the design language**, plus two pieces from C, now shared in `src/components/casestudy/pieces.tsx`: the **perforated `Ticket`** (kicker + one-line intro left; role/duration/scope right; dashed tear line with half-moon notches pinned to it) replaces A's intro + meta chips, and the **pastel `StageTabs`** (index-card tabs, open card shows the stage's question; proper tab roles) replace A's lifecycle grid. Shown on `/lab/case-study` tab A.
- **2026-11-19:** **First real case study page: `/work/bounce-daily`** (`src/app/work/bounce-daily/page.tsx`), the full Bounce Daily case study from her Framer page (all copy, 22 screens + the scooter illustration in `public/assets/cases/bounce/`, webp at 1600px). Built in the "margin notes" language from reusable parts in `src/components/casestudy/Margin.tsx` (`CaseStudyFrame` with a sticky 15-item contents list + fixed red reading line, `Section`, `P`, `Quote`, `Shot`, `BeforeAfter` switch, taped `Note`, `Flow` state chips) and `pieces.tsx` (`Ticket`, `StageTabs`). Sections: header (ticket, hero, 4 fact cards), overview, inherited, lifecycle (before/after + tabs + principle note), 01–04 chapters, designing for states (KYC / plan / kilometre flows), scooter switching, loyalty, making it real (60+ components), visual language, what changed (before→after table), outcome cards, what I learned (01–03) + closing thought, back link, footer. Page width 1080px (nav stays in the 826px column). The homepage Bounce Daily card now links here.
- **2026-11-19:** **`/work/eight-money`** case study page (`src/app/work/eight-money/page.tsx`) in the same margin-notes language: header (subtitle, ticket "Fintech app, 0 → 1", hero, 4 fact cards), overview with two intro shots, then the product flows from her Framer page (onboarding, home ×3, total balance, open wallet, transaction history, dashboard analytics, bill payments, KYC, change PIN), web design, pitch decks (confidential), closing thought; 17 screens in `public/assets/cases/eight/` (webp, 1600px max). The homepage eight.money card links here. **Left out on purpose:** the Framer page's "10. Making it real / 60+ reusable components" block, which duplicates Bounce Daily's text and image (looks like a leftover). **AppX:** the Framer /work/appx page is only "Coming Soon", so no AppX case study page yet; its card stays unlinked.
- **2026-11-19:** No space below the footer: removed its bottom padding, and the falling-petals layer now fills the footer exactly (`inset-0`; it was a fixed 560px that hung 54px below the belt and stretched the page). The page ends at the belt.
- **2026-11-19:** **New Spider-Verse case study page `/work/spider-verse`** (Sanskriti didn't like the Framer one; copy and assets reused from it: 7 ChatGPT card templates + 3 app screens in `public/assets/cases/spider/`). Redesigned to feel like opening a pack (`src/app/work/spider-verse/page.tsx`, parts in `src/components/spider/Holo.tsx`):
  - **Dark cinematic stage** (ink #0e0a0f, faint red web lines): live-site pill, "What if the Spider-Verse chose you?", Figma/ChatGPT/Cursor chips, red "Reveal my spider ↗" CTA + "Watch the video on X ↗", role/type/platform/cards row, three phones with the **reveal screen tilting toward the cursor with a holographic sheen** (`HoloTilt`, 12°, spring 150/18, like the real app).
  - **The spark**: four comic-strip panels (open / wait / reveal / happiness).
  - **Asking AI**: a chat with her real prompt; ChatGPT's "reply" is the seven templates; "The catch" (copyright) on a taped note.
  - **Templates**: the seven fanned like a hand of cards, each tilting + shining on hover (`TemplateFan`), plus the four Figma steps.
  - **Vibecoding in Cursor**: a dark editor window (file tree, the HolographicCard tilt code, her chat with the AI), stat cards 5.8s / 3 lanes / 12°, built-with chips.
  - **The finished flow**: six beats on a dashed red timeline with timing chips, beside the three phones.
  - **P.S. You liked it**: 1.2K+ likes / 40K+ views / 180+ reposts / 120+ replies, her X post as a card (links to the video), "small experiment, big love ♡", CTA to the live app.
  - The vibe-coded card on the homepage now opens this page (internal links no longer open a new tab).
- **2026-11-19:** **New UX Laws case study page `/work/ux-laws`** for UXie, her SwiftUI iOS app (106 laws, 8 categories). Built from her own screen recordings, her "UX laws iOS app" Figma file and the app's data (`laws.json`). Same margin-notes language (`src/app/work/ux-laws/page.tsx`), new parts in `src/components/uxie/Uxie.tsx`.
  - **Assets** in `public/assets/cases/uxie/`:
    - 7 recordings, compressed to 480×854 mp4 with jpg posters: explore, recall, read, play, saved, search, and the 1200×900 showreel.
    - 15 Figma screens as `fig-*.webp`.
    - The full law page `fig-lawpage-full.webp`.
    - The flow board.
    - Her redrawn category card sheets, plus the logo, larger-text, dark-mode and quiz-feedback previews.
    - **Never** the early Figma reference cards (they copy Growth.Design's cheat sheet).
  - **Storyline (14 sections):**
    - Why I made it: kept forgetting the laws; brief on a taped note.
    - Sorting 106 laws: 8 category cards with taglines + law counts as bars; laws can sit in several categories.
    - **Flow chart 1, core loop:** Explore → Browse → Recall → Learn → Play, with a dashed red return arc ("missed one? back to that law").
    - **Flow chart 2, app map:** Home → Category / Play / Saved / Search, all ending on the law page.
    - Decisions 01–07, each a looping clip beside the copy plus Figma screens:
      - deck, not a list
      - every law illustrated
      - recall first ("Think you remember?")
      - one law page, with an anatomy list beside the scrollable full page
      - read it or hear it
      - Play (5 states + feedback image)
      - saved & search
    - From the Figma file: the flow board.
    - The small things: larger text, dark mode in progress.
    - What's next.
  - **Clips** play only while on screen and pause for reduced motion; the showreel autoplays in the header.
  - **The vibe-coded "UX Laws" card** now links here.
  - **Copy:** the "why" story and the closing quote are a draft for her to edit; all features and numbers come from the app.
- **2026-11-19:** **Spider-Verse case study rebuilt from scratch** (`/work/spider-verse`). The dark "cinematic stage" version above was replaced, and the page now uses the same margin-notes language as the other case studies (`CaseStudyFrame`, `Ticket`, `Note`, `Quote`). New parts are in `src/components/spider/Spider.tsx`; `Holo.tsx` now only keeps `HoloTilt`, and the old `Phone`/`TemplateFan` were removed.
  - **Sources:**
    - Story copy: her Framer case study.
    - **Card data, accents, quotes and motion constants:** read from the live site's JS bundle.
    - **Stills:** captured from the live site at phone size: `live-landing`, `live-stack`, `live-orbit`, `live-orbit-tint`, `live-reveal-miles`, `live-reveal-punk`.
    - **Finished cards:** `card-*.webp`, downloaded from the live site.
    - The `t-*` empty ChatGPT templates are kept. The old Framer `s-*` screens were deleted.
  - **Sections:**
    - Header: ticket, three live phones on a dark strip, CTA + X link.
    - The spark.
    - **Flow chart 1 — feeling curve:** an animated SVG; Open, Wait, Reveal and Joy map to app moments. Plus a taped note: "the wait is the product".
    - **Flow chart 2 — process:** feeling, ChatGPT, Figma, Cursor, Capacitor, X.
    - Words first: her prompt as a chat, the templates as the reply, and "The catch" note.
    - **Template → finished card:** a toggle flips all 7 cards.
    - **The cast:** pick any of the 7. Shows a tilting holo card, number/Earth, quote and the two accents, and the panel tints in the card's colours like the app.
    - **Flow chart 3 — reveal timeline:** proportional bar of the real phases (hold 280ms, wake 620, prepare 900, orbit 5800, reveal) + 5 live stills.
    - **Tuning the shuffle:** a live orbit diagram drawn from the code's numbers (ellipse 224×29, depth 78, lanes +42/0/−38, breathes ±13% at 0.52Hz; pauses off screen), plus 5.8s / 3 lanes / 0.94 coast-decay cards.
    - Your card, your colours: Miles vs Punk reveals.
    - You liked it: X stats + post.
    - What I learned: 3 lessons (draft copy) + CTA.
- **2026-11-19:** **UX Laws page now uses Sanskriti's own copy** (she rewrote the whole case study text).
  - **Ticket:** "Personal project · Design + build"; role "Product Design & Development".
  - **Sections:** renamed to The starting point / Organising 106 laws; categories are now numbered 01–08.
  - **Loop and map:** the loop steps use her descriptions, and the app map branches are now Explore / Play / Saved / Search.
  - **New `LawBehind` card** (`src/components/uxie/Uxie.tsx`): white card with a red left rule, label + law name + line. It shows "The law behind it" for each decision:
    - Chunking, Hick's Law, Visual Anchors, Testing Effect ×2, Consistency, Recognition over Recall.
    - Read-aloud uses "The design thinking · Multiple ways to consume information" instead.
  - **Removed:** the state-chip `Flow`s and the "Practising what it preaches" note, which were my copy and not in hers.
  - Closing quote: "The best way to learn UX laws is to start designing with them."
- **2026-11-20:** Started the **Bounce Daily case study rewrite**. Working notes (facts, countable numbers, decisions, open questions) live in `docs/bounce-daily-case-study-notes.md`; the page `/work/bounce-daily` will be rebuilt from them. First decision captured: the separate scooter-type step (Aum's call over Sanskriti's fewer-taps idea; "fewer clicks doesn't always mean better understanding").
- **2026-11-20:** Bounce Daily case study: lead decisions set (scooter step, map-first hubs, KYC status on home, no dead ends, dues/renewals up front). Started a **"Case study — assets" page in her Bounce Figma file** (eJ4fYjVQ…, page 1115:7577) with documentation boards built from her own styles and cloned screens; boards D01–D09 (5 decisions + onboarding, plans, pay, home), V01 visual language; bottom sheets on that page cleaned up (full width, 20px side margins). Details in `docs/bounce-daily-case-study-notes.md`.
- **2026-11-20:** Bounce assets page: calmer colour + button system applied to all non-onboarding screen copies (red UI elements 13.2 → 3.3 per screen), and a **DS · Colour and components** board (red budget, colour roles, button and status components, bottom-sheet anatomy, Zomato learning). Story details added to the notes: first UI designer on the app, pre-AI-boom, red concern raised with the PM.
- **2026-11-20:** Bounce assets page **reverted**: every screen on the decision boards is a fresh copy of her original design again (colour pass, restyle, floating nav and sheet cleanup removed). The DS board, the new components and the two preview frames stay on the page, unused, for reference.
- **2026-11-21:** Bounce Figma: new Page 1 section **"Case study screens (editable)"** with full-size copies of every screen used on the assets-page boards (37 frames, grouped by board). Refinements will happen there, frame by frame.
- **2026-11-23:** Bounce Daily case study **v3 draft** in `docs/bounce-daily-case-study-v3.md`: senior review of web v2 (Figma 1287:2) and a restructured page (goal + constraints up front, one principle, the journey reorder, five decisions with the same anatomy: problem → considered → chose → why → trade-off, then states, UI layer, outcome, reflection), with open items to confirm.
- **2026-11-23:** Bounce case study **v3 built in Figma** ("Case study · web page" page, frame 1305:9945, right of v2): v2's shell and visuals kept; content rewritten to the v3 draft. Sections: Context, The problem, Goals and constraints (new), Approach (with the principle Venn), The structural change (journey + onboarding showcase), Key decisions (5, each with a Problem / Considered / Chose / Why / Trade-off block; pay folded into the KYC decision), Designing for every state, The UI layer, Outcome and reflection. Contents list has 9 entries. No "Aum" anywhere; "the product manager" only.
- **2026-11-23:** Bounce case study **v4 (story)** in Figma ("Case study · web page", frame 1312:9945, right of v3; v2 and v3 untouched). Modelled on Priya Bhatt's AccioJob case study (her reference): told as a story in plain headed sections, each with one highlighted sentence, prose in her voice, principles explained inside sentences, and one focused visual per idea on a quiet canvas (real screens and component crops from her refined Page 1 frames). Sections: Overview, Problem, How I worked, The goal, The big move, The journey (6 stories: onboarding, hubs, scooter, plans, KYC + pay, home), When things go wrong, The UI layer, Impact and learnings. No labelled decision boxes, tables or chips; product manager unnamed. A smaller "v3 · story demo (Priya-style)" frame also sits on that page.
- **2026-11-23:** v4 case study filled out from the context page (KYC status stepper, renewals and dues, toggle colour reasoning, 7 → 2 and 7 → 3 numbers, switch-scooter rules, hub card reuse, progress tracker, explorations, three KYC rounds, design system counts, loyalty tiers), plus "Making it real" (her dev handoff, with the flow map), Impact with the product manager's post-launch feedback, Android-first rationale, #F8F8F8 canvases, warm soft shadows and 3D Before/After pills. All revamped Bounce screens switched to an Android status bar; iOS home-indicator lines removed.
- **2026-11-23:** **Scroll highlights** for case study text (her idea): `src/components/casestudy/Mark.tsx` wraps a key phrase; while the phrase is in the reading band of the screen (IntersectionObserver, rootMargin -28%/-32%) a soft peach marker stroke draws in (the tape colour #f4c7bd; terracotta at low opacity in dark mode), and it fades again once the phrase scrolls out, up or down, so only what's being read is marked. Several marks in one paragraph stagger via `order` (140ms each). Reduced motion: no animation. Styles at the end of `globals.css` (`.mark`). Demo with the v4 Overview, Problem and How I worked copy at `/lab/highlight` (not linked).
- **2026-11-23:** Scroll highlights made **playful** (her ask: "some scribbles"): `Mark` now draws hand-drawn rough-notation marks (`rough-notation@0.5.1`) instead of a flat marker. Types by meaning: `circle` for numbers, `highlight` (scribbled peach fill, multiply) for the lines that hurt, `underline` for facts, `box` and `bracket` available. Same behaviour: draws in while the phrase is in the reading band, fades out (380ms) and is removed once it leaves, re-drawn next time; staggered by `order` (170ms). Ink colours `--scribble` (#c8553b) and `--scribble-fill` (#f6cdbf) with night-mode values in `globals.css`. Reduced motion: no draw animation. Demo still at `/lab/highlight`.
- **2026-11-23:** **Tactile (skeuomorphic) demos** for the Bounce case study at `/lab/skeu` (not linked), real content: (1) old-app screens as faded, taped, tilted polaroids vs the redesigned plan screen in a soft-shadowed phone; (2) two paper receipts with zig-zag edges, a long crumpled one for the old journey ("Screens before a hub 18, Scooters seen 0, Prices seen 0") and a short neat one for the new ("8, Documents asked 0"); (3) a principle as a taped yellow sticky note beside the paragraph; (4) new `Mark` types `swoosh` (one relaxed pen stroke with a flick, drawn per line) and `spark` (tiny four-point doodle that pops in after a phrase), drawn into an SVG on the paragraph; (5) skeu pills (Before/After/tags/Google Play badge) using the existing `.skeu*` classes. Screens exported from Figma to `public/assets/lab/skeu/`. Receipt counts are demo copy built from the case study's 18-screen figure; check before publishing.
- **2026-11-23:** From the tactile demos she picked **#4 swoosh + spark scribbles** and **#5 soft tactile pills** for the Bounce case study; polaroids, receipts and sticky notes are out. `/lab/highlight` now uses `swoosh` for facts (instead of the straight underline) plus one `spark` on "the app's first UI designer"; circles stay for numbers and highlights for the lines that hurt.
- **2026-11-23:** **Bounce Daily case study page rebuilt as the v4 story** (`/work/bounce-daily`). Copy is the v4 Figma story word for word (frame 1312:9945): Overview, The problem, How I worked, The goal (incl. Android-first), The big move, The journey (6 numbered steps: onboarding, hubs, scooter, plans, KYC + pay, after paying), When things go wrong, The UI layer, Making it real (her dev handoff + flow map), Impact and learnings (PM quote credited "Product Manager, Bounce Daily", 4.8★, 1L+ downloads, closing thought). Contents list has 10 entries.
  - **New parts** in `src/components/casestudy/bounceStory.tsx`: `Canvas` (#F8F8F8 stage), `Device` (phone with warm soft shadow; old screens slightly faded; tall home screens cropped to phone height), `Row`, `BeforeAfter` (skeu Before/After pills), `Pill`, `Chapter` (section name + serif takeaway), `Step`, `JourneyFlip` (old vs new order, value vs effort pills), `KycSpots` (5 places KYC could sit, chosen one in skeu-red), `Testimonial`, `Wide` (flow map, opens full size).
  - **Scribbles** via `Mark`: swoosh for facts, circle for numbers, highlight for the lines that hurt, two sparks ("the app's first UI designer", "fewer taps doesn't always mean better understanding").
  - **Screens:** 26 revamped screens exported from her Page 1 frames (Android status bars) to `public/assets/cases/bounce/v4/` (webp), plus the illustration set, loyalty screen and new-app flow map; old screens still from `v2/old`.
  - Mobile: rows of phones scroll sideways inside their canvas; page stays at screen width (min-w-0 on canvases and sections).
- **2026-11-23:** **Bounce page re-matched to her Figma v4 frame one to one** (she pointed out the site and Figma differed). The first build kept the old site header and added my own content; now the page mirrors frame 1312:9945 exactly: subtitle "From a document wall to a rider journey.", her hero scene, the tl;dr cards (The problem / What I did / Who it's for / The result), "Worked with: Product manager", 9 contents entries, serif section name + italic lead line on a red rule, mono body (site default, Hanken override removed), "1. Onboarding"-style step labels with serif titles, and her composed figures exported 2× to `public/assets/cases/bounce/v4/fig/` (15 images, captions as HTML except the KYC figure, whose caption is part of the image). Removed my additions: stats row, Android/First UI designer pills, "via DreamLaunch", invented headings, captions and question pills; restored the dropped KYC examples sentence. Scroll scribbles stay (her pick). Rule: change Figma first, then mirror it on the page.
- **2026-11-23:** Bounce header, her asks: **"Worked with" now reads "Aum Vats (PM @ [Bounce Daily logo])"** (logo SVG exported from her Figma intro screen to `public/assets/cases/bounce/bounce-daily-logo.svg`; `MetaBar` `partners` now takes a ReactNode), and the **tl;dr cards use the soft `.skeu` finish**. Both mirrored in Figma v4 (text 1312:10123 + logo clone, cards 1312:10131/10136/10141/10146 with the same gradient, inner highlight and shadows). The body text still says "the product manager"; only the header names him, at her request.
- **2026-11-23:** Bounce page, her asks: (1) **every header in Redaction**: the small labels (Case study · 2025, Role/Duration/Worked with, tl;dr labels, step labels, Closing thought, testimonial credit) and the Contents list, in normal case (page-scoped classes on the wrapper and `contentClassName`; other case studies unchanged); mirrored in Figma v4 (Newsreader). (2) **Highlighter fills removed** (all 15 `highlight` marks); swooshes, circles, box and spark stay. (3) **No shadows under mockups**: drop shadows removed from the phone frames in her Figma figures (pills keep theirs) and the 11 phone figures re-exported. The hero is a single flattened image in Figma, so its phones are unchanged.
- **2026-11-23:** Bounce page, her asks: **all scroll scribbles removed** (no `Mark` on the page; text is plain). **Phones no longer cut off**: in Figma v4 every "Shot" frame was grown to its full screen height (canvases hug, so they grew too), and the 11 phone figures re-exported. Figures moved to `public/assets/cases/bounce/v4/figures/` so old cached (shadowed/cropped) images can't be served.
- **2026-11-23:** Built **Bounce case study v5 in Figma** (frame 1337:10605, a copy of v4 rebuilt in the Qmentis structure with every decision from the context page); she loves it. Outline: `docs/bounce-daily-case-study-v5.md`. The site still shows v4 until she says to mirror v5.
- **2026-11-23:** **Bounce page now mirrors v5** (Figma frame 1337:10605, Qmentis structure), at her go-ahead. Header: tags, title, subtitle, Play button, facts grid (Company · Team with Aum + logo · Timeline · Platform), hero. Sections: Context (39 / 11 big numbers) · The challenge (red headline, 4 constraint cards) · The rider (rider card + "At every stage, they ask", How I worked) · The big move · The solution (#1–#4) · Design decisions #1–#5 with figure canvases and "The call" bars + "More calls, at a glance" (7 cards) · Edge cases (8 chips) · The UI layer · Making it real · Learnings (quote card, Shipped / After launch, 01–05 takeaways, closing). New parts in `src/components/casestudy/bounceStory.tsx` (Section, Eyebrow, Body, Fig, Tags, Facts, BigStats, Cards, RiderCard, Solution, Decision, Chips, QuoteCard, Takeaways). Contents has 10 entries.
- **2026-11-23:** Bounce v5 subtitle swapped (her pick) to the grey summary "Redesigning an EV scooter rental app for delivery riders, so they see hubs, scooters and prices before the app asks anything of them." in Figma v5 and on the site; the "document wall → rider journey" squiggle line is gone.
- **2026-11-23:** Bounce v5: the big Google Play button is gone; "Live on Google Play" in the Platform fact is now a quiet underlined link with the small Play logo (`PlayLink` in bounceStory.tsx). Mirrored in Figma v5.
- **2026-11-23:** Bounce v5 Platform fact on one line: "Android rider app · ▶ Live on Google Play" (site + Figma v5).
- **2026-11-23:** Bounce v5 big numbers (39 / 11) smaller: 64px desktop, 52px mobile (site + Figma v5).
- **2026-11-24:** Bounce v5 updates (Figma v5 + site): old-vs-new flow as wrapping chips from her strip 1291:9950 (`FlowCompare`, kept / new step / moved here / removed); captions under 39 / 11 in Redaction; constraint cards tinted blue / amber / green / rose; subtle 1px outline on every phone mockup (figures re-exported); Team reads "Aum Vats (PM @ logo) · Developers"; research facts corrected (the Bounce team interviewed riders at hubs and in the office; "Research by hand" card). Figures moved to `public/assets/cases/bounce/v5/` so cached cropped images can't show.
- **2026-11-24:** Bounce v5 section labels (Context, How I worked, Solution #n, Design decision #n…) now 14px bold mono caps with a small glowing red dot in front, like a ticker (`Eyebrow`; Figma v5: 21 labels).
- **2026-11-24:** Bounce v5 (site + Figma v5): flow chips are light skeu pills (white for kept, soft tints for new / moved / removed); contents list is expandable: `TocItem.sub` in `Margin.tsx` unfolds sub-parts under the active item (The solution → #1–#4, Design decisions → #1–#5 + More calls) and highlights the current one; "How I worked" is now six pointers with bold lead-ins and the peach `Mark` highlighter on three key lines (Figma can't draw text highlights, so those phrases show in terracotta there).
- **2026-11-24:** New `Mark` type `marker`: a thin (8px), 55%-opacity peach band along the lower part of each line (multiply), drawn in while in the reading band. Used for the three key lines in "How I worked" instead of the full-height highlight.
- **2026-11-24:** Bounce v5 Context: bold key facts (Bengaluru and Delhi NCR, the three business concerns, the app's first UI designer) and the low marker on "It's a day without earnings." and "no designer, no system and no shared way of doing things"; "Many riders have low literacy." bold in The challenge (site + Figma v5).
- **2026-11-24:** **Work section in three tiers** on the home page, each on its own clipped paper sheet (`PaperStack`), so each opens with the same paperclip slide-in and tilt: (1) `#work` **Primary case studies**: Bounce Daily now leads full width, then eight.money and AppX side by side; AppX has no page yet, so its card is "Coming soon" (no link, no hover lift). "Apex" in the brief is AppX (she confirmed). (2) `#vibe` **Vibe-coded projects** (unchanged: Spider-Verse, UX Laws, Little Lights). (3) New `#early` sheet, **Early career** (`src/components/EarlyCareer.tsx`), with the footer moved under it: heading/intro from her Framer "Other case studies" copy ("Different products. Different challenges." / "A closer look at the work that pushed my thinking beyond the pixels."), three text-only `.skeu` cards, GeeksforGeeks (Graphic design intern, 6 months), Dualite (Visual designer, 3 months), Keploy (Product and visual designer, 3 months), with lines from her Framer case-study blurbs. No images or links yet: waiting on her screenshots for GFG and Dualite (`public/assets/work/keploy.webp` exists for Keploy) and on whether these get their own pages.
- **2026-11-24:** Bounce v5 figures **restyled as a Figma file** (her ask, after a demo board she approved, Figma node 1357:11413): light #F5F5F5 canvas, white "Before" and green "After" sections with name tags (or one named section when there's no old screen: Old app · Sign up, Checkout, Unhappy paths, Illustrations / Loyalty, Plan screen, Home · KYC status, Home · before things run out), frame names above each screen, one selected frame (blue outline + handles), a few teammate cursors ("Sanskriti", "Product manager"). Rebuilt in Figma v5, exported at **3×** to `public/assets/cases/bounce/v5/hq/` and served with `unoptimized` (no q75 re-compression) so they're sharp. Choose a plan's After now shows the full plan screen. **Design decision #2 is a live Figma-style hub merge** (`HubMergeFigma.tsx`, HTML/CSS, not video): old Hub list + Hub detail ghost together, the map screen appears, 4 comment pins + threads pop in; plays on view, Replay button at the end; scales to the column.
- **2026-11-24:** Early-career cards now have **thumbnails from her Framer "Project Card"s** (her pick): GeeksforGeeks ("Designing For Growth At GeeksForGeeks"), Dualite ("Dualite Alpha is now Launched!"), Keploy (the case-study collage), downloaded from framerusercontent.com and saved 1200px webp as `public/assets/cases/early-{gfg,dualite,keploy}.webp`; shown 4:3 at the top of each `.skeu` card. The GFG thumbnail shows her gmail address, as it does on Framer. Cards still have no links (no pages for these yet).
- **2026-11-24:** **Home vs Work page split** (her correction): the home page keeps only **primary case studies + vibe-coded projects** (two sheets, footer back under vibe). New **`/work` page** (`src/app/work/page.tsx`) shows all three tiers on clipped `PaperStack` sheets (`#primary`, `#vibe`, `#early` + footer), with a short hero: Nav, "Work" label, her Framer line "End-to-end product work, from early ideas and messy problems to polished, shipped experiences." as the heading, and three skeu jump pills (01 Primary case studies · 02 Vibe-coded projects · 03 Early career). The nav's **Work link now goes to `/work`** (was the home `#work` anchor); the hero's "See work" button still scrolls to the home section.
- **2026-11-24:** Bounce v5 (site + Figma v5): cursors and blue selection outlines removed from all figures; clean 3× exports now in `public/assets/cases/bounce/v5/figma/` (the `hq/` folder only keeps the three hub-merge screens). **KYC placement** (decision #3) rebuilt Figma-style: rider journey as five frames with blue prototype arrows, five comment pins, comment cards marked "× Ruled out" and a green resolved "✓ Chosen". **Hub merge animation** reworked for first-time viewers: step tabs (1 Before · 2 What moved · 3 After), a caption bar that explains each step, a blue "Map" box and an orange "Hub details" box on the old screens that land together on the new screen, then comment pins; Replay at the end. **"More calls" card labels** bigger (13px bold) with a tinted icon tile (lucide: Sparkles, ListChecks, CreditCard, House, Repeat, Palette, Layers).
- **2026-11-24:** **White veil fix** (her report: a sheet looked whitened before the next one arrived). `PaperStack` now measures how far the next sheet has risen from its real on-screen position (`useRise`: `getBoundingClientRect` on every scroll/resize) instead of motion's `useScroll` offset maths on sticky elements, which could fire early. The hero's sink/fade uses the same measure. The veil now stays at 0 until the next sheet is on screen (checked on `/` and `/work`). Pre-existing lint errors about refs in `PaperStack` are unchanged.
- **2026-11-24:** **GeeksforGeeks case study** at `/work/geeksforgeeks` (clipped-sheet layout like Bounce): all copy is hers, from her GFG portfolio boards in the Portfolio Figma file (section 1554:1948) and Framer. Sections: Working at GFG (her office polaroids + "Tech to Design" note), What I contributed (5 cards), Google ads (4), YouTube thumbnails (5), Article banners for design/UX (9, the "Fun fact" note and a live-on-site screenshot), Article banners in other topics (4), The highlight (GFG Premium landing page re-design, text only: no visuals of it were in the boards). 23 images + `office-polaroids.webp` in `public/assets/cases/gfg/`. The early-career GFG card now links here (cards take an optional `href`).
- **2026-11-24:** Bounce v5 (Figma v5 + site): **old-vs-new flow in Figma style** (white "Old app" and green "New app" sections, each step a small frame with its screen count, blue prototype arrows, New / Moved here / Removed tags; `FlowCompare`). **Hub merge animation, more detailed**: four tabs (Before · Spot the parts · Merge · After); the Map, Hub name and Scooters light up in blue on the old list, then Hub photo, Address and Available bike in orange on the old detail screen; all six pieces fly, staggered, to their exact spots on the new screen; then comment pins. Captions for every step, Replay at the end.
- **2026-11-24:** **Keploy case study** at `/work/keploy` (same clipped-sheet layout as GFG). Copy is hers from her Keploy boards in the Portfolio Figma file (section 1554:1985), plus Neha Gupta's testimonial from her Framer site (credited "Co-Founder @ Keploy"). Two small grammar fixes in her "Overall challenges" text ("biggest learning experiences", "grateful for it"); em dashes became commas. Section headings are short descriptive lines built from her copy. Sections: Working for Keploy (+ overall challenges card), What I worked on (4 skeu cards), Product design (VS Code dark/light, sign-up, dashboard), Custom illustrations (card illustrations, initial sketches with her notes, first/second/final ideations), Other website illustrations (bento, other sections, the graphics), E-mail graphics (banners, flyers), Marketing graphics (blurred client pitch deck captioned "Confidential 🔐", website ads, LinkedIn ads), Social media assets, Other vector illustrations, Kind words. 44 webp exports in `public/assets/cases/keploy/` (1x from Figma; the small sketches/ideations are ~400px). The product section opens with her VS Code extension close-up (Figma 869:796, `vscode-hero.webp`). The early-career Keploy card now links here. Sketch-to-note pairing follows their board positions; worth a check.
- **2026-11-24:** **GFG page, her feedback:** (1) images have **no corner radius** (it clipped the artwork edges), just a 1px line border; (2) every image **re-exported from her original uploads at full size, lossless webp** (YouTube thumbnails 1920×1080, banners 1000×470, live screenshot 1899×867, cover 2128×1598 as `gfg/cover.webp`) and served `unoptimized` so Next doesn't re-compress; the Google ads are natively 250×250 / 300×250, so they show at that size instead of being stretched; (3) a **"Tools I used day to day"** row under the ticket: Adobe Photoshop, Adobe Illustrator, Figma, with their official SVG logos from Wikimedia Commons in `public/assets/tools/`; (4) **contents nav accent is GFG green #2F8D46** on this page only, via a new `accent` prop on `CaseStudyFrame` (default stays #c8553b; also colours the reading-progress line). The early-career card thumbnails were regenerated at 1800px, quality 92, and served `unoptimized`.
- **2026-11-24:** GFG page: the 1px outline around images is gone too (her report of a "weird stroke": the cover art has its own transparent rounded corners, so a rectangular outline boxed it in). Images now sit bare on the sheet.
- **2026-11-24:** Removed "· Admit one" from the ticket labels on the GFG and Keploy pages (her question; it was my copy, carried over from the eight.money ticket). eight.money still has its own.
- **2026-11-24:** "Admit one" removed from the eight.money and Spider-Verse ticket labels too (her call); no page says it now.
- **2026-11-24:** Keploy page: images no longer use the shared framed `Shot` (rounded corners, outline, grey backing boxed in her cover art). A page-local bare `Shot`, served `unoptimized`, matches GFG; the cover uses the 1800px early-keploy.webp.
- **2026-11-24:** Keploy page contents nav + progress line use Keploy orange #F8904A (`accent` prop; sampled from the Keploy wordmark in her cover art), her ask.
- **2026-11-24:** Keploy page, her asks: (1) **final ideations** re-exported per card from Figma at 2× (754:27126/27657/27999; the old even three-way split cut them off-centre) and shown **full width, one below another**; (2) **website illustrations regrouped to match her board** (Desktop 9): For bento sections = web-1; The graphics = badges strip, GitHub trending, programs strip; For other sections = "Confident. Scalable. Reliable." section + the three detailed dark dashboards, all **full width**; (3) a thin outline (`border-line`) only on pieces on a plain white canvas (email flyers, sign-up, dashboard, VS Code screens, LinkedIn ads, vector illustrations, bento, card illustrations) so they do not melt into the page; rounded-card pieces and the cover stay bare.
- **2026-11-24:** Keploy "Other vector illustrations": outlines removed; each illustration now sits on its own soft grey panel (#f3f2ef, padded; the image uses mix-blend-multiply so its white canvas takes the grey), her ask.
- **2026-11-24:** Keploy "Other vector illustrations": removed the "Auto-generate tests" and "Approve / Reject" illustrations (vector-1, vector-3) at her ask; two remain (savings, checklist).
- **2026-11-24:** Keploy page, her asks: (1) **Kind words** is now a skeu testimonial card: soft orange quote mark, the pull line in Redaction, her full words in Courier, then a dashed divider with **Neha Gupta's photo** (from her Framer testimonial card, `keploy/neha-gupta.webp`), name + "Co-Founder, Keploy", and the **Keploy logo** (exported 3× from her cover collage, Figma 745:506, `keploy/keploy-logo.webp`, multiply-blended). (2) **Contents nav in Redaction** (same wrapper classes as Bounce). (3) **"The graphics"** heading now sits above the three dark dashboards, after the "Confident" section under "For other sections"; the badges strip, GitHub trending and programs strip moved under "For bento sections" to avoid two "The graphics" headings; she confirmed that grouping.
- **2026-11-24:** Keploy: removed the "Dashboard screen" (her ask); the Product design section is now "VS Code extension and sign-up."
- **2026-11-24:** Keploy "What I worked on" cards: each title has a small soft-orange icon tile (lucide: PenTool, Megaphone, Share2, Users; #FDEBDD tile, #E8762E icon), her ask.
- **2026-11-24:** **Tap-to-zoom on every case study** (her ask): `src/components/casestudy/ImageZoom.tsx`, mounted once by the new `src/app/work/layout.tsx`, so it covers all `/work/*` pages (Bounce, eight.money, GFG, Keploy, Spider-Verse, UX Laws) without touching their image components. Clicking an image inside the case study (`article`/`header`, not inside a link/button/nav, at least 120px wide) opens a dark full-screen viewer with the original file (it unwraps `/_next/image` URLs); a large image toggles between "fit" and real size (pannable) on tap; Esc, × or a backdrop tap closes it; page scroll is locked while open; zoom-in cursor on eligible images. Add `data-nozoom` to opt an image out.
- **2026-11-24:** Keploy, her asks: **orange scroll highlights** (`Mark type="marker"`) on "no easy feat", "pushed me out of my comfort zone", "one of my biggest learning experiences" (Overall challenges) and "the right balance between technical accuracy and visual clarity" (Custom illustrations); the line "One of the most challenging yet rewarding tasks…" is **bold**. To tint per page, `Mark` now reads `--scribble` / `--scribble-fill` from the marked element instead of `:root` (same defaults, so Bounce is unchanged); the Keploy page sets #E8762E / #F9B98A on its wrapper.
- **2026-11-24:** Keploy, her asks: (1) **white corners removed** on the rounded dark pieces (social posts, GitHub trending, badges strip, programs strip, dark website ad): the white was baked into her source images, so a corner-only flood fill (within 9% of each corner, near-white pixels touching the corner) makes it transparent; the light website ad keeps its white because its artwork is white at the edges. (2) **Website ads shown separately** (`web-ad-light.webp`, `web-ad-dark.webp`, exported 2× from Figma 761:2649 / 761:2648, side by side); the combined `web-ads.webp` is deleted. (3) The "One of the most challenging…" line is **half-bold**: Courier has no middle weight, so it is regular weight plus a 0.45px text stroke (like "AppX" in the home hero).
- **2026-11-24:** Keploy "Overall challenges": the sentence "It required a lot of brainstorming… what Keploy is about." is in Keploy orange #F8904A (same as the contents accent), her ask.
- **2026-11-24:** Keploy highlights, her ask: taller (13px band) and lighter (#FCD5B5). `Mark` now reads an optional `--marker-height` from the marked text (default 8px, centred on the same line, so Bounce is unchanged).
- **2026-11-24:** Keploy "Overall challenges": the Keploy rabbit icon (`keploy/keploy-icon.webp`, cropped from the logo) sits inline before "Keploy" in the orange sentence, her ask.
- **2026-11-24:** Keploy initial-sketch notes each highlight one key phrase (orange marker): "circuit-like visual connected blocks", "code graphics", "a speedometer type visual to represent full coverage", "glowing mock/test icon in the center" (`SKETCH_NOTES` third field + `MarkedNote`), her ask.
- **2026-11-24:** GFG page: **green scroll highlights** (her ask), same marker as Keploy (13px band) in a light GFG green #BFE6C8: "the head start GFG provided", "lessons I'll carry with me moving forward", "created from scratch in Photoshop", "grab attention & communicate the video's content effectively", "one of my core responsibilities", "making complex concepts more approachable and engaging", "revamped the product's landing page for its launch", "Positive feedback from my design team lead and project manager".
- **2026-11-24:** Keploy header: "Tools I used day to day" row (Adobe Illustrator, Adobe Photoshop, Figma, official logos from `public/assets/tools/`), same style as GFG, her ask.
- **2026-11-24:** GFG "Working at GeeksforGeeks": "Tech to Design" (with its quote marks) in GFG green #2F8D46, her ask.
- **2026-11-24:** GFG page, her asks: (1) **Working at GeeksforGeeks** no longer uses the polaroid collage; her text comes first, then her **five office photos as separate images** (originals from the loose images on the GFG page of her Figma file: 1554:1944–1947 and 418:6; `gfg/office-*.webp`, max 1200px) in an uncropped masonry (2 columns on phones, 3 on desktop). `office-polaroids.webp` deleted. (2) **Contribution cards are colourful**: each has its own soft tint (green / red / blue / amber / violet, white-to-tint gradient over the skeu shadow) and a matching coloured lucide icon on a white tile (Newspaper, MonitorPlay (lucide has no YouTube logo), Megaphone, CalendarDays, ChartPie). (3) **YouTube thumbnails full width, one below another.**
- **2026-11-24:** GFG section order (her ask): Working · What I contributed · Google ads · **Article banners · More article banners · YouTube thumbnails** · The highlight (contents list matches).
- **2026-11-24:** GFG: all article banners (both sections) **full width, one below another**; new line at the top of "What's in my GFG portfolio?" in her words, lightly tidied: "During my tenure at GeeksforGeeks, I was responsible, as an intern, for all the visual design and the thinking behind it: what each banner needed to communicate, and making sure it looked visually appealing too." (green marker on "all the visual design and the thinking behind it"). Unused `Grid` helper removed.
- **2026-11-24:** GFG section labels are **tickers** (her ask, like Bounce's Eyebrow): a 7px glowing dot in the page accent (GFG green via `--cs-accent`) then 14px bold mono caps with wide tracking, via page-scoped Tailwind variants on the wrapper (`[&_article>section>.label:first-child]:…`). Note: a plain rule appended to globals.css did not reach the dev server's CSS bundle, so page classes were used instead.
- **2026-11-24:** GFG "The highlight" now shows the **GFG Premium landing page re-design** (found on the GFG page of her Figma file, 286:35; `gfg/premium-landing-page.webp`, 1057×4096, full width, tap to zoom). Her farewell cake photo was added later to the office collage (`gfg/office-farewell-cake.webp`, last item, so it fills the third column).
- **2026-11-24:** GFG: the **Premium landing page part is removed** (her ask): heading, text and the landing-page image are gone (image file deleted) and so is "The highlight" from the contents list. The page ends with her quote "I'm incredibly thankful for the head start GFG provided." and the back link.
- **2026-11-24:** GFG contents list in Redaction (same wrapper classes as Keploy/Bounce), her ask.
- **2026-11-24:** GFG office photos: the masonry looked ragged (her feedback), so they are now an **even grid** of 4:5 cells (3×2 on desktop, 2 columns on phones), `object-cover` with a per-photo focus point (`OFFICE[].pos`); order: logo wall, desk view, selfie / desk, floor, farewell cake. Tap still opens the whole uncropped photo.
- **2026-11-24:** GFG office photos are now a **Pinterest-style board** (her ask: the even grid felt too arranged): explicit columns of rounded (16px), softly shadowed tiles in different shapes (2:3, 4:3, 4:5, 1:1) whose breaks do not line up but whose columns end level; 3 columns on desktop (`BOARD_WIDE`), 2 on phones (`BOARD_NARROW`), crop focus per photo, slight lift on hover, tap still opens the whole photo.
- **2026-11-24:** **Dualite case study** at `/work/dualite` (same clipped-sheet layout as GFG/Keploy: Redaction contents, ticker labels, tap to zoom; graphite accent #3A3A3A for Dualite's monochrome brand). Built from the **frames she placed on her Framer page /work/dualite** (her ask; the Figma file FmssmGPJHRgHS5vh3hwNao "dualite-socials" was looked at but not used): Alpha launch (hero), Builder Fridays (story/banner/post), Design to Dev podcast covers, product demo thumbnails ("…with alpha"), social posts (Concept to Launch, Figma to Code masterclass), video thumbnails, BITS campus collab. 7 webp at 2400px in `public/assets/cases/dualite/`, each full width. Copy is hers from Framer (description, Freelance Designer, 3 months, "All of the illustration that I made for marketing team of Dualite."); section headings describe each frame; the page's leftover Bounce template text and a design-system strip image are left out. The early-career Dualite card now links here.
- **2026-11-24:** **Dualite page rebuilt with separate graphics** (her ask: Framer decides *which* graphics, but they must be separate like GFG/Keploy, not her Framer collage frames). 30 files in `public/assets/cases/dualite/`, replacing the 7 composites. **From her Figma file "dualite-socials" (FmssmGPJHRgHS5vh3hwNao, instagram page), 2× exports where the frame matched Framer:** Builder Fridays Ep 3 story 55:149435, banner 184:64, post 179:86981; podcast covers 229:63 / 229:97 / 229:132; demo thumbnails 255:132 (FinTech), 259:209 (Figma import), 315:215 (marketplace), 350:686 (APIs), 360:131 (finance dashboard), 229:163 (no-code); BITS posts 498:61545 (illustration) and 500:101920 (sign up). **Cut out of the full-size images she uploaded to Framer** (exact picks; the Figma variants differed or did not exist): Alpha launch card, 4 Concept-to-Launch posts, 2 masterclass posts (the dark one on Framer says Saturday/Zoom, the Figma one Sunday/Meet), 9 video thumbnails (prompt, Figma→React, generative UI, Figma→Flutter, Figma→React code, Figma→Tailwind, vs Bolt/Lovable/Replit); a crop script finds each graphic on the flat backdrop and clears backdrop grey from rounded corners. Layout: wide pieces full width one below another (Builder Fridays banner, demos, video thumbnails); tall/square pieces side by side (story + post, 3 podcast covers, 6 posts in 2 columns, 2 BITS posts); the Alpha launch card sits centred under her line; the header hero is the Framer card thumbnail.
- **2026-11-24:** **Bounce: live Figma-style before/after animations** (HTML, replayable, 3× screens in `public/assets/cases/bounce/v5/hq/`). A shared kit `src/components/casestudy/figmaStage.tsx` (Stage clock that starts on scroll, Tabs, Caption with Replay, SectionBox, FrameName, Screen, Highlight, Pin, CommentCard) and the stories in `bounceAnims.tsx`: **ScooterStory** (decision 1: first idea plan + licence sheet → scooter type as its own step), **KycCardsStory** (decision 4: three home screens, then the three KYC cards lifted out on their own, the heroes), **CheckoutStory** (solution 3: old plan list + countdown → confirm and pay + success), **PlansStory** (solution 2: old plan boxes vs new plan screen, numbered pins with comment cards beside each phone, her ask that the old figure looked empty). Comment cards carry no name (her ask), including the hub merge animation. KYC placement figure re-exported with red "Ruled out" and a before/after flow (2544×2345).
- **2026-11-24:** **About page started** at `/about` (`src/app/about/page.tsx`, section in `src/components/about/AboutCollage.tsx`); the nav's About link now goes there. Opening section follows a magazine-collage reference she picked ("Notes from a creative" style): a white-framed "now" photo (her desk at night, cropped below the Instagram caption and clock) with five pinned photos around it (red pins): kid with a school bag, two toddler-on-a-phone photos, her wisteria anime painting, her oil-pastel swans. Photos are **greyscale until hovered** (then colour, straighten, lift). Handwritten lines use **Nothing You Could Do** (next/font, About page only; a 3rd typeface, at H2 / body sizes so the size scale stays). Copy (draft, from her own lines and journey notes): title "still the kid who loves to draw", caption "my mind never stops thinking", corner slip "If I don't know something, I learn it.", typed paragraph about dad's computer → MS Paint/Photoshop → Twitter, meetups, 100 Days of Code → GFG → Bangalore startups → AppX, and a label "About · Delhi NCR, India". Collage positions are % of the box, so it scales on phones (title moves above the box there). Photos in `public/assets/about/`; her other uploads (sketches, wall art, rose painting, painting setup) kept locally in `explorations/_ref/about/` (not pushed) for later sections. Still to come: no portrait of her yet (desk photo stands in), and the next sections (journey, experience, interests, meetups) are not chosen.
- **2026-11-24:** **About: Journey section** (`src/components/about/Journey.tsx`; shared pin/print/handwriting bits now in `src/components/about/paper.tsx`). Sanskriti OK'd photos with other people's faces. "How I got here", five numbered steps, all copy from her notes and posts: **01 A computer at home** (dad's computer, MS Paint/Photoshop, drawing competitions; pinned: painting table "natural habitat" cropped below its story caption, Eren coloured-pencil drawing, Demon Slayer sketch). **02 Curious about how it works** (Twitter, meetups, blogs, 100 Days of Code) with two of her X posts rebuilt as paper cards, word for word: CSS notes (Oct 3, 2023, with the notebook photo cropped from the screenshot) and her first Hashnode blog crossing 1K views. **03 Showing up**: a pinboard (absolute on desktop, 2-column grid on phones) of DevFest 2023 New Delhi (screen, group, selfie), AOH banner/talk/summer swag, Postman API Fundamentals Student Expert box, then her Hacktoberfest 2023 speaker post (slide only, attendee grid cropped out; slide says Open Source Lead @GDSC IIMT). **04 Design, for real** (GFG "dream come true", farewell; freelance, studio, YC) with a work list linking to the case studies: GeeksforGeeks May–Oct 2024, Keploy and Dualite marked Freelance (no dates: Framer's Keploy date looked like a typo), DreamLaunch/Bounce Daily Jan–Oct 2025, AppX (YC'21) Nov 2025–now (dates from her Framer site). **05 Now I build too** with a dark tag "38 contributions on November 19th." from her GitHub screenshot. The collage paragraph now uses her Framer "about strip" lines (designer by role, builder by instinct, engineer by degree) so it doesn't repeat the journey. Not used yet: Pikachu card (unclear if it's her design), clay magnets, pixel art, cat/croc paintings, ramen sketch, Spidey nails, rangoli and some meetup photos (those arrived without files; ask her for a folder).
- **2026-11-24:** About updates from her new photos: the **collage centre is now her portrait** (`portrait-now.jpg`, cropped from a Photo Booth mirror selfie; the strip of other people's thumbnails cut off). The desk photo moved to journey step 05 as a pinned print captioned with her own story line "me + claude = a love affair". Step 03 adds **Designare's Design Dialogue, Delhi (11 Jan 2025)**: her trading-card attendee pass, the event banner, and a two-mics photo. The step 03 pinboard is now **loose columns** (2 on phones, 4 on desktop; inline-block prints so pins never split across columns) instead of hand-placed positions, so new photos drop in easily. Beach silhouette photo saved locally, not used yet.
