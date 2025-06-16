# AIKNEW-ADMIN API

## 目前已知问题

使用 tsc 编译，会有问题, 编译后/home/syntroy/project/aiknew/apps/api/dist/src/common/dtos/response-json.dto.js，类 ResponseJson 的静态方法中会把 @aiknew/enums 共享包改为相对路径，且该路径错误，导致找不到模块，相关issue：https://github.com/nestjs/swagger/issues/846

nest build -b swc 或 nest build -b webpack 无问题
