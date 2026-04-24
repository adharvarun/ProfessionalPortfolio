# University Portfolio

Welcome to my University Portfolio project! This project serves as an interactive and highly customizable display of my experience, projects, and work, built with cutting-edge web technologies like **Next.js**, **Sanity** (Headless CMS), **Three.js** (3D Rendering), and **GSAP** (Animations).

## Features

- **Next.js 16 (App Router)**: Lightning-fast, React-based framework for optimized server and client-side rendering.
- **Sanity CMS**: Fully configurable content backend. Allows you to edit Projects, Experience, and About sections seamlessly without touching code.
- **Three.js Integration**: Impressive 3D models and interactive environments running right in your browser (check out the `laptopModel`).
- **GSAP Animations**: Smooth transitions, custom cursors, and particle animations directly on the frontend.
- **Tailwind CSS v4**: Beautiful, utility-centric styling framework.

## Getting Started

### Prerequisites

You will need the following tools installed:
- Node.js (v20+ recommended)
- npm, yarn, or pnpm

### 1. Installation

Clone the repository and install all dependencies:

```bash
npm install
```

### 2. Sanity CMS Setup

This project uses Sanity as the content backbone. 
1. Copy the `.env.example` file to create `.env.local` (or map the variables directly if using an environment manager).
2. Set the following environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity Project ID
   - `NEXT_PUBLIC_SANITY_DATASET` - Usually \`production\`
   - `SANITY_API_TOKEN` - (Optional) Necessary if you have private datasets.

You can spin up the Sanity Studio by navigating to `http://localhost:3000/studio` after starting the development server, or you can run `npm run sanity` for Sanity-specific CLI tasks.

### 3. Running the Development Server

Start the project interactively:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The development server supports React Server Components and hot module reloading.

## Project Structure

A quick look at the file organization:

- **/app**: Next.js App Router root layout, pages, and integrated components.
  - **/app/components**: Specialized components (About, Experience, Projects, 3D Models, and Animations).
  - **/app/studio**: Sanity Studio embedded directly into Next.js routing.
- **/src/sanity**: Defines all the data schemas (Projects, Contact, Experience) and fetches them asynchronously.

## Deployment

The easiest way to deploy this Next.js app is via the [Vercel Platform](https://vercel.com/new). Make sure to inject your Sanity environment variables into Vercel during the deployment process!
