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
