-- CreateEnum
CREATE TYPE "public"."LanguageOrientation" AS ENUM ('LTR', 'RTL');

-- CreateEnum
CREATE TYPE "public"."RouteType" AS ENUM ('GROUP', 'SMALL_GROUP', 'MENU', 'BUTTON');

-- CreateEnum
CREATE TYPE "public"."RequestMethod" AS ENUM ('GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'ALL', 'OPTIONS', 'HEAD', 'SEARCH', 'PROPFIND', 'PROPPATCH', 'MKCOL', 'COPY', 'MOVE', 'LOCK', 'UNLOCK');

-- CreateEnum
CREATE TYPE "public"."AdminPermissionSource" AS ENUM ('BUILT_IN', 'EXTERNAL');

-- CreateEnum
CREATE TYPE "public"."StorageType" AS ENUM ('LOCAL', 'S3');

-- CreateEnum
CREATE TYPE "public"."UploadFileChannel" AS ENUM ('ADMIN', 'WEB', 'S3_CONSOLE');

-- CreateEnum
CREATE TYPE "public"."FileStatus" AS ENUM ('NORMAL', 'MISSING');

-- CreateEnum
CREATE TYPE "public"."FileStorageStatus" AS ENUM ('NORMAL', 'DISABLED', 'DISABLED_UPLOAD');

-- CreateTable
CREATE TABLE "public"."ArticleCategory" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 10,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "parentId" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArticleCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ArticleCategoryTranslation" (
    "articleCategoryId" INTEGER NOT NULL,
    "langKey" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "ArticleCategoryTranslation_pkey" PRIMARY KEY ("articleCategoryId","langKey")
);

-- CreateTable
CREATE TABLE "public"."Article" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 10,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "realViewCount" INTEGER NOT NULL DEFAULT 0,
    "fakeViewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "articleCategoryId" INTEGER NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ArticleTranslation" (
    "articleId" INTEGER NOT NULL,
    "langKey" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "ArticleTranslation_pkey" PRIMARY KEY ("articleId","langKey")
);

-- CreateTable
CREATE TABLE "public"."Config" (
    "id" TEXT NOT NULL,
    "key" VARCHAR(50) NOT NULL,
    "value" VARCHAR(50) NOT NULL,
    "system" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ConfigTranslation" (
    "configId" TEXT NOT NULL,
    "langKey" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "remark" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ConfigTranslation_pkey" PRIMARY KEY ("configId","langKey")
);

-- CreateTable
CREATE TABLE "public"."DictType" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 10,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DictType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DictTypeTranslation" (
    "dictTypeId" TEXT NOT NULL,
    "langKey" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "remark" TEXT,

    CONSTRAINT "DictTypeTranslation_pkey" PRIMARY KEY ("dictTypeId","langKey")
);

