# syntax=docker/dockerfile:1-labs

FROM node:22.19-alpine AS builder

WORKDIR /aiknew-admin

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/admin-ui/package.json ./apps/admin-ui/
COPY --exclude=api/* shared/ ./shared/
COPY shared/api/db/admin-db/ ./shared/api/db/admin-db/

RUN pnpm install --frozen-lockfile

COPY apps/admin-ui/ ./apps/admin-ui/

RUN pnpm run build

FROM nginx:stable-alpine

COPY --from=builder /aiknew-admin/apps/admin-ui/dist /usr/share/nginx/html

COPY apps/admin-ui/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]