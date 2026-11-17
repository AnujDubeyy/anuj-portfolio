# AnDu — Personal Portfolio

Personal portfolio site (browser title: "AnDu") built with React, Vite and Tailwind CSS. It is a single-page site whose content lives in `src/App.tsx`, showcasing selected projects including ProjectPulse, Cybrion Consulting and a browser-based To-Do List, plus a skills summary.

This repo started from a Figma Make scaffold. See `AGENTS.md` in this repo for contributor notes on the structure, styling and code conventions.

## Tech stack

- React 19, React DOM 19
- Vite 8 with `@vitejs/plugin-react`
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- TypeScript 5.7

## Getting started

Prerequisites: Node.js and npm.

```bash
git clone https://github.com/AnujDubeyy/anuj-portfolio.git
cd anuj-portfolio
npm install
npm run dev
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build locally |
| `npm run format` | Format with oxfmt |

## Project structure

```
anuj-portfolio/
├── index.html           # Vite HTML shell, mounts #root
├── package.json         # Scripts and dependencies (package name: figma-make-app)
├── vite.config.ts       # Vite + React + Tailwind config, @ alias for src
├── AGENTS.md            # Contributor notes
└── src/
    ├── main.tsx         # Entry point, imports index.css and mounts App
    ├── App.tsx          # Portfolio content and layout
    └── index.css        # Global CSS and Tailwind import
```
