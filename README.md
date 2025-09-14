基于 Nest.js, Prisma, Vue3, Element-Plus, Typescript 编写的后台管理系统, 采用 pnpm monorepo 架构，支持多语言文本，兼容移动端

# 开发环境

## 环境要求

- Node.js22+
- PNPM10+
- Postgres17+
- Redis7+

在 apps/admin-api 下，复制 .env.example 文件，重命名为 .env，修改相应环境变量的值

在项目根目录下，运行

```
# 安装依赖项
pnpm install
```

```
# 在项目根目录下运行
pnpm db:migrate # 执行数据库迁移
pnpm db:seed # 执行数据初始化
```

```
# 运行 admin-api
pnpm api
```

```
# 运行 admin-ui
pnpm admin
```

# 部署注意事项

在 apps/admin-api 下，复制 .env.example 文件，重命名为 .env.production，修改相应环境变量的值(与项目根目录下的 docker-compose.yaml 中的配置相对应)

在 apps/admin-api 目录下运行：

```shell
# 加密 .env.production 文件
pnpm env:prod:encrypt
```

该命令会加密您的 .env.production 文件，同时在 apps/admin-api 目录下会生成 .env.keys 文件，里面包含解密所需的密钥，复制里面的 DOTENV_PRIVATE_KEY_PRODUCTION 的值，填写在项目根目录的 docker-compose.yaml 中相应的位置。

运行数据库迁移，执行数据初始化：

```shell
docker compose run --rm admin-api /bin/sh -c "pnpm db:deploy:prod && pnpm db:seed:prod"
```

启动 docker compose:

```shell
docker compose up -d
```

启动成功后，即可访问：

```
http://localhost:8080
```
