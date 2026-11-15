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
- **Tokens (in `src/app/globals.css`):** colours `bg / ink / head / muted / line` are CSS variables that flip under `html[data-theme="dark"]`; fonts `font-serif` (Redaction), `font-worn` (Redaction 35), `font-mono` (Courier New); the **only** text sizes are `text-h1` 60 (was 72), `text-h2` 36, `text-lg` 20, `text-base` 16, `text-sm` 13, plus mobile `text-h1m` 48, `text-h2m` 28, `text-lgm` 18 (all other Tailwind sizes are removed). Utilities `printed` (the ink effect) and `label` (small caps labels).
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
  - H1: "I design products, that people actually use!" (her exact wording, comma included), on two lines with "actually use!" in Redaction 35. On desktop the heading extends 64px past the column on each side (`md:-mx-16`) so the second line fits;
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
- **2026-11-16:** Removed the ↓ arrow from the See work button.
- **2026-11-16:** Hero made a bit smaller: H1 token 72 → 60px, intro text 20 → 16px, buttons 56 → 48px tall with 16px labels and a scaled-down sprig and waves.
- **2026-11-16:** Connected Framer and pulled the real content from "New folio 2026" into `docs/framer-content.md` (read-only; nothing changed in Framer). Waiting for Sanskriti to choose what to use.
- **2026-11-16:** Hero text replaced with the hero copy from her Framer portfolio ("I design products, that people actually use!" and friends).
