# ReviewAI Project Instructions

This document provides foundational guidance for the ReviewAI project. All development must adhere to the standards, architecture, and patterns defined here.

## 🚀 Project Overview
ReviewAI is an AI-powered code reviewer that integrates with GitHub via a GitHub App. It analyzes Pull Request diffs using **Gemini 3 Flash** and provides automated feedback, bug risk scoring, and improvement suggestions directly on GitHub.

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router), React 19
- **State Management**: Zustand
- **Styling**: Tailwind CSS 4, Shadcn UI
- **Animations**: GSAP, Motion
- **Authentication**: Better Auth (Client-side)
- **Data Fetching**: Axios

### Backend
- **Runtime**: Node.js (Express 5)
- **Language**: TypeScript (ES Modules)
- **ORM**: Prisma 7
- **Database**: PostgreSQL
- **AI Engine**: Gemini 3 Flash (@google/genai)
- **GitHub Integration**: Octokit
- **Authentication**: Better Auth (Server-side)

## 🏗️ Architecture

### Decoupled Fullstack
- **Frontend** and **Backend** are separate services.
- Communication via REST API (JSON).
- Shared authentication via **Better Auth**, using cookies and headers.

### AI Pipeline
1. **GitHub Webhook**: Triggered on `pull_request` events (opened, synchronize).
2. **Diff Retrieval**: Backend fetches the PR diff using Octokit.
3. **AI Analysis**: Gemini 3 Flash analyzes the diff with a strict JSON schema prompt.
4. **Feedback Loop**: Backend parses JSON and posts comments/reviews back to GitHub.

## 📁 Folder Structure

### Backend (`/backend`)
- `prisma/`: Schema definition and migrations.
- `src/controllers/`: Logic for handling API requests.
- `src/routes/`: Express route definitions.
- `src/middleware/`: Express middlewares (e.g., `authMiddleware`).
- `src/utils/`: Utility functions (AI logic, GitHub access tokens, Auth config).
- `src/lib/`: Library initializations (Prisma client).
- `src/types/`: TypeScript definitions and global Express overrides.

### Frontend (`/frontend`)
- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components (Shadcn UI, domain-specific).
- `lib/`: Shared utilities, auth client, and server actions.
- `store/`: Zustand stores for global state (user, workspace, dashboard).
- `utils/`: API instances and helper functions.

## 📜 Coding Conventions

### General
- **TypeScript**: Use strict typing. Avoid `any`.
- **Naming**: `camelCase` for variables/functions, `PascalCase` for components/classes, `kebab-case` for files (mostly).

### Backend
- **ES Modules**: Use `.js` extensions in imports (required by TS for ESM).
- **Controllers**: Keep controllers lean; delegate complex logic to utility functions.
- **Error Handling**: Use `try/catch` blocks and return consistent JSON error responses.

### Frontend
- **React 19**: Leverage new primitives like `use` and improved form actions where appropriate.
- **Tailwind 4**: Use utility-first styling. Prefer CSS variables for theme customization.
- **Zustand**: Keep stores focused and avoid over-nesting state.

## 🔌 API Patterns
- **Base URL**: `/api/v1` for general resources, `/api/github` for GitHub-specific logic.
- **Authentication**: Protect routes with `authMiddleware`. It populates `req.session`.
- **Responses**: Always return JSON. Success: `{ data: ... }` or `{ ... }`. Error: `{ error: "Message" }`.

## 🗄️ Database Rules
- **Naming**: Use `@@map` in Prisma to keep database table names lowercase.
- **Relations**: Use explicit relations in `schema.prisma`.
- **Migrations**: Always use `pnpm db:migrate` for schema changes.

## 🚢 Deployment & Local Development
- **Docker**: The project is containerized using Docker Compose.
- **Services**: `db` (Postgres), `backend`, `frontend`.
- **Environment**: Managed via `.env` files in both frontend and backend roots.
- **Local Ingress**: The backend uses **ngrok** for local development to receive GitHub webhooks. Ensure `NGROK_AUTHTOKEN` and `NGROK_DOMAIN` are set in `backend/.env`.

## 🧪 Testing Strategy
*Currently, the project does not have automated tests. Future contributions should include:*
- **Backend**: Unit tests for controllers and AI parsing logic using Vitest or Jest.
- **Frontend**: Component tests using React Testing Library and E2E tests using Playwright.
- **AI Validation**: Regression tests for AI prompts to ensure consistent JSON responses.

## 🔑 Key Environment Variables

### Backend
- `DATABASE_URL`: PostgreSQL connection string.
- `GEMINI_API_KEY`: Google Gemini API key.
- `GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY`: Credentials for the GitHub App.
- `BETTER_AUTH_SECRET`: Secret for authentication.
- `NGROK_AUTHTOKEN`: For local webhook tunneling.

### Frontend
- `NEXT_PUBLIC_BACKEND_URL`: URL of the Express backend.

## 🧠 Business Logic Assumptions
- **Gemini 3 Flash**: Assumed to be the primary AI model for diff analysis.
- **GitHub App**: The system relies on a GitHub App installation for repo access.
- **JSON Strictness**: AI prompts must enforce strict JSON output to ensure reliable parsing.
- **Onboarding**: Users must setup a workspace and install the GitHub App before they can use the dashboard effectively.
