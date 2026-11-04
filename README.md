# Sanskriti — portfolio

A monochrome, Japanese-inspired portfolio: washi paper and sumi ink by day, lantern light by night.
Designed in Figma (Home v2), vibe-coded with Claude Code.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's in the landing page

| Section | Interaction |
| --- | --- |
| Intro | Paper scroll unrolls once per session (any key skips) |
| Lantern | Click / pull → day ↔ night (remembered) |
| Hero | Ensō draws in, pixel-me blinks, thought bubble cycles, hover **Sans**·kriti → sans-serif, keyword glow in traditional colours |
| What I do | Omamori charms sway on hover |
| Where I've worked | Metro line — the train rides it as you scroll |
| Selected work | Card deck tied with a red mizuhiki cord — drag or ← → to shuffle |
| Built with AI | Shoji panels slide open to a live preview; tool chips with logos |
| More work | Ink fills the row; a preview follows the cursor |
| Playground | Live stamps: ink toggle, brush slider, sakura cursor, hanko button |
| Why Japan | Line-art ramen shop with steam; the story behind the aesthetic |
| Off the clock | Gachapon — turn the handle to pop an interest |
| Footer | Fuji street: birds scatter from the cursor, lanterns glow at night |
| Nav | Sticky bottom pill, shrinks on scroll; kanji rail on the left |

All motion respects `prefers-reduced-motion`.

## Editing content

Copy, projects, stations and interests live in [`lib/content.ts`](lib/content.ts).
Placeholders to replace: email, company names, project covers, project two/three, books, photos.
