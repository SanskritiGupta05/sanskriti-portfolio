<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Stack

- Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS 4.
- UI: shadcn with Base UI (`src/components/ui`), `lucide-react` icons, `motion` for animation, `rough-notation` for hand-drawn marks.
- Canvas scripts live in `assets/` (plain JS, not part of the React tree).
- Imports use the `@/*` alias for `src/`.

## Code style

- **No comments.** Do not add comments of any kind to code (`//`, `/* */`, `{/* */}`, CSS comments). Remove comments you find when you touch a file. The only exception is a tool directive that must stay, such as `eslint-disable-next-line`.
- Prettier: 4 spaces (no tab characters), `printWidth` 100, double quotes, semicolons, trailing commas, LF line endings. Config is in `.prettierrc.json`.
- ESLint: `eslint-config-next` (core-web-vitals and TypeScript), `eslint-config-prettier`, and `eslint-plugin-simple-import-sort`. Imports and exports must stay sorted.
- Do not change the design when you clean up or refactor. Prove it with a before and after check, for example the built HTML and CSS. Do not rely on looking at it by eye.

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run format
npm run format:check
```

Run `npm run format` and `npm run lint` after every change.
