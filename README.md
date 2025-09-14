English | [简体中文](./README-zh.md)

A admin dashboard developed using Nest.js, Prisma, Vue3, Element-Plus, and TypeScript,uses pnpm monorepo architecture, supporting multi-language text, and compatible with mobile devices.

# Development Environment

## Environment Requirements

- Node.js 22+
- PNPM 10+
- Postgres 17+
- Redis 7+

In the `apps/admin-api` directory, copy the `.env.example` file and rename it to `.env`, then modify the corresponding environment variable values.

In the project root directory, run:

```
# Install dependencies
pnpm install
```

```
# Run in the project root directory
pnpm db:migrate  # Execute database migration
pnpm db:seed     # Execute data initialization
```

```
# Run admin-api
pnpm api
```

```
# Run admin-ui
pnpm admin
```

# Deployment Notes

In the `apps/admin-api` directory, copy the `.env.example` file and rename it to `.env.production`, then modify the corresponding environment variable values (corresponding to the configuration in `docker-compose.yaml` in the project root directory).

In the `apps/admin-api` directory, run:

```shell
# Encrypt the .env.production file
pnpm env:prod:encrypt
```

This command will encrypt your `.env.production` file, and simultaneously generate a `.env.keys` file in the `apps/admin-api` directory, which contains the key required for decryption. Copy the value of `DOTENV_PRIVATE_KEY_PRODUCTION` from inside it, and fill it in the corresponding position in the `docker-compose.yaml` file in the project root directory.

Run database migration and execute data initialization:

```shell
docker compose run --rm admin-api /bin/sh -c "pnpm db:deploy:prod && pnpm db:seed:prod"
```

Start Docker Compose:

```shell
docker compose up -d
```

After successful startup, you can access:

```
http://localhost:8080
```
