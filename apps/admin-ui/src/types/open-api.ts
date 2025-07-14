export interface paths {
    "/admin/admin-api": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AdminApiController_pagination"];
        put?: never;
        post: operations["AdminApiController_createOne"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/admin-api/ancestors": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AdminApiController_findAllAncestors"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/admin-api/{id}/children": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AdminApiController_getChildren"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/admin-api/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["AdminApiController_deleteOne"];
        options?: never;
        head?: never;
        patch: operations["AdminApiController_updateOne"];
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
    "/admin/admin-auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AdminAuthController_login"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/admin-auth/captcha": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AdminAuthController_captcha"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/admin-auth/info": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AdminAuthController_info"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/admin-auth/update": {
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
        patch: operations["AdminAuthController_updateUserInfo"];
        trace?: never;
    };
    "/admin/admin-role": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AdminRoleController_pagination"];
        put?: never;
        post: operations["AdminRoleController_createOne"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/admin-role/all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AdminRoleController_getAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/admin-role/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["AdminRoleController_deleteOne"];
        options?: never;
        head?: never;
        patch: operations["AdminRoleController_updateOne"];
        trace?: never;
    };
    "/admin/admin-route": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AdminRouteController_pagination"];
        put?: never;
        post: operations["AdminRouteController_createOne"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/admin-route/ancestors": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AdminRouteController_findAllAncestors"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/admin-route/{id}/children": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AdminRouteController_getChildren"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/admin-route/all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AdminRouteController_getAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/admin-route/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["AdminRouteController_deleteOne"];
        options?: never;
        head?: never;
        patch: operations["AdminRouteController_updateOne"];
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
    "/admin/article-category": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ArticleCategoryController_pagination"];
        put?: never;
        post: operations["ArticleCategoryController_createOne"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/article-category/ancestors": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ArticleCategoryController_findAllAncestors"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/article-category/{id}/children": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ArticleCategoryController_getChildren"];
        put?: never;
        post?: never;
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
        get: operations["ArticleCategoryController_getChildrenCate"];
        put?: never;
        post?: never;
        delete: operations["ArticleCategoryController_deleteOne"];
        options?: never;
        head?: never;
        patch: operations["ArticleCategoryController_updateOne"];
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
        PaginationResponseDto: {
            current: number;
            pageSize: number;
            total: number;
            list: Record<string, never>;
        };
        /** @enum {string} */
        RequestMethod: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
        AdminApiTranslationDto: {
            langKey: string;
            apiName: string;
        };
        AdminApiDto: {
            method: components["schemas"]["RequestMethod"];
            id: string;
            url: string;
            parentId: string;
            order: number;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
            translations: components["schemas"]["AdminApiTranslationDto"][];
        };
        AdminApiAncestorsDto: {
            idPath: {
                [key: string]: string[];
            };
            list: components["schemas"]["AdminApiDto"][];
        };
        CreateApiDto: {
            method: components["schemas"]["RequestMethod"];
            url: string;
            parentId: string;
            order: number;
            translations: components["schemas"]["AdminApiTranslationDto"][];
        };
        UpdateApiDto: {
            method?: components["schemas"]["RequestMethod"];
            url?: string;
            parentId?: string;
            order?: number;
            translations?: components["schemas"]["AdminApiTranslationDto"][];
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
            roles: string[];
            password: string;
        };
        UpdateAdminUserDto: {
            userName?: string;
            roles?: string[];
            password?: string;
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
        AdminRouteTranslationDto: {
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
            translations: components["schemas"]["AdminRouteTranslationDto"][];
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
        AdminRoleTranslationDto: {
            langKey: string;
            roleName: string;
        };
        AdminRoleDto: {
            id: string;
            order: number;
            translations: components["schemas"]["AdminRoleTranslationDto"][];
            routes: string[];
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        CreateAdminRoleDto: {
            routes: string[];
            order: number;
            translations: components["schemas"]["AdminRoleTranslationDto"][];
        };
        UpdateAdminRoleDto: {
            routes?: string[];
            order?: number;
            translations?: components["schemas"]["AdminRoleTranslationDto"][];
        };
        AdminRouteDto: {
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
            apis: string[];
            translations: components["schemas"]["AdminRouteTranslationDto"][];
        };
        AdminRoute: {
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
            translations: components["schemas"]["AdminRouteTranslationDto"][];
        };
        AdminRouteAncestorsDto: {
            idPath: {
                [key: string]: string[];
            };
            list: components["schemas"]["AdminRoute"][];
        };
        CreateAdminRouteDto: {
            type: components["schemas"]["RouteType"];
            apis: string[];
            icon?: string;
            redirect?: string;
            hidden: boolean;
            component: string;
            key: string;
            status: boolean;
            path: string;
            parentId: string;
            order: number;
            translations: components["schemas"]["AdminRouteTranslationDto"][];
        };
        UpdateAdminRouteDto: {
            type?: components["schemas"]["RouteType"];
            apis?: string[];
            icon?: string;
            redirect?: string;
            hidden?: boolean;
            component?: string;
            key?: string;
            status?: boolean;
            path?: string;
            parentId?: string;
            order?: number;
            translations?: components["schemas"]["AdminRouteTranslationDto"][];
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
        UploadFileDto: {
            id: string;
            channel: number;
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
            order: number;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
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
        ArticleCategoryAncestorsDto: {
            idPath: {
                [key: string]: number[];
            };
            list: components["schemas"]["ArticleCategoryDto"][];
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
        /** @enum {string} */
        StorageType: "LOCAL" | "S3";
        FileStorageDto: {
            type: components["schemas"]["StorageType"];
            id: string;
            name: string;
            enable: boolean;
            accessKey: string | null;
            secretKey: string | null;
            endpoint: string | null;
            bucket: string | null;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        CreateFileStorageDto: {
            type: components["schemas"]["StorageType"];
            name: string;
            /** @default false */
            enable: boolean;
            accessKey?: string;
            secretKey?: string;
            endpoint?: string;
            bucket?: string;
        };
        UpdateFileStorageDto: {
            type?: components["schemas"]["StorageType"];
            name?: string;
            /** @default false */
            enable: boolean;
            accessKey?: string;
            secretKey?: string;
            endpoint?: string;
            bucket?: string;
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
    AdminApiController_pagination: {
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
                            list: components["schemas"]["AdminApiDto"][];
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
    AdminApiController_createOne: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateApiDto"];
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
    AdminApiController_findAllAncestors: {
        parameters: {
            query: {
                ids: string[];
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
                        data: components["schemas"]["AdminApiAncestorsDto"];
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
    AdminApiController_getChildren: {
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
                        data: components["schemas"]["AdminApiDto"][];
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
    AdminApiController_deleteOne: {
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
    AdminApiController_updateOne: {
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
                "application/json": components["schemas"]["UpdateApiDto"];
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
    ArticleController_pagination: {
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
    AdminAuthController_login: {
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
    AdminAuthController_captcha: {
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
    AdminAuthController_info: {
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
    AdminAuthController_updateUserInfo: {
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
    AdminRoleController_pagination: {
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
                            list: components["schemas"]["AdminRoleDto"][];
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
    AdminRoleController_createOne: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateAdminRoleDto"];
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
    AdminRoleController_getAll: {
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
                        data: components["schemas"]["AdminRoleDto"][];
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
    AdminRoleController_deleteOne: {
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
    AdminRoleController_updateOne: {
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
                "application/json": components["schemas"]["UpdateAdminRoleDto"];
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
    AdminRouteController_pagination: {
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
                            list: components["schemas"]["AdminRouteDto"][];
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
    AdminRouteController_createOne: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateAdminRouteDto"];
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
    AdminRouteController_findAllAncestors: {
        parameters: {
            query: {
                ids: string[];
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
                        data: components["schemas"]["AdminRouteAncestorsDto"];
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
    AdminRouteController_getChildren: {
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
                        data: components["schemas"]["AdminRouteDto"][];
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
    AdminRouteController_getAll: {
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
                        data: components["schemas"]["AdminRouteDto"][];
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
    AdminRouteController_deleteOne: {
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
    AdminRouteController_updateOne: {
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
                "application/json": components["schemas"]["UpdateAdminRouteDto"];
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
    ArticleCategoryController_pagination: {
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
                            list: components["schemas"]["ArticleCategoryDto"][];
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
    ArticleCategoryController_findAllAncestors: {
        parameters: {
            query: {
                ids: number[];
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
                        data: components["schemas"]["ArticleCategoryAncestorsDto"];
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
    ArticleCategoryController_getChildren: {
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
    ArticleCategoryController_getChildrenCate: {
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
    FileStorageController_pagination: {
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
}
type ReadonlyArray<T> = [
    Exclude<T, undefined>
] extends [
    unknown[]
] ? Readonly<Exclude<T, undefined>> : Readonly<Exclude<T, undefined>[]>;
export const responseStatusCodeValues: ReadonlyArray<components["schemas"]["ResponseStatusCode"]> = [-1, 0, 401, 403, 400];
export const requestMethodValues: ReadonlyArray<components["schemas"]["RequestMethod"]> = ["GET", "POST", "PATCH", "PUT", "DELETE"];
export const languageOrientationValues: ReadonlyArray<components["schemas"]["LanguageOrientation"]> = ["LTR", "RTL"];
export const createLanguageDtoOrientationValues: ReadonlyArray<components["schemas"]["CreateLanguageDto"]["orientation"]> = ["LTR", "RTL"];
export const updateLanguageDtoOrientationValues: ReadonlyArray<components["schemas"]["UpdateLanguageDto"]["orientation"]> = ["LTR", "RTL"];
export const systemSettingKeyValues: ReadonlyArray<components["schemas"]["SystemSettingKey"]> = ["LANGUAGE", "STORAGE"];
export const routeTypeValues: ReadonlyArray<components["schemas"]["RouteType"]> = ["GROUP", "SMALL_GROUP", "MENU", "BUTTON"];
export const storageTypeValues: ReadonlyArray<components["schemas"]["StorageType"]> = ["LOCAL", "S3"];
