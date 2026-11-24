<div align="center">

# News Platform — Frontend

**A responsive news publishing and content discovery experience**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[Repository](https://github.com/mohammad-valipour/news-frontend) · [Backend API](https://github.com/mohammad-valipour/news-api)

</div>

---

## Overview

`news-frontend` is the frontend application for a news publishing and content management platform. It provides the user-facing website and the interface layer used to browse and interact with news content.

The project is being developed with **Next.js, React, and TypeScript**. Its codebase is organized around application routes, reusable UI components, and feature-oriented modules. The frontend is designed to work with a separate backend API.

> **Project status:** In active development. Features, routes, API contracts, and setup requirements may change as implementation progresses. This repository should not be considered a finished production release.

## Technology stack

| Area | Technology |
|---|---|
| Framework | Next.js 16 |
| UI library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Server-state management | TanStack Query |
| Forms | React Hook Form |
| Schema validation | Zod |
| Form validation integration | `@hookform/resolvers` |
| UI primitives | Base UI, shadcn/ui |
| Icons | Lucide React |
| HTML sanitization | `sanitize-html` |
| Theme support | `next-themes` |
| Carousel / slider | Swiper |
| Code quality | ESLint |

Versions above reflect the dependencies declared in the repository's `package.json`; consult that file for exact installed versions.

## Current codebase organization

The repository currently includes these top-level areas:

```text
.
├── app/          # Next.js routes, layouts, and application entry points
├── components/   # Shared and reusable UI components
├── constants/    # Shared constants
├── features/     # Feature-oriented application modules
├── lib/          # Shared utilities and library code
├── providers/    # React context and application providers
├── public/       # Static assets
├── queries/      # Query-related modules
├── services/     # Service and API communication modules
├── types/        # Shared TypeScript types
├── package.json
└── tsconfig.json
```

This is a high-level map of the current repository, not a promise that every feature is complete or that the structure will remain unchanged.

## Development principles

The frontend is developed with an emphasis on:

- **Type safety:** TypeScript is used to make component contracts and application data more explicit.
- **Reusable UI:** shared components help keep interface behavior and presentation consistent.
- **Feature-oriented organization:** related feature code is grouped to make the application easier to navigate and extend.
- **API integration:** backend communication is separated from presentation concerns where appropriate.
- **Form validation:** React Hook Form and Zod provide a structured approach to form state and validation.
- **User experience:** responsive layouts and clear content navigation are important parts of the interface.
- **Safer content rendering:** HTML sanitization is included for content that may contain markup.

## Getting started

### Prerequisites

Install the following tools:

- Node.js (use a version compatible with the installed Next.js release)
- npm
- Git
- Access to the companion backend if you want to test integrated functionality

### 1. Clone the repository

```bash
git clone https://github.com/mohammad-valipour/news-frontend.git
cd news-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the application

Some features communicate with the backend API. Review the API configuration in the source code and provide the required environment variables for your local environment.

Do not commit credentials, private tokens, or local `.env` files. If the project includes an `.env.example`, use it as the source of truth; otherwise, check the current service/configuration code before creating local variables. Variable names and required values can change during development.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

The scripts currently declared in `package.json` are:

| Command | Purpose |
|---|---|
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Creates a production build |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint |

Run the lint and build commands before submitting changes where practical.

## Backend integration

The companion backend repository is:

[**news-api — Go backend**](https://github.com/mohammad-valipour/news-api)

The frontend and backend are maintained as separate repositories. For local integration:

1. Start the backend and its required services using the backend repository's instructions.
2. Identify the API base URL and any required browser-accessible configuration from the frontend's current service code.
3. Configure the frontend with the appropriate local API address.
4. Verify requests in the browser's Network panel and check both application logs when troubleshooting.

The API URL, route prefixes, authentication flow, and request/response contracts should be taken from the current implementation or API documentation rather than assumed from this README.

## Development workflow

A practical contribution workflow:

1. Create a focused branch for the change.
2. Keep components and feature logic close to their relevant feature where the existing structure allows.
3. Reuse shared components and types instead of duplicating them.
4. Validate user input at the form boundary.
5. Handle loading, empty, and error states for asynchronous data.
6. Run `npm run lint` and `npm run build`.
7. Review the change in the browser at desktop and mobile widths.
8. Submit a pull request with a concise description and relevant screenshots when UI behavior changes.

## Security and configuration notes

- Never commit `.env` files or secrets.
- Treat content received from external sources as untrusted.
- Preserve sanitization when rendering HTML content.
- Avoid exposing server-only credentials through client-side environment variables.
- Validate and handle API responses rather than relying only on UI constraints.

## Known limitations

This project is still evolving. The exact feature set, supported workflows, API contract, and deployment configuration may change. Not all planned functionality should be assumed to be implemented.

## Roadmap

The following are general development areas, not claims that these items are already implemented:

- Continue expanding and refining the news browsing experience.
- Improve consistency and reuse across UI components.
- Strengthen loading, empty, and error handling.
- Continue integrating frontend flows with the Go API.
- Improve accessibility, responsive behavior, and automated quality checks.
- Keep setup and API documentation aligned with implementation changes.

## Related repository

- [Backend API (Go)](https://github.com/mohammad-valipour/news-api)

## Maintainer

**Mohammad Valipour**  
GitHub: [@mohammad-valipour](https://github.com/mohammad-valipour)

---

<div align="center">

**Work in progress · Built with Next.js, React, and TypeScript**

</div>
