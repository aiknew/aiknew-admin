# Gemini Project Context: aiknew-admin

This document provides a comprehensive overview of the `aiknew-admin` project, its structure, and key operational commands to guide AI-driven development.

## Project Overview

`aiknew-admin` is a full-stack monorepo project built with `pnpm` workspaces. It constitutes a modern admin dashboard.

- **Frontend (`apps/admin-ui`):** A Vue.js 3 application built with Vite. It uses Element-Plus for UI components, Tailwind CSS for styling, Pinia for state management, and Vue Router for navigation.
- **Backend (`apps/admin-api`):** A Nest.js application responsible for the API. It uses Prisma as the ORM for database interactions with a PostgreSQL database and leverages Redis for caching.
- **Shared Packages (`shared/`):** A collection of shared packages used across the monorepo for consistent code, types, configurations, and UI components. This includes shared database schemas, DTOs, enums, and utility functions.

The project is fully typed with TypeScript and includes configurations for Docker, making it easy to set up for both development and production environments.

## Building and Running

### Environment Setup

1.  **Prerequisites:**

    - Node.js 22+
    - pnpm 10+
    - Postgres 17+
    - Redis 7+

2.  **Backend Configuration:**

    - In the `apps/admin-api` directory, copy `.env.example` to `.env`.
    - Update the environment variables in `.env` with your local database and Redis connection details.

3.  **Install Dependencies:**
    - Run the following command in the project root:
      ```bash
      pnpm install
      ```

### Development

1.  **Database Setup:**

    - Run database migrations and seed the database with initial data.

      ```bash
      # Execute database migration
      pnpm db:migrate

      # Execute data initialization
      pnpm db:seed
      ```

2.  **Run Applications:**
    - To start the backend API in watch mode:
      ```bash
      pnpm api
      ```
    - To start the frontend development server:
      ```bash
      pnpm admin
      ```

### Building for Production

- To build all packages in the monorepo, run the following from the root directory:
  ```bash
  pnpm build
  ```

### Running in Production (Docker)

The project is configured to run in production using Docker Compose.

1.  **Configure Production Environment:**

    - In `apps/admin-api`, copy `.env.example` to `.env.production` and fill in the production environment variables.
    - Encrypt the `.env.production` file by running `pnpm env:prod:encrypt` inside `apps/admin-api`.
    - Copy the `DOTENV_PRIVATE_KEY_PRODUCTION` value from the generated `.env.keys` file and place it in the `docker-compose.yaml` file.

2.  **Deploy and Seed Database:**

    ```bash
    docker compose run --rm admin-api /bin/sh -c "pnpm db:deploy:prod && pnpm db:seed:prod"
    ```

3.  **Start Services:**
    ```bash
    docker compose up -d
    ```
    The application will be accessible at `http://localhost:8080`.

## Development Conventions

- **Monorepo Structure:** The project uses `pnpm` workspaces to manage dependencies and inter-package linking. Shared code is located in the `shared/` directory.
- **Code Style:** Code formatting is enforced by Prettier and linting by ESLint. Configuration files (`.prettierrc`, `eslint.config.mjs`, etc.) can be found in the root and package directories.
- **Database:** Database schema and migrations are managed by Prisma. The schema is defined in `shared/api/db/admin-db/prisma/schema.prisma`.
- **API:** The backend follows the standard Nest.js modular architecture. API endpoints, services, and modules are located in `apps/admin-api/src/modules`.
- **State Management:** The frontend uses Pinia for centralized state management. Stores are located in `apps/admin-ui/src/stores`.
