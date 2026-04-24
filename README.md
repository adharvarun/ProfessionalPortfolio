# Professional Portfolio

A personal portfolio site built with **Next.js** and **Sanity**.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Sanity CMS

## Getting Started

### 1) Install dependencies

```bash
npm ci
```

### 2) Configure environment variables

Create `.env.local` in the project root and set:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
# optional
NEXT_PUBLIC_SANITY_API_VERSION=2021-10-21
```

### 3) Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `npm run dev` — start the development server
- `npm run build` — build for production
- `npm run start` — run the production build
- `npm run lint` — run ESLint
- `npm run sanity` — run Sanity CLI commands

## Sanity Studio

Sanity Studio is mounted at:

- `http://localhost:3000/studio`

Schema definitions are in:

- `src/sanity/schemaTypes/`

## Project Structure

- `app/` — Next.js app routes and UI components
- `app/components/` — portfolio sections and shared UI
- `app/studio/[[...tool]]/` — embedded Sanity Studio route
- `src/sanity/` — Sanity client, queries, types, and schemas
