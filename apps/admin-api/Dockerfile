FROM node:22.19 AS builder

WORKDIR /aiknew-admin

RUN npm i -g pnpm

COPY apps/admin-api/.env.production ./apps/admin-api/.env.production
COPY package.json pnpm-lock.yaml ./
COPY apps/admin-api/nest-cli.json apps/admin-api/tsconfig.* apps/admin-api/webpack.config.js ./apps/admin-api/
COPY apps/admin-api/package.json ./apps/admin-api/
COPY shared/ ./shared/
COPY pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY apps/admin-api/src ./apps/admin-api/src

RUN pnpm build

FROM node:22.19 AS runner

WORKDIR /aiknew-admin

RUN npm i -g pnpm
# Install dotenvx
RUN curl -sfS https://dotenvx.sh/install.sh | sh

COPY apps/admin-api/.env.production ./apps/admin-api/.env.production
COPY --from=builder /aiknew-admin/package.json /aiknew-admin/pnpm-lock.yaml ./
COPY --from=builder /aiknew-admin/apps/admin-api/package.json ./apps/admin-api/
COPY --from=builder /aiknew-admin/shared/ ./shared/
COPY --from=builder /aiknew-admin/pnpm-workspace.yaml ./
COPY --from=builder /aiknew-admin/apps/admin-api/dist ./apps/admin-api/dist

RUN pnpm install --frozen-lockfile --production

WORKDIR /aiknew-admin/apps/admin-api

EXPOSE 3000
CMD ["dotenvx", "run", "-f", ".env.production", "--", "node", "dist/main.js"]