# Development

You need to install postgres17+, redis7+, node.js22+, pnpm10+ first.

In the apps/admin-api directory, copy the .env.example file, rename it to .env, and modify the corresponding environment variable values.

In the project root directory, run:

```
# Install dependencies
pnpm install
```

```
# Run admin-api
pnpm api
```

```
# Run admin-ui
pnpm admin
```

# Deployment

In the apps/admin-api directory, copy the .env.example file, rename it to .env.production, and modify the corresponding environment variable values (corresponding to the configuration in docker-compose.yaml in the project root directory).

Run in the apps/admin-api directory:

```shell
# Encrypt .env.production file
pnpm env:prod:encrypt
```

This command will encrypt your .env.production file, and generate a .env.keys file in the apps/admin-api directory, which contains the keys needed for decryption. Copy the value of DOTENV_PRIVATE_KEY_PRODUCTION from it, and fill it in the corresponding positions in the environment of the migrate and admin-api services in docker-compose.yaml in the project root directory.

Run database migration and perform data initialization:

```shell
docker compose --profile migrate run migrate
```

Start docker compose:

```shell
docker compose up -d
```

After successful startup, you can access:

```
http://localhost:8080
```
