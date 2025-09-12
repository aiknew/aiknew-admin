export interface paths {
    "/admin/permission": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["PermissionController_pagination"];
        put?: never;
        post: operations["PermissionController_createOne"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/permission/all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["PermissionController_getAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/permission/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["PermissionController_deleteOne"];
        options?: never;
        head?: never;
        patch: operations["PermissionController_updateOne"];
        trace?: never;
    };
    "/admin/admin-user": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AdminUserController_pagination"];
        put?: never;
        post: operations["AdminUserController_createOne"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/admin-user/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["AdminUserController_deleteOne"];
        options?: never;
        head?: never;
        patch: operations["AdminUserController_updateOne"];
        trace?: never;
    };
    "/admin/permission-group": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["PermissionGroupController_getAll"];
        put?: never;
        post: operations["PermissionGroupController_createOne"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/permission-group/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["PermissionGroupController_deleteOne"];
        options?: never;
        head?: never;
        patch: operations["PermissionGroupController_updateOne"];
        trace?: never;
    };
    "/admin/article": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ArticleController_pagination"];
        put?: never;
        post: operations["ArticleController_createOne"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/article/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ArticleController_detail"];
        put?: never;
        post?: never;
        delete: operations["ArticleController_deleteOne"];
        options?: never;
        head?: never;
        patch: operations["ArticleController_updateOne"];
        trace?: never;
    };
    "/admin/language": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["LanguageController_pagination"];
        put?: never;
        post: operations["LanguageController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/language/enabled": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["LanguageController_enabled"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/language/{key}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["LanguageController_remove"];
        options?: never;
        head?: never;
        patch: operations["LanguageController_update"];
        trace?: never;
    };
    "/admin/system-setting/{key}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["SystemSettingController_getSetting"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/system-setting": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put: operations["SystemSettingController_setSetting"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthController_login"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/auth/captcha": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AuthController_captcha"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/auth/info": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AuthController_info"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/auth/update": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations["AuthController_updateUserInfo"];
        trace?: never;
    };
    "/admin/auth-role": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AuthRoleController_pagination"];
        put?: never;
        post: operations["AuthRoleController_createOne"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/auth-role/all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AuthRoleController_getAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/auth-role/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["AuthRoleController_deleteOne"];
        options?: never;
        head?: never;
        patch: operations["AuthRoleController_updateOne"];
        trace?: never;
    };
    "/admin/auth-route/all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AuthRouteController_getAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/auth-route": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthRouteController_createOne"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/auth-route/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["AuthRouteController_deleteOne"];
        options?: never;
        head?: never;
        patch: operations["AuthRouteController_updateOne"];
        trace?: never;
    };
    "/admin/upload-file/filesAndGroups": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UploadFileController_filesAndGroups"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/upload-file": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["UploadFileController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/upload-file/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["UploadFileController_deleteFile"];
        options?: never;
        head?: never;
        patch: operations["UploadFileController_update"];
        trace?: never;
    };
    "/admin/upload-file-group/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get all children group by parent group id */
        get: operations["UploadFileGroupController_findChildren"];
        put?: never;
        post?: never;
        delete: operations["UploadFileGroupController_deleteGroup"];
        options?: never;
        head?: never;
        patch: operations["UploadFileGroupController_update"];
        trace?: never;
    };
    "/admin/upload-file-group": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["UploadFileGroupController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/file-storage": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["FileStorageController_pagination"];
        put?: never;
        post: operations["FileStorageController_createOne"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/file-storage/all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["FileStorageController_getAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/file-storage/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["FileStorageController_deleteOne"];
        options?: never;
        head?: never;
        patch: operations["FileStorageController_updateOne"];
        trace?: never;
    };
    "/admin/s3/webhook/{storageId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** S3 webhook */
        post: operations["S3Controller_s3WebhookPost"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/s3/presigned": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** S3 presigned url */
        get: operations["S3Controller_uploadToS3"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/article-category/all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get all article categories */
        get: operations["ArticleCategoryController_getAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/article-category": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create article category */
        post: operations["ArticleCategoryController_createOne"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/article-category/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Delete Article Category */
        delete: operations["ArticleCategoryController_deleteOne"];
        options?: never;
        head?: never;
        /** Update Article Category */
        patch: operations["ArticleCategoryController_updateOne"];
        trace?: never;
    };
    "/admin/dict-type": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["DictTypeController_pagination"];
        put?: never;
        post: operations["DictTypeController_createOne"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/dict-type/all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["DictTypeController_getAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/dict-type/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["DictTypeController_deleteOne"];
        options?: never;
        head?: never;
        patch: operations["DictTypeController_updateOne"];
        trace?: never;
    };
    "/admin/dict": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["DictController_pagination"];
        put?: never;
        post: operations["DictController_createOne"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/dict/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["DictController_deleteOne"];
        options?: never;
        head?: never;
        patch: operations["DictController_updateOne"];
        trace?: never;
    };
    "/admin/config": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ConfigController_pagination"];
        put?: never;
        post: operations["ConfigController_createOne"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/config/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["ConfigController_deleteOne"];
        options?: never;
        head?: never;
        patch: operations["ConfigController_updateOne"];
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** @enum {number} */
        ResponseStatusCode: -1 | 0 | 401 | 403 | 400;
        ResponseJson: {
            code: components["schemas"]["ResponseStatusCode"];
            data: Record<string, never>;
            msg: string;
        };
        PermissionGroupTranslationDto: {
            langKey: string;
            groupName: string;
        };
        PermissionGroupDto: {
            id: string;
            order: number;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
            translations: components["schemas"]["PermissionGroupTranslationDto"][];
        };
        /** @enum {string} */
        RequestMethod: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "ALL" | "OPTIONS" | "HEAD" | "SEARCH" | "PROPFIND" | "PROPPATCH" | "MKCOL" | "COPY" | "MOVE" | "LOCK" | "UNLOCK";
        /** @enum {string} */
        AdminPermissionSource: "BUILT_IN" | "EXTERNAL";
        PermissionTranslationDto: {
            langKey: string;
            permissionName: string;
            remark?: string | null;
        };
        PermissionDto: {
            method: components["schemas"]["RequestMethod"] | null;
            source: components["schemas"]["AdminPermissionSource"];
            id: string;
            path: string | null;
            key: string;
            groupId: string | null;
            order: number;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
            translations: components["schemas"]["PermissionTranslationDto"][];
        };
        PermissionsAndGroupsDto: {
            total: number;
            current: number;
            pageSize: number;
            groupList: components["schemas"]["PermissionGroupDto"][];
            permissionList: components["schemas"]["PermissionDto"][];
        };
        CreatePermissionDto: {
            method?: components["schemas"]["RequestMethod"] | null;
            path?: string | null;
            key: string;
            groupId?: string | null;
            order: number;
            translations: components["schemas"]["PermissionTranslationDto"][];
        };
        UpdatePermissionDto: {
            method?: components["schemas"]["RequestMethod"] | null;
            path?: string | null;
            key?: string;
            groupId?: string | null;
            order?: number;
            translations?: components["schemas"]["PermissionTranslationDto"][];
        };
        PaginationResponseDto: {
            current: number;
            pageSize: number;
            total: number;
            list: Record<string, never>;
        };
        AdminUserDto: {
            id: string;
            userName: string;
            /** Format: date-time */
            lastLoginTime: string;
            roles: string[];
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        CreateAdminUserDto: {
            userName: string;
            roles?: string[];
            password: string;
        };
        UpdateAdminUserDto: {
            userName?: string;
            roles?: string[];
            password?: string;
        };
        CreatePermissionGroupDto: {
            order?: number;
            translations: components["schemas"]["PermissionGroupTranslationDto"][];
        };
        UpdatePermissionGroupDto: {
            order?: number;
            translations?: components["schemas"]["PermissionGroupTranslationDto"][];
        };
        ArticleTranslationDto: {
            langKey: string;
            title: string;
            content: string;
        };
        ArticleDto: {
            id: number;
            order: number;
            status: boolean;
            realViewCount: number;
            fakeViewCount: number;
            articleCategoryId: number;
            translations: components["schemas"]["ArticleTranslationDto"][];
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        CreateArticleDto: {
            order: number;
            status: boolean;
            fakeViewCount: number;
            articleCategoryId: number;
            translations: components["schemas"]["ArticleTranslationDto"][];
        };
        UpdateArticleDto: {
            order?: number;
            status?: boolean;
            fakeViewCount?: number;
            articleCategoryId?: number;
            translations?: components["schemas"]["ArticleTranslationDto"][];
        };
        /** @enum {string} */
        LanguageOrientation: "LTR" | "RTL";
        LanguageItemDto: {
            orientation: components["schemas"]["LanguageOrientation"];
            name: string;
            key: string;
            status: boolean;
            order: number;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        CreateLanguageDto: {
            /** @enum {string} */
            orientation?: "LTR" | "RTL";
            name: string;
            key: string;
            status?: boolean;
            order?: number;
        };
        UpdateLanguageDto: {
            /** @enum {string} */
            orientation?: "LTR" | "RTL";
            name?: string;
            key?: string;
            status?: boolean;
            order?: number;
        };
        LanguageSettingDto: {
            /** @default true */
            enableMultilingual: boolean;
            /** @default en */
            mainLanguage: string;
        };
        StorageSettingDto: {
            currentStorage: string;
        };
        SystemSettingDto: {
            LANGUAGE?: components["schemas"]["LanguageSettingDto"];
            STORAGE?: components["schemas"]["StorageSettingDto"];
        };
        /** @enum {string} */
        SystemSettingKey: "LANGUAGE" | "STORAGE";
        /** @enum {string} */
        RouteType: "GROUP" | "SMALL_GROUP" | "MENU" | "BUTTON";
        AuthRouteTranslationDto: {
            langKey: string;
            routeName: string;
        };
        UserInfoRoutesDto: {
            type: components["schemas"]["RouteType"];
            id: string;
            icon: string;
            redirect: string;
            hidden: boolean;
            component: string;
            key: string;
            status: boolean;
            path: string;
            parentId: string;
            order: number;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
            translations: components["schemas"]["AuthRouteTranslationDto"][];
        };
        UserInfoDto: {
            routes: components["schemas"]["UserInfoRoutesDto"][];
            id: string;
            userName: string;
            /** Format: date-time */
            lastLoginTime: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        LoginSuccessDto: {
            userInfo: components["schemas"]["UserInfoDto"];
            access_token: string;
        };
        LoginBodyDto: {
            userName: string;
            password: string;
            captchaKey: string;
            captchaCode: string;
        };
        CaptchaDto: {
            key: string;
            captcha: string;
        };
        UpdateUserInfoDto: {
            password: string;
            newPassword: string;
        };
        AuthRoleTranslationDto: {
            langKey: string;
            roleName: string;
        };
        AuthRoleDto: {
            id: string;
            order: number;
            translations: components["schemas"]["AuthRoleTranslationDto"][];
            routes: string[];
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        CreateAuthRoleDto: {
            routes: string[];
            order: number;
            translations: components["schemas"]["AuthRoleTranslationDto"][];
        };
        UpdateAuthRoleDto: {
            routes?: string[];
            order?: number;
            translations?: components["schemas"]["AuthRoleTranslationDto"][];
        };
        AuthRouteDto: {
            type: components["schemas"]["RouteType"];
            id: string;
            icon: string;
            redirect: string;
            hidden: boolean;
            component: string;
            key: string;
            status: boolean;
            path: string;
            parentId: string;
            order: number;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
            permissions: string[];
            translations: components["schemas"]["AuthRouteTranslationDto"][];
        };
        CreateAuthRouteDto: {
            type: components["schemas"]["RouteType"];
            permissions?: string[];
            icon?: string;
            redirect?: string;
            hidden: boolean;
            component: string;
            key: string;
            status: boolean;
            path: string;
            parentId: string;
            order: number;
            translations: components["schemas"]["AuthRouteTranslationDto"][];
        };
        UpdateAuthRouteDto: {
            type?: components["schemas"]["RouteType"];
            permissions?: string[];
            icon?: string;
            redirect?: string;
            hidden?: boolean;
            component?: string;
            key?: string;
            status?: boolean;
            path?: string;
            parentId?: string;
            order?: number;
            translations?: components["schemas"]["AuthRouteTranslationDto"][];
        };
        UploadFileGroupPathDto: {
            ancestorId: string;
            descendantId: string;
            depth: number;
            ancestor: {
                groupName: string;
            };
        };
        UploadFileGroupDto: {
            id: string;
            groupName: string;
            parentId: string;
            order: number;
            ancestors: components["schemas"]["UploadFileGroupPathDto"][];
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        /** @enum {string} */
        UploadFileChannel: "ADMIN" | "WEB" | "S3_CONSOLE";
        /** @enum {string} */
        FileStatus: "NORMAL" | "MISSING";
        /** @enum {string} */
        StorageType: "LOCAL" | "S3";
        /** @enum {string} */
        FileStorageStatus: "NORMAL" | "DISABLED" | "DISABLED_UPLOAD";
        CorrespondingFileStorage: {
            type: components["schemas"]["StorageType"];
            status: components["schemas"]["FileStorageStatus"];
            createdAt: string;
            updatedAt: string;
            hostname: string;
            name: string;
            bucket: string | null;
        };
        UploadFileDto: {
            channel: components["schemas"]["UploadFileChannel"];
            status: components["schemas"]["FileStatus"];
            createdAt: string;
            updatedAt: string;
            id: string;
            fileName: string;
            filePath: string;
            fileExt: string;
            fileSize: number;
            groupId: string;
            mime: string;
            originalName: string;
            uploaderId: string;
            uploader: {
                userName: string;
            };
            storage: components["schemas"]["CorrespondingFileStorage"];
            order: number;
        };
        UploadFilesAndGroupsDto: {
            total: number;
            current: number;
            pageSize: number;
            groupList: components["schemas"]["UploadFileGroupDto"][];
            fileList: components["schemas"]["UploadFileDto"][];
        };
        CreateUploadFileDto: {
            groupId?: string;
            fileStorageId: string;
        };
        UpdateUploadFileDto: {
            groupId?: string;
            originalName?: string;
            order?: number;
        };
        CreateUploadFileGroupDto: {
            groupName: string;
            parentId: string;
            order: number;
        };
        UpdateUploadFileGroupDto: {
            groupName?: string;
            parentId?: string;
            order?: number;
        };
        FileStorageDto: {
            status: components["schemas"]["FileStorageStatus"];
            type: components["schemas"]["StorageType"];
            id: string;
            name: string;
            hostname: string;
            priority: number;
            accessKey: string | null;
            secretKey: string | null;
            endpoint: string | null;
            bucket: string | null;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        OmitTypeClass: {
            status: components["schemas"]["FileStorageStatus"];
            type: components["schemas"]["StorageType"];
            id: string;
            name: string;
            hostname: string;
            priority: number;
            endpoint: string | null;
            bucket: string | null;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        CreateFileStorageDto: {
            /** @default NORMAL */
            status: components["schemas"]["FileStorageStatus"];
            type: components["schemas"]["StorageType"];
            name: string;
            hostname: string;
            /** @default 10 */
            priority: number;
            accessKey?: string;
            secretKey?: string;
            endpoint?: string;
            bucket?: string;
        };
        UpdateFileStorageDto: {
            /** @default NORMAL */
            status: components["schemas"]["FileStorageStatus"];
            type?: components["schemas"]["StorageType"];
            name?: string;
            hostname?: string;
            /** @default 10 */
            priority: number;
            accessKey?: string;
            secretKey?: string;
            endpoint?: string;
            bucket?: string;
        };
        PresignedDataDto: {
            url: string;
            fields: Record<string, never>;
        };
        ArticleCategoryTranslationDto: {
            langKey: string;
            name: string;
        };
        ArticleCategoryDto: {
            id: number;
            order: number;
            status: boolean;
            parentId: number;
            translations: components["schemas"]["ArticleCategoryTranslationDto"][];
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        CreateArticleCategoryDto: {
            status?: boolean;
            order?: number;
            parentId: number;
            translations: components["schemas"]["ArticleCategoryTranslationDto"][];
        };
        UpdateArticleCategoryDto: {
            status?: boolean;
            order?: number;
            parentId?: number;
            translations?: components["schemas"]["ArticleCategoryTranslationDto"][];
        };
        DictTypeTranslationDto: {
            langKey: string;
            name: string;
            /** @default  */
            remark: string;
        };
        DictTypeDto: {
            id: string;
            key: string;
            order: number;
            status: boolean;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
            translations: components["schemas"]["DictTypeTranslationDto"][];
        };
        CreateDictTypeDto: {
            key: string;
            order?: number;
            /** @default true */
            status: boolean;
            translations: components["schemas"]["DictTypeTranslationDto"][];
        };
        UpdateDictTypeDto: {
            order?: number;
            /** @default true */
            status: boolean;
            translations?: components["schemas"]["DictTypeTranslationDto"][];
        };
        DictTranslationDto: {
            langKey: string;
            label: string;
            /** @default  */
            remark: string;
        };
        DictDto: {
            id: string;
            value: string;
            dictTypeId: string;
            order: number;
            status: boolean;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
            translations: components["schemas"]["DictTranslationDto"][];
        };
        CreateDictDto: {
            value: string;
            dictTypeId: string;
            order?: number;
            /** @default true */
            status: boolean;
            translations: components["schemas"]["DictTranslationDto"][];
        };
        UpdateDictDto: {
            value?: string;
            dictTypeId?: string;
            order?: number;
            /** @default true */
            status: boolean;
            translations?: components["schemas"]["DictTranslationDto"][];
        };
        ConfigTranslationDto: {
            langKey: string;
            name: string;
            /** @default  */
            remark: string;
        };
        ConfigDto: {
            id: string;
            key: string;
            value: string;
            system: boolean;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
            translations: components["schemas"]["ConfigTranslationDto"][];
        };
        CreateConfigDto: {
            key: string;
            value: string;
            translations: components["schemas"]["ConfigTranslationDto"][];
        };
        UpdateConfigDto: {
            key?: string;
            value?: string;
            translations?: components["schemas"]["ConfigTranslationDto"][];
        };
        PaginationDto: {
            currentPage: number;
            pageSize: number;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    PermissionController_pagination: {
        parameters: {
            query: {
                currentPage: number;
                pageSize: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["PermissionsAndGroupsDto"];
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    PermissionController_createOne: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreatePermissionDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    PermissionController_getAll: {
        parameters: {
            query?: {
                groupId?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["PermissionDto"][];
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    PermissionController_deleteOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    PermissionController_updateOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdatePermissionDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    AdminUserController_pagination: {
        parameters: {
            query: {
                currentPage: number;
                pageSize: number;
                userName?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["PaginationResponseDto"] & {
                            list: components["schemas"]["AdminUserDto"][];
                        };
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    AdminUserController_createOne: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateAdminUserDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    AdminUserController_deleteOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    AdminUserController_updateOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateAdminUserDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    PermissionGroupController_getAll: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["PermissionGroupDto"][];
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    PermissionGroupController_createOne: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreatePermissionGroupDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    PermissionGroupController_deleteOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    PermissionGroupController_updateOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdatePermissionGroupDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    ArticleController_pagination: {
        parameters: {
            query: {
                currentPage: number;
                pageSize: number;
                title?: string;
                content?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["PaginationResponseDto"] & {
                            list: components["schemas"]["ArticleDto"][];
                        };
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    ArticleController_createOne: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateArticleDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    ArticleController_detail: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["ArticleDto"];
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    ArticleController_deleteOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    ArticleController_updateOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateArticleDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    LanguageController_pagination: {
        parameters: {
            query: {
                currentPage: number;
                pageSize: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["PaginationResponseDto"] & {
                            list: components["schemas"]["LanguageItemDto"][];
                        };
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    LanguageController_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateLanguageDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    LanguageController_enabled: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["LanguageItemDto"][];
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    LanguageController_remove: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                key: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    LanguageController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                key: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateLanguageDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    SystemSettingController_getSetting: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                key: components["schemas"]["SystemSettingKey"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["SystemSettingDto"];
                    };
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    SystemSettingController_setSetting: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SystemSettingDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    AuthController_login: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LoginBodyDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["LoginSuccessDto"];
                    };
                };
            };
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    AuthController_captcha: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["CaptchaDto"];
                    };
                };
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    AuthController_info: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["UserInfoDto"];
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    AuthController_updateUserInfo: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateUserInfoDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    AuthRoleController_pagination: {
        parameters: {
            query: {
                currentPage: number;
                pageSize: number;
                name?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["PaginationResponseDto"] & {
                            list: components["schemas"]["AuthRoleDto"][];
                        };
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    AuthRoleController_createOne: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateAuthRoleDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    AuthRoleController_getAll: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["AuthRoleDto"][];
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    AuthRoleController_deleteOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    AuthRoleController_updateOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateAuthRoleDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    AuthRouteController_getAll: {
        parameters: {
            query?: {
                type?: components["schemas"]["RouteType"];
                name?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["AuthRouteDto"][];
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    AuthRouteController_createOne: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateAuthRouteDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    AuthRouteController_deleteOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    AuthRouteController_updateOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateAuthRouteDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    UploadFileController_filesAndGroups: {
        parameters: {
            query: {
                currentPage: number;
                pageSize: number;
                parentId?: string;
                keyword?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["UploadFilesAndGroupsDto"];
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    UploadFileController_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateUploadFileDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    UploadFileController_deleteFile: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    UploadFileController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateUploadFileDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    UploadFileGroupController_findChildren: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["UploadFileGroupDto"][];
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    UploadFileGroupController_deleteGroup: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    UploadFileGroupController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateUploadFileGroupDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    UploadFileGroupController_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateUploadFileGroupDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    FileStorageController_pagination: {
        parameters: {
            query: {
                currentPage: number;
                pageSize: number;
                status?: components["schemas"]["FileStorageStatus"];
                type?: components["schemas"]["StorageType"];
                name?: string;
                hostname?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["PaginationResponseDto"] & {
                            list: components["schemas"]["FileStorageDto"][];
                        };
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    FileStorageController_createOne: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateFileStorageDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    FileStorageController_getAll: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["OmitTypeClass"][];
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    FileStorageController_deleteOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    FileStorageController_updateOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateFileStorageDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    S3Controller_s3WebhookPost: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                storageId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    S3Controller_uploadToS3: {
        parameters: {
            query: {
                groupId: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["PresignedDataDto"];
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    ArticleCategoryController_getAll: {
        parameters: {
            query?: {
                name?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["ArticleCategoryDto"][];
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    ArticleCategoryController_createOne: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateArticleCategoryDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    ArticleCategoryController_deleteOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    ArticleCategoryController_updateOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateArticleCategoryDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    DictTypeController_pagination: {
        parameters: {
            query: {
                currentPage: number;
                pageSize: number;
                key?: string;
                name?: string;
                remark?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["PaginationResponseDto"] & {
                            list: components["schemas"]["DictTypeDto"][];
                        };
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    DictTypeController_createOne: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateDictTypeDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    DictTypeController_getAll: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["DictTypeDto"][];
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    DictTypeController_deleteOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    DictTypeController_updateOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateDictTypeDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    DictController_pagination: {
        parameters: {
            query: {
                currentPage: number;
                pageSize: number;
                dictTypeId: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["PaginationResponseDto"] & {
                            list: components["schemas"]["DictDto"][];
                        };
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    DictController_createOne: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateDictDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    DictController_deleteOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    DictController_updateOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateDictDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    ConfigController_pagination: {
        parameters: {
            query: {
                currentPage: number;
                pageSize: number;
                key?: string;
                value?: string;
                name?: string;
                remark?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"] & {
                        data: components["schemas"]["PaginationResponseDto"] & {
                            list: components["schemas"]["ConfigDto"][];
                        };
                    };
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    ConfigController_createOne: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateConfigDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    ConfigController_deleteOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
    ConfigController_updateOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateConfigDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ResponseJson"];
                };
            };
        };
    };
}
type ReadonlyArray<T> = [
    Exclude<T, undefined>
] extends [
    unknown[]
] ? Readonly<Exclude<T, undefined>> : Readonly<Exclude<T, undefined>[]>;
export const responseStatusCodeValues: ReadonlyArray<components["schemas"]["ResponseStatusCode"]> = [-1, 0, 401, 403, 400];
export const requestMethodValues: ReadonlyArray<components["schemas"]["RequestMethod"]> = ["GET", "POST", "PUT", "DELETE", "PATCH", "ALL", "OPTIONS", "HEAD", "SEARCH", "PROPFIND", "PROPPATCH", "MKCOL", "COPY", "MOVE", "LOCK", "UNLOCK"];
export const adminPermissionSourceValues: ReadonlyArray<components["schemas"]["AdminPermissionSource"]> = ["BUILT_IN", "EXTERNAL"];
export const languageOrientationValues: ReadonlyArray<components["schemas"]["LanguageOrientation"]> = ["LTR", "RTL"];
export const createLanguageDtoOrientationValues: ReadonlyArray<components["schemas"]["CreateLanguageDto"]["orientation"]> = ["LTR", "RTL"];
export const updateLanguageDtoOrientationValues: ReadonlyArray<components["schemas"]["UpdateLanguageDto"]["orientation"]> = ["LTR", "RTL"];
export const systemSettingKeyValues: ReadonlyArray<components["schemas"]["SystemSettingKey"]> = ["LANGUAGE", "STORAGE"];
export const routeTypeValues: ReadonlyArray<components["schemas"]["RouteType"]> = ["GROUP", "SMALL_GROUP", "MENU", "BUTTON"];
export const uploadFileChannelValues: ReadonlyArray<components["schemas"]["UploadFileChannel"]> = ["ADMIN", "WEB", "S3_CONSOLE"];
export const fileStatusValues: ReadonlyArray<components["schemas"]["FileStatus"]> = ["NORMAL", "MISSING"];
export const storageTypeValues: ReadonlyArray<components["schemas"]["StorageType"]> = ["LOCAL", "S3"];
export const fileStorageStatusValues: ReadonlyArray<components["schemas"]["FileStorageStatus"]> = ["NORMAL", "DISABLED", "DISABLED_UPLOAD"];