-- CreateTable
CREATE TABLE "public"."Dict" (
    "id" TEXT NOT NULL,
    "value" VARCHAR(50) NOT NULL,
    "dictTypeId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 10,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dict_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DictTranslation" (
    "dictId" TEXT NOT NULL,
    "langKey" TEXT NOT NULL,
    "label" VARCHAR(50) NOT NULL,
    "remark" TEXT,

    CONSTRAINT "DictTranslation_pkey" PRIMARY KEY ("dictId","langKey")
);

-- CreateTable
CREATE TABLE "public"."Language" (
    "key" VARCHAR(30) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "orientation" "public"."LanguageOrientation" NOT NULL DEFAULT 'LTR',
    "status" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 10,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."AdminUser" (
    "id" TEXT NOT NULL,
    "userName" VARCHAR(20) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "super" BOOLEAN NOT NULL DEFAULT false,
    "tokenVersion" INTEGER NOT NULL DEFAULT 0,
    "lastLoginTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WebUser" (
    "id" TEXT NOT NULL,
    "userName" VARCHAR(20) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "tokenVersion" INTEGER NOT NULL DEFAULT 0,
    "lastLoginTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SystemSetting" (
    "id" TEXT NOT NULL,
    "key" VARCHAR(20) NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AdminUserRole" (
    "adminUserId" TEXT NOT NULL,
    "adminRoleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUserRole_pkey" PRIMARY KEY ("adminUserId","adminRoleId")
);

-- CreateTable
CREATE TABLE "public"."AdminRole" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 100,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AdminRoleTranslation" (
    "adminRoleId" TEXT NOT NULL,
    "langKey" TEXT NOT NULL,
    "roleName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminRoleTranslation_pkey" PRIMARY KEY ("adminRoleId","langKey")
);

-- CreateTable
CREATE TABLE "public"."AdminRoute" (
    "id" TEXT NOT NULL,
    "icon" VARCHAR(20) NOT NULL DEFAULT '',
    "redirect" VARCHAR(50) NOT NULL DEFAULT '',
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "component" VARCHAR(100) NOT NULL DEFAULT '',
    "type" "public"."RouteType" NOT NULL DEFAULT 'GROUP',
    "key" VARCHAR(20) NOT NULL DEFAULT '',
    "status" BOOLEAN NOT NULL DEFAULT true,
    "path" VARCHAR(100) NOT NULL,
    "parentId" VARCHAR(30) NOT NULL DEFAULT '0',
    "order" INTEGER NOT NULL DEFAULT 100,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminRoute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AdminRouteTranslation" (
    "routeId" TEXT NOT NULL,
    "langKey" TEXT NOT NULL,
    "routeName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminRouteTranslation_pkey" PRIMARY KEY ("routeId","langKey")
);

-- CreateTable
CREATE TABLE "public"."AdminRoleRoute" (
    "roleId" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminRoleRoute_pkey" PRIMARY KEY ("roleId","routeId")
);

-- CreateTable
CREATE TABLE "public"."AdminPermissionGroup" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 100,
    "controllerName" VARCHAR(100),
    "source" "public"."AdminPermissionSource" NOT NULL DEFAULT 'EXTERNAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminPermissionGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AdminPermissionGroupTranslation" (
    "groupId" TEXT NOT NULL,
    "langKey" TEXT NOT NULL,
    "groupName" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminPermissionGroupTranslation_pkey" PRIMARY KEY ("groupId","langKey")
);

-- CreateTable
CREATE TABLE "public"."AdminPermission" (
    "id" TEXT NOT NULL,
    "key" VARCHAR(100) NOT NULL,
    "path" VARCHAR(100),
    "groupId" TEXT,
    "method" "public"."RequestMethod" DEFAULT 'GET',
    "source" "public"."AdminPermissionSource" NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 100,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AdminPermissionTranslation" (
    "permissionId" TEXT NOT NULL,
    "langKey" TEXT NOT NULL,
    "permissionName" VARCHAR(50) NOT NULL,
    "remark" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminPermissionTranslation_pkey" PRIMARY KEY ("permissionId","langKey")
);

-- CreateTable
CREATE TABLE "public"."AdminRoutePermission" (
    "routeId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "AdminRoutePermission_pkey" PRIMARY KEY ("routeId","permissionId")
);

-- CreateTable
CREATE TABLE "public"."UploadFileGroup" (
    "id" TEXT NOT NULL,
    "groupName" VARCHAR(50) NOT NULL,
    "parentId" TEXT NOT NULL DEFAULT '0',
    "order" INTEGER NOT NULL DEFAULT 10,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UploadFileGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UploadFileGroupPath" (
    "ancestorId" TEXT NOT NULL,
    "descendantId" TEXT NOT NULL,
    "depth" INTEGER NOT NULL,

    CONSTRAINT "UploadFileGroupPath_pkey" PRIMARY KEY ("ancestorId","descendantId")
);

-- CreateTable
CREATE TABLE "public"."FileStorage" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "type" "public"."StorageType" NOT NULL,
    "status" "public"."FileStorageStatus" NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 10,
    "hostname" VARCHAR(100) NOT NULL,
    "accessKey" VARCHAR(50),
    "secretKey" VARCHAR(50),
    "endpoint" VARCHAR(50),
    "bucket" VARCHAR(50),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FileStorage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UploadFile" (
    "id" TEXT NOT NULL,
    "channel" "public"."UploadFileChannel" NOT NULL,
    "fileName" VARCHAR(50) NOT NULL,
    "filePath" VARCHAR(200) NOT NULL,
    "fileExt" VARCHAR(10) NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "status" "public"."FileStatus" NOT NULL,
    "mime" VARCHAR(50) NOT NULL,
    "originalName" VARCHAR(255) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 10,
    "groupId" TEXT NOT NULL DEFAULT '0',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "uploaderId" TEXT NOT NULL,
    "fileStorageId" TEXT NOT NULL,

    CONSTRAINT "UploadFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArticleTranslation_title_key" ON "public"."ArticleTranslation"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Config_key_key" ON "public"."Config"("key");

-- CreateIndex
CREATE UNIQUE INDEX "DictType_key_key" ON "public"."DictType"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Language_key_key" ON "public"."Language"("key");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_userName_key" ON "public"."AdminUser"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "WebUser_userName_key" ON "public"."WebUser"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "SystemSetting_key_key" ON "public"."SystemSetting"("key");

-- CreateIndex
CREATE UNIQUE INDEX "AdminRoute_path_key" ON "public"."AdminRoute"("path");

-- CreateIndex
CREATE UNIQUE INDEX "AdminPermissionGroup_controllerName_key" ON "public"."AdminPermissionGroup"("controllerName");

-- CreateIndex
CREATE UNIQUE INDEX "AdminPermission_path_method_key" ON "public"."AdminPermission"("path", "method");

-- CreateIndex
CREATE UNIQUE INDEX "AdminPermission_key_key" ON "public"."AdminPermission"("key");

-- CreateIndex
CREATE UNIQUE INDEX "UploadFileGroup_groupName_parentId_key" ON "public"."UploadFileGroup"("groupName", "parentId");

-- CreateIndex
CREATE UNIQUE INDEX "UploadFile_originalName_groupId_fileStorageId_key" ON "public"."UploadFile"("originalName", "groupId", "fileStorageId");

-- AddForeignKey
ALTER TABLE "public"."ArticleCategoryTranslation" ADD CONSTRAINT "ArticleCategoryTranslation_articleCategoryId_fkey" FOREIGN KEY ("articleCategoryId") REFERENCES "public"."ArticleCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ArticleCategoryTranslation" ADD CONSTRAINT "ArticleCategoryTranslation_langKey_fkey" FOREIGN KEY ("langKey") REFERENCES "public"."Language"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Article" ADD CONSTRAINT "Article_articleCategoryId_fkey" FOREIGN KEY ("articleCategoryId") REFERENCES "public"."ArticleCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ArticleTranslation" ADD CONSTRAINT "ArticleTranslation_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "public"."Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ArticleTranslation" ADD CONSTRAINT "ArticleTranslation_langKey_fkey" FOREIGN KEY ("langKey") REFERENCES "public"."Language"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ConfigTranslation" ADD CONSTRAINT "ConfigTranslation_configId_fkey" FOREIGN KEY ("configId") REFERENCES "public"."Config"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ConfigTranslation" ADD CONSTRAINT "ConfigTranslation_langKey_fkey" FOREIGN KEY ("langKey") REFERENCES "public"."Language"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DictTypeTranslation" ADD CONSTRAINT "DictTypeTranslation_dictTypeId_fkey" FOREIGN KEY ("dictTypeId") REFERENCES "public"."DictType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DictTypeTranslation" ADD CONSTRAINT "DictTypeTranslation_langKey_fkey" FOREIGN KEY ("langKey") REFERENCES "public"."Language"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Dict" ADD CONSTRAINT "Dict_dictTypeId_fkey" FOREIGN KEY ("dictTypeId") REFERENCES "public"."DictType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DictTranslation" ADD CONSTRAINT "DictTranslation_dictId_fkey" FOREIGN KEY ("dictId") REFERENCES "public"."Dict"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DictTranslation" ADD CONSTRAINT "DictTranslation_langKey_fkey" FOREIGN KEY ("langKey") REFERENCES "public"."Language"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdminUserRole" ADD CONSTRAINT "AdminUserRole_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "public"."AdminUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdminUserRole" ADD CONSTRAINT "AdminUserRole_adminRoleId_fkey" FOREIGN KEY ("adminRoleId") REFERENCES "public"."AdminRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdminRoleTranslation" ADD CONSTRAINT "AdminRoleTranslation_adminRoleId_fkey" FOREIGN KEY ("adminRoleId") REFERENCES "public"."AdminRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdminRoleTranslation" ADD CONSTRAINT "AdminRoleTranslation_langKey_fkey" FOREIGN KEY ("langKey") REFERENCES "public"."Language"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdminRouteTranslation" ADD CONSTRAINT "AdminRouteTranslation_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "public"."AdminRoute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdminRouteTranslation" ADD CONSTRAINT "AdminRouteTranslation_langKey_fkey" FOREIGN KEY ("langKey") REFERENCES "public"."Language"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdminRoleRoute" ADD CONSTRAINT "AdminRoleRoute_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."AdminRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdminRoleRoute" ADD CONSTRAINT "AdminRoleRoute_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "public"."AdminRoute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdminPermissionGroupTranslation" ADD CONSTRAINT "AdminPermissionGroupTranslation_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."AdminPermissionGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdminPermissionGroupTranslation" ADD CONSTRAINT "AdminPermissionGroupTranslation_langKey_fkey" FOREIGN KEY ("langKey") REFERENCES "public"."Language"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdminPermission" ADD CONSTRAINT "AdminPermission_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."AdminPermissionGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdminPermissionTranslation" ADD CONSTRAINT "AdminPermissionTranslation_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "public"."AdminPermission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdminPermissionTranslation" ADD CONSTRAINT "AdminPermissionTranslation_langKey_fkey" FOREIGN KEY ("langKey") REFERENCES "public"."Language"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdminRoutePermission" ADD CONSTRAINT "AdminRoutePermission_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "public"."AdminRoute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AdminRoutePermission" ADD CONSTRAINT "AdminRoutePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "public"."AdminPermission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UploadFileGroupPath" ADD CONSTRAINT "UploadFileGroupPath_ancestorId_fkey" FOREIGN KEY ("ancestorId") REFERENCES "public"."UploadFileGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UploadFileGroupPath" ADD CONSTRAINT "UploadFileGroupPath_descendantId_fkey" FOREIGN KEY ("descendantId") REFERENCES "public"."UploadFileGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UploadFile" ADD CONSTRAINT "UploadFile_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "public"."AdminUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UploadFile" ADD CONSTRAINT "UploadFile_fileStorageId_fkey" FOREIGN KEY ("fileStorageId") REFERENCES "public"."FileStorage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
