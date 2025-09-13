# 开发

您需要先安装 postgres17+, redis7+, node.js22+,pnpm10+

在 apps/admin-api 下，复制 .env.example 文件，重命名为 .env，修改相应环境变量的值

在项目根目录下，运行

```
# 安装依赖项
pnpm install
```

```
# 运行 admin-api
pnpm api
```

```
# 运行 admin-ui
pnpm admin
```

# 部署

在 apps/admin-api 下，复制 .env.example 文件，重命名为 .env.production，修改相应环境变量的值(与项目根目录下的 docker-compose.yaml 中的配置相对应)

在 apps/admin-api 目录下运行：

```shell
# 加密 .env.production 文件
pnpm env:prod:encrypt
```

该命令会加密您的 .env.production 文件，同时在 apps/admin-api 目录下会生成 .env.keys 文件，里面包含解密所需的密钥，复制里面的 DOTENV_PRIVATE_KEY_PRODUCTION 的值，填写在项目根目录的 docker-compose.yaml 中 migrate 和 admin-api 两个服务的 environment 中相应的位置。

运行数据库迁移，执行数据初始化：

```shell
docker compose --profile migrate run migrate
```

启动 docker compose:

```shell
docker compose up -d
```

启动成功后，即可访问：

```
http://localhost:8080
```
