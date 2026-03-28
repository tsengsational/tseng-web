---
description: PRD
---

# Role and Objective
You are an expert full-stack developer. Your task is to scaffold a headless CMS portfolio website. The architecture consists of a Vue 3 frontend and a Directus headless CMS backed by a PostgreSQL database, which will be deployed on Railway.

# Tech Stack
- Frontend: Vue 3 (Composition API, `<script setup>`), Vite, Tailwind CSS, Directus JavaScript SDK.
- Backend/CMS: Directus (configured for deployment via Railway).
- Database: PostgreSQL (hosted on Railway).

# Project Requirements & Architecture

## 1. Backend & Database (Directus + Postgres)
- Create a `docker-compose.yml` for local Directus and PostgreSQL development that mirrors the Railway environment. 
- Provide the CLI commands or a script to scaffold a Directus collection named `projects`.
- The `projects` collection schema must include:
  - `id` (UUID)
  - `title` (String)
  - `description` (Text)
  - `image` (File/Image)
  - `role` (Dropdown/String: 'Writer', 'Artist', 'Coder')
  - `is_featured` (Boolean)
  - `link` (String)
- **Seed Data:** Generate an initial data seed script or JSON file with mock data that reflects these three distinct roles. Include items such as:
  - *Writer:* Theatrical plays and scripts (e.g., a play titled "Fear & Wonder" or "Family Dinner").
  - *Artist:* Physical and visual arts (e.g., watercolor paintings of the ocean surface, thrown pottery, or amigurumi crochet patterns).
  - *Coder:* Front-end engineering applications (e.g., a Vue-based color palette generator called "Palettable" or a 3D-to-amigurumi converter).

## 2. Frontend (Vue 3)
- Initialize a Vite + Vue 3 project with Tailwind CSS.
- Configure the `@directus/sdk` to connect to the local Directus instance (using environment variables for the API URL).
- Create a composable (`useDirectus.js` or `useProjects.ts`) to fetch projects where `is_featured` is true, sorted or grouped by the `role` field.

## 3. Component Structure
Scaffold the following components in the `src/components` directory:
- `HeroSection.vue`: A prominent introductory section for the homepage.
- `RoleSection.vue`: A reusable component that takes a `role` prop ('Writer', 'Artist', 'Coder') and an array of project data. It should display a section heading and a CSS grid of project cards.
- `ProjectCard.vue`: A card component displaying the project image, title, description, and an outgoing link.

## 4. Page Layout
- `App.vue` /