# syntax=docker/dockerfile:1-labs

FROM node:22.19-alpine AS builder

WORKDIR /aiknew-admin

RUN npm i -g pnpm

COPY apps/admin-api/.env.production ./apps/admin-api/.env.production
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/admin-api/nest-cli.json apps/admin-api/tsconfig.* apps/admin-api/webpack.config.js ./apps/admin-api/
COPY apps/admin-api/package.json ./apps/admin-api/
COPY --exclude=ui/* shared/ ./shared/

RUN pnpm install --frozen-lockfile

COPY apps/admin-api/src ./apps/admin-api/src

RUN pnpm build

FROM node:22.19-alpine AS runner

WORKDIR /aiknew-admin

# Install dotenvx
RUN apk add curl
RUN curl -sfS https://dotenvx.sh/install.sh | sh

RUN npm i -g pnpm
RUN npm install pm2@latest -g

COPY apps/admin-api/.env.production apps/admin-api/ecosystem.config.js ./apps/admin-api/
COPY --from=builder /aiknew-admin/package.json /aiknew-admin/pnpm-lock.yaml ./
COPY --from=builder /aiknew-admin/apps/admin-api/package.json ./apps/admin-api/
COPY --from=builder --exclude=**/src/*.ts --exclude=ui/* /aiknew-admin/shared/ ./shared/
COPY --from=builder /aiknew-admin/pnpm-workspace.yaml ./
COPY --from=builder /aiknew-admin/apps/admin-api/dist ./apps/admin-api/dist

RUN pnpm install --frozen-lockfile --production

RUN mkdir -p /aiknew-admin/apps/admin-api/logs /aiknew-admin/apps/admin-api/public/files && \
    chown -R node:node /aiknew-admin/apps/admin-api/logs /aiknew-admin/apps/admin-api/public

USER node
WORKDIR /aiknew-admin/apps/admin-api

EXPOSE 3000
CMD ["dotenvx", "run", "-f", ".env.production", "--", "pm2-runtime", "start", "./ecosystem.config.js"]
