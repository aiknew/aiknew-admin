--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public."UploadFile" DROP CONSTRAINT IF EXISTS "UploadFile_uploaderId_fkey";
ALTER TABLE IF EXISTS ONLY public."UploadFile" DROP CONSTRAINT IF EXISTS "UploadFile_fileStorageId_fkey";
ALTER TABLE IF EXISTS ONLY public."UploadFileGroupPath" DROP CONSTRAINT IF EXISTS "UploadFileGroupPath_descendantId_fkey";
ALTER TABLE IF EXISTS ONLY public."UploadFileGroupPath" DROP CONSTRAINT IF EXISTS "UploadFileGroupPath_ancestorId_fkey";
ALTER TABLE IF EXISTS ONLY public."Article" DROP CONSTRAINT IF EXISTS "Article_articleCategoryId_fkey";
ALTER TABLE IF EXISTS ONLY public."ArticleTranslation" DROP CONSTRAINT IF EXISTS "ArticleTranslation_langKey_fkey";
ALTER TABLE IF EXISTS ONLY public."ArticleTranslation" DROP CONSTRAINT IF EXISTS "ArticleTranslation_articleId_fkey";
ALTER TABLE IF EXISTS ONLY public."ArticleCategoryTranslation" DROP CONSTRAINT IF EXISTS "ArticleCategoryTranslation_langKey_fkey";
ALTER TABLE IF EXISTS ONLY public."ArticleCategoryTranslation" DROP CONSTRAINT IF EXISTS "ArticleCategoryTranslation_articleCategoryId_fkey";
ALTER TABLE IF EXISTS ONLY public."AdminUserRole" DROP CONSTRAINT IF EXISTS "AdminUserRole_adminUserId_fkey";
ALTER TABLE IF EXISTS ONLY public."AdminUserRole" DROP CONSTRAINT IF EXISTS "AdminUserRole_adminRoleId_fkey";
ALTER TABLE IF EXISTS ONLY public."AdminRouteTranslation" DROP CONSTRAINT IF EXISTS "AdminRouteTranslation_routeId_fkey";
ALTER TABLE IF EXISTS ONLY public."AdminRouteTranslation" DROP CONSTRAINT IF EXISTS "AdminRouteTranslation_langKey_fkey";
ALTER TABLE IF EXISTS ONLY public."AdminRouteApi" DROP CONSTRAINT IF EXISTS "AdminRouteApi_routeId_fkey";
ALTER TABLE IF EXISTS ONLY public."AdminRouteApi" DROP CONSTRAINT IF EXISTS "AdminRouteApi_apiId_fkey";
ALTER TABLE IF EXISTS ONLY public."AdminRoleTranslation" DROP CONSTRAINT IF EXISTS "AdminRoleTranslation_langKey_fkey";
ALTER TABLE IF EXISTS ONLY public."AdminRoleTranslation" DROP CONSTRAINT IF EXISTS "AdminRoleTranslation_adminRoleId_fkey";
ALTER TABLE IF EXISTS ONLY public."AdminRoleRoute" DROP CONSTRAINT IF EXISTS "AdminRoleRoute_routeId_fkey";
ALTER TABLE IF EXISTS ONLY public."AdminRoleRoute" DROP CONSTRAINT IF EXISTS "AdminRoleRoute_roleId_fkey";
ALTER TABLE IF EXISTS ONLY public."AdminApiTranslation" DROP CONSTRAINT IF EXISTS "AdminApiTranslation_langKey_fkey";
ALTER TABLE IF EXISTS ONLY public."AdminApiTranslation" DROP CONSTRAINT IF EXISTS "AdminApiTranslation_apiId_fkey";
DROP INDEX IF EXISTS public."WebsiteLanguage_key_key";
DROP INDEX IF EXISTS public."WebUser_userName_key";
DROP INDEX IF EXISTS public."UploadFile_originalName_groupId_key";
DROP INDEX IF EXISTS public."UploadFileGroup_groupName_parentId_key";
DROP INDEX IF EXISTS public."SystemSetting_key_key";
DROP INDEX IF EXISTS public."Language_key_key";
DROP INDEX IF EXISTS public."ArticleTranslation_title_key";
DROP INDEX IF EXISTS public."AdminUser_userName_key";
DROP INDEX IF EXISTS public."AdminApi_url_method_key";
ALTER TABLE IF EXISTS ONLY public."WebUser" DROP CONSTRAINT IF EXISTS "WebUser_pkey";
ALTER TABLE IF EXISTS ONLY public."UploadFile" DROP CONSTRAINT IF EXISTS "UploadFile_pkey";
ALTER TABLE IF EXISTS ONLY public."UploadFileGroup" DROP CONSTRAINT IF EXISTS "UploadFileGroup_pkey";
ALTER TABLE IF EXISTS ONLY public."UploadFileGroupPath" DROP CONSTRAINT IF EXISTS "UploadFileGroupPath_pkey";
ALTER TABLE IF EXISTS ONLY public."SystemSetting" DROP CONSTRAINT IF EXISTS "SystemSetting_pkey";
ALTER TABLE IF EXISTS ONLY public."FileStorage" DROP CONSTRAINT IF EXISTS "FileStorage_pkey";
ALTER TABLE IF EXISTS ONLY public."Article" DROP CONSTRAINT IF EXISTS "Article_pkey";
ALTER TABLE IF EXISTS ONLY public."ArticleTranslation" DROP CONSTRAINT IF EXISTS "ArticleTranslation_pkey";
ALTER TABLE IF EXISTS ONLY public."ArticleCategory" DROP CONSTRAINT IF EXISTS "ArticleCategory_pkey";
ALTER TABLE IF EXISTS ONLY public."ArticleCategoryTranslation" DROP CONSTRAINT IF EXISTS "ArticleCategoryTranslation_pkey";
ALTER TABLE IF EXISTS ONLY public."AdminUser" DROP CONSTRAINT IF EXISTS "AdminUser_pkey";
ALTER TABLE IF EXISTS ONLY public."AdminUserRole" DROP CONSTRAINT IF EXISTS "AdminUserRole_pkey";
ALTER TABLE IF EXISTS ONLY public."AdminRoute" DROP CONSTRAINT IF EXISTS "AdminRoute_pkey";
ALTER TABLE IF EXISTS ONLY public."AdminRouteTranslation" DROP CONSTRAINT IF EXISTS "AdminRouteTranslation_pkey";
ALTER TABLE IF EXISTS ONLY public."AdminRouteApi" DROP CONSTRAINT IF EXISTS "AdminRouteApi_pkey";
ALTER TABLE IF EXISTS ONLY public."AdminRole" DROP CONSTRAINT IF EXISTS "AdminRole_pkey";
ALTER TABLE IF EXISTS ONLY public."AdminRoleTranslation" DROP CONSTRAINT IF EXISTS "AdminRoleTranslation_pkey";
ALTER TABLE IF EXISTS ONLY public."AdminRoleRoute" DROP CONSTRAINT IF EXISTS "AdminRoleRoute_pkey";
ALTER TABLE IF EXISTS ONLY public."AdminApi" DROP CONSTRAINT IF EXISTS "AdminApi_pkey";
ALTER TABLE IF EXISTS ONLY public."AdminApiTranslation" DROP CONSTRAINT IF EXISTS "AdminApiTranslation_pkey";
ALTER TABLE IF EXISTS public."ArticleCategory" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public."Article" ALTER COLUMN id DROP DEFAULT;
DROP TABLE IF EXISTS public."WebsiteLanguage";
DROP TABLE IF EXISTS public."WebUser";
DROP TABLE IF EXISTS public."UploadFileGroupPath";
DROP TABLE IF EXISTS public."UploadFileGroup";
DROP TABLE IF EXISTS public."UploadFile";
DROP TABLE IF EXISTS public."SystemSetting";
DROP TABLE IF EXISTS public."Language";
DROP TABLE IF EXISTS public."FileStorage";
DROP SEQUENCE IF EXISTS public."Article_id_seq";
DROP TABLE IF EXISTS public."ArticleTranslation";
DROP SEQUENCE IF EXISTS public."ArticleCategory_id_seq";
DROP TABLE IF EXISTS public."ArticleCategoryTranslation";
DROP TABLE IF EXISTS public."ArticleCategory";
DROP TABLE IF EXISTS public."Article";
DROP TABLE IF EXISTS public."AdminUserRole";
DROP TABLE IF EXISTS public."AdminUser";
DROP TABLE IF EXISTS public."AdminRouteTranslation";
DROP TABLE IF EXISTS public."AdminRouteApi";
DROP TABLE IF EXISTS public."AdminRoute";
DROP TABLE IF EXISTS public."AdminRoleTranslation";
DROP TABLE IF EXISTS public."AdminRoleRoute";
DROP TABLE IF EXISTS public."AdminRole";
DROP TABLE IF EXISTS public."AdminApiTranslation";
DROP TABLE IF EXISTS public."AdminApi";
DROP TYPE IF EXISTS public."StorageType";
DROP TYPE IF EXISTS public."RouteType";
DROP TYPE IF EXISTS public."RequestMethod";
DROP TYPE IF EXISTS public."LanguageOrientation";
-- *not* dropping schema, since initdb creates it
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS '';


--
-- Name: LanguageOrientation; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."LanguageOrientation" AS ENUM (
    'LTR',
    'RTL'
);


--
-- Name: RequestMethod; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."RequestMethod" AS ENUM (
    'GET',
    'POST',
    'PATCH',
    'PUT',
    'DELETE'
);


--
-- Name: RouteType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."RouteType" AS ENUM (
    'GROUP',
    'SMALL_GROUP',
    'MENU',
    'BUTTON'
);


--
-- Name: StorageType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."StorageType" AS ENUM (
    'LOCAL',
    'S3'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: AdminApi; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."AdminApi" (
    id text NOT NULL,
    url character varying(100) NOT NULL,
    method public."RequestMethod" DEFAULT 'GET'::public."RequestMethod" NOT NULL,
    "parentId" character varying(30) DEFAULT '0'::character varying NOT NULL,
    "order" integer DEFAULT 100 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: AdminApiTranslation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."AdminApiTranslation" (
    "apiId" text NOT NULL,
    "langKey" text NOT NULL,
    "apiName" character varying(50) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: AdminRole; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."AdminRole" (
    id text NOT NULL,
    "order" integer DEFAULT 100 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: AdminRoleRoute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."AdminRoleRoute" (
    "roleId" text NOT NULL,
    "routeId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: AdminRoleTranslation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."AdminRoleTranslation" (
    "adminRoleId" text NOT NULL,
    "langKey" text NOT NULL,
    "roleName" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: AdminRoute; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."AdminRoute" (
    id text NOT NULL,
    icon character varying(20) DEFAULT ''::character varying NOT NULL,
    redirect character varying(50) DEFAULT ''::character varying NOT NULL,
    hidden boolean DEFAULT false NOT NULL,
    component character varying(100) DEFAULT ''::character varying NOT NULL,
    type public."RouteType" DEFAULT 'GROUP'::public."RouteType" NOT NULL,
    key character varying(20) DEFAULT ''::character varying NOT NULL,
    status boolean DEFAULT true NOT NULL,
    path character varying(100) DEFAULT '-'::character varying NOT NULL,
    "parentId" character varying(30) DEFAULT '0'::character varying NOT NULL,
    "order" integer DEFAULT 100 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: AdminRouteApi; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."AdminRouteApi" (
    "routeId" text NOT NULL,
    "apiId" text NOT NULL
);


--
-- Name: AdminRouteTranslation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."AdminRouteTranslation" (
    "routeId" text NOT NULL,
    "langKey" text NOT NULL,
    "routeName" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: AdminUser; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."AdminUser" (
    id text NOT NULL,
    "userName" character varying(20) NOT NULL,
    password character varying(100) NOT NULL,
    super boolean DEFAULT false NOT NULL,
    "tokenVersion" integer DEFAULT 0 NOT NULL,
    "lastLoginTime" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: AdminUserRole; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."AdminUserRole" (
    "adminUserId" text NOT NULL,
    "adminRoleId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Article; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Article" (
    id integer NOT NULL,
    "order" integer DEFAULT 10 NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "realViewCount" integer DEFAULT 0 NOT NULL,
    "fakeViewCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "articleCategoryId" integer NOT NULL
);


--
-- Name: ArticleCategory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ArticleCategory" (
    id integer NOT NULL,
    "order" integer DEFAULT 10 NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "parentId" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: ArticleCategoryTranslation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ArticleCategoryTranslation" (
    "articleCategoryId" integer NOT NULL,
    "langKey" text NOT NULL,
    name character varying(50) NOT NULL
);


--
-- Name: ArticleCategory_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."ArticleCategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ArticleCategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."ArticleCategory_id_seq" OWNED BY public."ArticleCategory".id;


--
-- Name: ArticleTranslation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ArticleTranslation" (
    "articleId" integer NOT NULL,
    "langKey" text NOT NULL,
    title character varying(50) NOT NULL,
    content text NOT NULL
);


--
-- Name: Article_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Article_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Article_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Article_id_seq" OWNED BY public."Article".id;


--
-- Name: FileStorage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."FileStorage" (
    id text NOT NULL,
    name character varying(20) NOT NULL,
    type public."StorageType" NOT NULL,
    active boolean DEFAULT false NOT NULL,
    hostname character varying(100) NOT NULL,
    "accessKey" character varying(50),
    "secretKey" character varying(50),
    endpoint character varying(50),
    bucket character varying(50),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Language; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Language" (
    key character varying(30) NOT NULL,
    name character varying(50) NOT NULL,
    orientation public."LanguageOrientation" DEFAULT 'LTR'::public."LanguageOrientation" NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "order" integer DEFAULT 10 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: SystemSetting; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SystemSetting" (
    id text NOT NULL,
    key character varying(20) NOT NULL,
    value jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: UploadFile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UploadFile" (
    id text NOT NULL,
    channel smallint DEFAULT 10 NOT NULL,
    "fileName" character varying(50) NOT NULL,
    "filePath" character varying(200) NOT NULL,
    "fileExt" character varying(10) NOT NULL,
    "fileSize" integer NOT NULL,
    mime character varying(50) NOT NULL,
    "originalName" character varying(255) NOT NULL,
    "order" integer DEFAULT 10 NOT NULL,
    "groupId" text DEFAULT '0'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "uploaderId" text NOT NULL,
    "fileStorageId" text NOT NULL
);


--
-- Name: UploadFileGroup; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UploadFileGroup" (
    id text NOT NULL,
    "groupName" character varying(50) NOT NULL,
    "parentId" text DEFAULT '0'::text NOT NULL,
    "order" integer DEFAULT 10 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: UploadFileGroupPath; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UploadFileGroupPath" (
    "ancestorId" text NOT NULL,
    "descendantId" text NOT NULL,
    depth integer NOT NULL
);


--
-- Name: WebUser; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."WebUser" (
    id text NOT NULL,
    "userName" character varying(20) NOT NULL,
    password character varying(100) NOT NULL,
    "tokenVersion" integer DEFAULT 0 NOT NULL,
    "lastLoginTime" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: WebsiteLanguage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."WebsiteLanguage" (
    key character varying(30) NOT NULL,
    name character varying(50) NOT NULL,
    orientation public."LanguageOrientation" DEFAULT 'LTR'::public."LanguageOrientation" NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "order" integer DEFAULT 10 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Article id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Article" ALTER COLUMN id SET DEFAULT nextval('public."Article_id_seq"'::regclass);


--
-- Name: ArticleCategory id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ArticleCategory" ALTER COLUMN id SET DEFAULT nextval('public."ArticleCategory_id_seq"'::regclass);


--
-- Data for Name: AdminApi; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."AdminApi" VALUES ('cmda1g6lm00016xeugd7laa8q', '[/admin/admin-user]', 'GET', '0', 100, '2025-07-19 09:21:16.906', '2025-07-19 09:21:16.906');
INSERT INTO public."AdminApi" VALUES ('cmda1g6ly00026xeuf8n9p3qs', '/admin/admin-user', 'GET', 'cmda1g6lm00016xeugd7laa8q', 100, '2025-07-19 09:21:16.918', '2025-07-19 09:21:16.918');
INSERT INTO public."AdminApi" VALUES ('cmda1g6m400036xeuy0824o45', '/admin/admin-user', 'POST', 'cmda1g6lm00016xeugd7laa8q', 100, '2025-07-19 09:21:16.924', '2025-07-19 09:21:16.924');
INSERT INTO public."AdminApi" VALUES ('cmda1g6m900046xeu5zoz07of', '/admin/admin-user/:id', 'PATCH', 'cmda1g6lm00016xeugd7laa8q', 100, '2025-07-19 09:21:16.929', '2025-07-19 09:21:16.929');
INSERT INTO public."AdminApi" VALUES ('cmda1g6md00056xeuhssm5p2s', '/admin/admin-user/:id', 'DELETE', 'cmda1g6lm00016xeugd7laa8q', 100, '2025-07-19 09:21:16.934', '2025-07-19 09:21:16.934');
INSERT INTO public."AdminApi" VALUES ('cmda1g6mi00066xeuovsijd29', '/admin/auth/update', 'PATCH', '0', 100, '2025-07-19 09:21:16.938', '2025-07-19 09:21:16.938');
INSERT INTO public."AdminApi" VALUES ('cmda1g6mn00076xeu775zcyu0', '[/admin/admin-api]', 'GET', '0', 100, '2025-07-19 09:21:16.944', '2025-07-19 09:21:16.944');
INSERT INTO public."AdminApi" VALUES ('cmda1g6ms00086xeu1wddcmkk', '/admin/admin-api', 'GET', 'cmda1g6mn00076xeu775zcyu0', 100, '2025-07-19 09:21:16.948', '2025-07-19 09:21:16.948');
INSERT INTO public."AdminApi" VALUES ('cmda1g6mw00096xeu4ye659yf', '/admin/admin-api/all', 'GET', 'cmda1g6mn00076xeu775zcyu0', 100, '2025-07-19 09:21:16.953', '2025-07-19 09:21:16.953');
INSERT INTO public."AdminApi" VALUES ('cmda1g6n1000a6xeuqftutfo6', '/admin/admin-api', 'POST', 'cmda1g6mn00076xeu775zcyu0', 100, '2025-07-19 09:21:16.958', '2025-07-19 09:21:16.958');
INSERT INTO public."AdminApi" VALUES ('cmda1g6n7000b6xeux6rs01yw', '/admin/admin-api/:id', 'PATCH', 'cmda1g6mn00076xeu775zcyu0', 100, '2025-07-19 09:21:16.963', '2025-07-19 09:21:16.963');
INSERT INTO public."AdminApi" VALUES ('cmda1g6nc000c6xeug1pbciqd', '/admin/admin-api/:id', 'DELETE', 'cmda1g6mn00076xeu775zcyu0', 100, '2025-07-19 09:21:16.969', '2025-07-19 09:21:16.969');
INSERT INTO public."AdminApi" VALUES ('cmda1g6nh000d6xeu9smvxhl2', '[/admin/article-category]', 'GET', '0', 100, '2025-07-19 09:21:16.973', '2025-07-19 09:21:16.973');
INSERT INTO public."AdminApi" VALUES ('cmda1g6nl000e6xeufikjkne1', '/admin/article-category', 'GET', 'cmda1g6nh000d6xeu9smvxhl2', 100, '2025-07-19 09:21:16.978', '2025-07-19 09:21:16.978');
INSERT INTO public."AdminApi" VALUES ('cmda1g6nr000f6xeuhukt47p8', '/admin/article-category/:id', 'GET', 'cmda1g6nh000d6xeu9smvxhl2', 100, '2025-07-19 09:21:16.983', '2025-07-19 09:21:16.983');
INSERT INTO public."AdminApi" VALUES ('cmda1g6nv000g6xeu0j9geo9u', '/admin/article-category', 'POST', 'cmda1g6nh000d6xeu9smvxhl2', 100, '2025-07-19 09:21:16.987', '2025-07-19 09:21:16.987');
INSERT INTO public."AdminApi" VALUES ('cmda1g6nz000h6xeuq60x180y', '/admin/article-category/:id', 'PATCH', 'cmda1g6nh000d6xeu9smvxhl2', 100, '2025-07-19 09:21:16.991', '2025-07-19 09:21:16.991');
INSERT INTO public."AdminApi" VALUES ('cmda1g6o3000i6xeugeqi2gr6', '/admin/article-category/:id', 'DELETE', 'cmda1g6nh000d6xeu9smvxhl2', 100, '2025-07-19 09:21:16.995', '2025-07-19 09:21:16.995');
INSERT INTO public."AdminApi" VALUES ('cmda1g6o7000j6xeu52zvw3oe', '[/admin/article]', 'GET', '0', 100, '2025-07-19 09:21:17', '2025-07-19 09:21:17');
INSERT INTO public."AdminApi" VALUES ('cmda1g6ob000k6xeutnpcmvlm', '/admin/article', 'GET', 'cmda1g6o7000j6xeu52zvw3oe', 100, '2025-07-19 09:21:17.004', '2025-07-19 09:21:17.004');
INSERT INTO public."AdminApi" VALUES ('cmda1g6og000l6xeur7t2wphs', '/admin/article/:id', 'GET', 'cmda1g6o7000j6xeu52zvw3oe', 100, '2025-07-19 09:21:17.008', '2025-07-19 09:21:17.008');
INSERT INTO public."AdminApi" VALUES ('cmda1g6ok000m6xeu2bgebg4v', '/admin/article', 'POST', 'cmda1g6o7000j6xeu52zvw3oe', 100, '2025-07-19 09:21:17.013', '2025-07-19 09:21:17.013');
INSERT INTO public."AdminApi" VALUES ('cmda1g6op000n6xeuav9f7sgw', '/admin/article/:id', 'PATCH', 'cmda1g6o7000j6xeu52zvw3oe', 100, '2025-07-19 09:21:17.017', '2025-07-19 09:21:17.017');
INSERT INTO public."AdminApi" VALUES ('cmda1g6ou000o6xeux9a1utnv', '/admin/article/:id', 'DELETE', 'cmda1g6o7000j6xeu52zvw3oe', 100, '2025-07-19 09:21:17.023', '2025-07-19 09:21:17.023');
INSERT INTO public."AdminApi" VALUES ('cmda1g6oz000p6xeu2livmlz2', '[/admin/system/lang]', 'GET', '0', 100, '2025-07-19 09:21:17.027', '2025-07-19 09:21:17.027');
INSERT INTO public."AdminApi" VALUES ('cmda1g6p3000q6xeut4dqhx7n', '/admin/system/lang', 'GET', 'cmda1g6oz000p6xeu2livmlz2', 100, '2025-07-19 09:21:17.032', '2025-07-19 09:21:17.032');
INSERT INTO public."AdminApi" VALUES ('cmda1g6p8000r6xeu4h4z4gt6', '/admin/system/lang', 'POST', 'cmda1g6oz000p6xeu2livmlz2', 100, '2025-07-19 09:21:17.036', '2025-07-19 09:21:17.036');
INSERT INTO public."AdminApi" VALUES ('cmda1g6pd000s6xeuf86uuevf', '/admin/system/lang/:id', 'PATCH', 'cmda1g6oz000p6xeu2livmlz2', 100, '2025-07-19 09:21:17.042', '2025-07-19 09:21:17.042');
INSERT INTO public."AdminApi" VALUES ('cmda1g6pi000t6xeuf78or3bn', '/admin/system/lang/:id', 'DELETE', 'cmda1g6oz000p6xeu2livmlz2', 100, '2025-07-19 09:21:17.047', '2025-07-19 09:21:17.047');
INSERT INTO public."AdminApi" VALUES ('cmda1g6po000u6xeuovbmrmim', '[/admin/admin-role]', 'GET', '0', 100, '2025-07-19 09:21:17.052', '2025-07-19 09:21:17.052');
INSERT INTO public."AdminApi" VALUES ('cmda1g6pu000v6xeuxltq7u4i', '/admin/admin-role', 'GET', 'cmda1g6po000u6xeuovbmrmim', 100, '2025-07-19 09:21:17.058', '2025-07-19 09:21:17.058');
INSERT INTO public."AdminApi" VALUES ('cmda1g6pz000w6xeus0zjx34i', '/admin/admin-role/all', 'GET', 'cmda1g6po000u6xeuovbmrmim', 100, '2025-07-19 09:21:17.063', '2025-07-19 09:21:17.063');
INSERT INTO public."AdminApi" VALUES ('cmda1g6q4000x6xeu45itlad6', '/admin/admin-role', 'POST', 'cmda1g6po000u6xeuovbmrmim', 100, '2025-07-19 09:21:17.069', '2025-07-19 09:21:17.069');
INSERT INTO public."AdminApi" VALUES ('cmda1g6qa000y6xeuh5m7gjl6', '/admin/admin-role/:id', 'PATCH', 'cmda1g6po000u6xeuovbmrmim', 100, '2025-07-19 09:21:17.074', '2025-07-19 09:21:17.074');
INSERT INTO public."AdminApi" VALUES ('cmda1g6qg000z6xeu02ezoh6p', '/admin/admin-role/:id', 'DELETE', 'cmda1g6po000u6xeuovbmrmim', 100, '2025-07-19 09:21:17.08', '2025-07-19 09:21:17.08');
INSERT INTO public."AdminApi" VALUES ('cmda1g6qm00106xeun0rce7ou', '[/admin/admin-route]', 'GET', '0', 100, '2025-07-19 09:21:17.087', '2025-07-19 09:21:17.087');
INSERT INTO public."AdminApi" VALUES ('cmda1g6qr00116xeuo70mb3wk', '/admin/admin-route', 'GET', 'cmda1g6qm00106xeun0rce7ou', 100, '2025-07-19 09:21:17.092', '2025-07-19 09:21:17.092');
INSERT INTO public."AdminApi" VALUES ('cmda1g6qy00126xeue4ra1bz3', '/admin/admin-route/all', 'GET', 'cmda1g6qm00106xeun0rce7ou', 100, '2025-07-19 09:21:17.099', '2025-07-19 09:21:17.099');
INSERT INTO public."AdminApi" VALUES ('cmda1g6r700136xeubk721q4j', '/admin/admin-route', 'POST', 'cmda1g6qm00106xeun0rce7ou', 100, '2025-07-19 09:21:17.108', '2025-07-19 09:21:17.108');
INSERT INTO public."AdminApi" VALUES ('cmda1g6rg00146xeuy55x24rl', '/admin/admin-route/:id', 'PATCH', 'cmda1g6qm00106xeun0rce7ou', 100, '2025-07-19 09:21:17.116', '2025-07-19 09:21:17.116');
INSERT INTO public."AdminApi" VALUES ('cmda1g6rl00156xeur8j7wvwc', '/admin/admin-route/:id', 'DELETE', 'cmda1g6qm00106xeun0rce7ou', 100, '2025-07-19 09:21:17.121', '2025-07-19 09:21:17.121');
INSERT INTO public."AdminApi" VALUES ('cmda1g6rs00166xeujxjbnw8a', '[/admin/upload-file]', 'GET', '0', 100, '2025-07-19 09:21:17.128', '2025-07-19 09:21:17.128');
INSERT INTO public."AdminApi" VALUES ('cmda1g6rx00176xeu7jsqqgv9', '/admin/upload-file/filesAndGroups', 'GET', 'cmda1g6rs00166xeujxjbnw8a', 100, '2025-07-19 09:21:17.134', '2025-07-19 09:21:17.134');
INSERT INTO public."AdminApi" VALUES ('cmda1g6s300186xeua6zb0qn8', '/admin/upload-file', 'POST', 'cmda1g6rs00166xeujxjbnw8a', 100, '2025-07-19 09:21:17.139', '2025-07-19 09:21:17.139');
INSERT INTO public."AdminApi" VALUES ('cmda1g6s700196xeumyg1n73n', '/admin/upload-file/:id', 'PATCH', 'cmda1g6rs00166xeujxjbnw8a', 100, '2025-07-19 09:21:17.143', '2025-07-19 09:21:17.143');
INSERT INTO public."AdminApi" VALUES ('cmda1g6sb001a6xeueks7h0o2', '/admin/upload-file/:id', 'DELETE', 'cmda1g6rs00166xeujxjbnw8a', 100, '2025-07-19 09:21:17.147', '2025-07-19 09:21:17.147');
INSERT INTO public."AdminApi" VALUES ('cmda1g6sf001b6xeukibbn98b', '[/admin/upload-file-group]', 'GET', '0', 100, '2025-07-19 09:21:17.151', '2025-07-19 09:21:17.151');
INSERT INTO public."AdminApi" VALUES ('cmda1g6sk001c6xeu6vfif4to', '/admin/upload-file-group/:id', 'GET', 'cmda1g6sf001b6xeukibbn98b', 100, '2025-07-19 09:21:17.157', '2025-07-19 09:21:17.157');
INSERT INTO public."AdminApi" VALUES ('cmda1g6so001d6xeu39hrcqea', '/admin/upload-file-group', 'POST', 'cmda1g6sf001b6xeukibbn98b', 100, '2025-07-19 09:21:17.16', '2025-07-19 09:21:17.16');
INSERT INTO public."AdminApi" VALUES ('cmda1g6st001e6xeua94edcad', '/admin/upload-file-group/:id', 'PATCH', 'cmda1g6sf001b6xeukibbn98b', 100, '2025-07-19 09:21:17.166', '2025-07-19 09:21:17.166');
INSERT INTO public."AdminApi" VALUES ('cmda1g6sy001f6xeujz6386ng', '/admin/upload-file-group/:id', 'DELETE', 'cmda1g6sf001b6xeukibbn98b', 100, '2025-07-19 09:21:17.17', '2025-07-19 09:21:17.17');


--
-- Data for Name: AdminApiTranslation; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6lm00016xeugd7laa8q', 'zh-TW', '管理員用戶設定', '2025-07-19 09:21:16.906', '2025-07-19 09:21:16.906');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6lm00016xeugd7laa8q', 'en', 'Administrator user settings', '2025-07-19 09:21:16.906', '2025-07-19 09:21:16.906');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6lm00016xeugd7laa8q', 'zh-CN', '管理员用户设置', '2025-07-19 09:21:16.906', '2025-07-19 09:21:16.906');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6ly00026xeuf8n9p3qs', 'zh-TW', '管理員使用者列表', '2025-07-19 09:21:16.918', '2025-07-19 09:21:16.918');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6ly00026xeuf8n9p3qs', 'en', 'Administrator user list', '2025-07-19 09:21:16.918', '2025-07-19 09:21:16.918');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6ly00026xeuf8n9p3qs', 'zh-CN', '管理员用户列表', '2025-07-19 09:21:16.918', '2025-07-19 09:21:16.918');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6m400036xeuy0824o45', 'zh-TW', '新增管理員用戶', '2025-07-19 09:21:16.924', '2025-07-19 09:21:16.924');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6m400036xeuy0824o45', 'en', 'Add new administrator user', '2025-07-19 09:21:16.924', '2025-07-19 09:21:16.924');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6m400036xeuy0824o45', 'zh-CN', '新增管理员用户', '2025-07-19 09:21:16.924', '2025-07-19 09:21:16.924');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6m900046xeu5zoz07of', 'zh-TW', '編輯管理員用戶', '2025-07-19 09:21:16.929', '2025-07-19 09:21:16.929');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6m900046xeu5zoz07of', 'en', 'Edit admin user', '2025-07-19 09:21:16.929', '2025-07-19 09:21:16.929');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6m900046xeu5zoz07of', 'zh-CN', '编辑管理员用户', '2025-07-19 09:21:16.929', '2025-07-19 09:21:16.929');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6md00056xeuhssm5p2s', 'zh-TW', '刪除管理員用戶', '2025-07-19 09:21:16.934', '2025-07-19 09:21:16.934');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6md00056xeuhssm5p2s', 'en', 'Delete admin user', '2025-07-19 09:21:16.934', '2025-07-19 09:21:16.934');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6md00056xeuhssm5p2s', 'zh-CN', '删除管理员用户', '2025-07-19 09:21:16.934', '2025-07-19 09:21:16.934');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6mi00066xeuovsijd29', 'zh-TW', '更新帳號資訊', '2025-07-19 09:21:16.938', '2025-07-19 09:21:16.938');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6mi00066xeuovsijd29', 'en', 'Update account information', '2025-07-19 09:21:16.938', '2025-07-19 09:21:16.938');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6mi00066xeuovsijd29', 'zh-CN', '更新账户信息', '2025-07-19 09:21:16.938', '2025-07-19 09:21:16.938');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6mn00076xeu775zcyu0', 'zh-TW', 'api設定', '2025-07-19 09:21:16.944', '2025-07-19 09:21:16.944');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6mn00076xeu775zcyu0', 'en', 'api settings', '2025-07-19 09:21:16.944', '2025-07-19 09:21:16.944');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6mn00076xeu775zcyu0', 'zh-CN', 'api设置', '2025-07-19 09:21:16.944', '2025-07-19 09:21:16.944');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6ms00086xeu1wddcmkk', 'zh-TW', 'api列表', '2025-07-19 09:21:16.948', '2025-07-19 09:21:16.948');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6ms00086xeu1wddcmkk', 'en', 'api list', '2025-07-19 09:21:16.948', '2025-07-19 09:21:16.948');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6ms00086xeu1wddcmkk', 'zh-CN', 'api列表', '2025-07-19 09:21:16.948', '2025-07-19 09:21:16.948');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6mw00096xeu4ye659yf', 'zh-TW', '所有api', '2025-07-19 09:21:16.953', '2025-07-19 09:21:16.953');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6mw00096xeu4ye659yf', 'en', 'All APIs', '2025-07-19 09:21:16.953', '2025-07-19 09:21:16.953');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6mw00096xeu4ye659yf', 'zh-CN', '所有api', '2025-07-19 09:21:16.953', '2025-07-19 09:21:16.953');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6n1000a6xeuqftutfo6', 'zh-TW', '新增api', '2025-07-19 09:21:16.958', '2025-07-19 09:21:16.958');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6n1000a6xeuqftutfo6', 'en', 'New API', '2025-07-19 09:21:16.958', '2025-07-19 09:21:16.958');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6n1000a6xeuqftutfo6', 'zh-CN', '新增api', '2025-07-19 09:21:16.958', '2025-07-19 09:21:16.958');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6n7000b6xeux6rs01yw', 'zh-TW', '編輯api', '2025-07-19 09:21:16.963', '2025-07-19 09:21:16.963');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6n7000b6xeux6rs01yw', 'en', 'Edit API', '2025-07-19 09:21:16.963', '2025-07-19 09:21:16.963');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6n7000b6xeux6rs01yw', 'zh-CN', '编辑api', '2025-07-19 09:21:16.963', '2025-07-19 09:21:16.963');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6nc000c6xeug1pbciqd', 'zh-TW', '刪除api', '2025-07-19 09:21:16.969', '2025-07-19 09:21:16.969');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6nc000c6xeug1pbciqd', 'en', 'delete api', '2025-07-19 09:21:16.969', '2025-07-19 09:21:16.969');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6nc000c6xeug1pbciqd', 'zh-CN', '删除api', '2025-07-19 09:21:16.969', '2025-07-19 09:21:16.969');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6nh000d6xeu9smvxhl2', 'zh-TW', '文章分類管理', '2025-07-19 09:21:16.973', '2025-07-19 09:21:16.973');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6nh000d6xeu9smvxhl2', 'en', 'Article classification management', '2025-07-19 09:21:16.973', '2025-07-19 09:21:16.973');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6nh000d6xeu9smvxhl2', 'zh-CN', '文章分类管理', '2025-07-19 09:21:16.973', '2025-07-19 09:21:16.973');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6nl000e6xeufikjkne1', 'zh-TW', '文章分類列表', '2025-07-19 09:21:16.978', '2025-07-19 09:21:16.978');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6nl000e6xeufikjkne1', 'en', 'Article category list', '2025-07-19 09:21:16.978', '2025-07-19 09:21:16.978');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6nl000e6xeufikjkne1', 'zh-CN', '文章分类列表', '2025-07-19 09:21:16.978', '2025-07-19 09:21:16.978');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6nr000f6xeuhukt47p8', 'zh-TW', '取得子分類', '2025-07-19 09:21:16.983', '2025-07-19 09:21:16.983');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6nr000f6xeuhukt47p8', 'en', 'Get subcategory', '2025-07-19 09:21:16.983', '2025-07-19 09:21:16.983');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6nr000f6xeuhukt47p8', 'zh-CN', '获取子分类', '2025-07-19 09:21:16.983', '2025-07-19 09:21:16.983');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6nv000g6xeu0j9geo9u', 'zh-TW', '新增文章分類', '2025-07-19 09:21:16.987', '2025-07-19 09:21:16.987');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6nv000g6xeu0j9geo9u', 'en', 'Add article category', '2025-07-19 09:21:16.987', '2025-07-19 09:21:16.987');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6nv000g6xeu0j9geo9u', 'zh-CN', '新增文章分类', '2025-07-19 09:21:16.987', '2025-07-19 09:21:16.987');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6nz000h6xeuq60x180y', 'zh-TW', '編輯文章分類', '2025-07-19 09:21:16.991', '2025-07-19 09:21:16.991');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6nz000h6xeuq60x180y', 'en', 'Edit article category', '2025-07-19 09:21:16.991', '2025-07-19 09:21:16.991');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6nz000h6xeuq60x180y', 'zh-CN', '编辑文章分类', '2025-07-19 09:21:16.991', '2025-07-19 09:21:16.991');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6o3000i6xeugeqi2gr6', 'zh-TW', '刪除文章分類', '2025-07-19 09:21:16.995', '2025-07-19 09:21:16.995');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6o3000i6xeugeqi2gr6', 'en', 'Delete article category', '2025-07-19 09:21:16.995', '2025-07-19 09:21:16.995');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6o3000i6xeugeqi2gr6', 'zh-CN', '删除文章分类', '2025-07-19 09:21:16.995', '2025-07-19 09:21:16.995');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6o7000j6xeu52zvw3oe', 'zh-TW', '文章管理', '2025-07-19 09:21:17', '2025-07-19 09:21:17');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6o7000j6xeu52zvw3oe', 'en', 'Article management', '2025-07-19 09:21:17', '2025-07-19 09:21:17');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6o7000j6xeu52zvw3oe', 'zh-CN', '文章管理', '2025-07-19 09:21:17', '2025-07-19 09:21:17');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6ob000k6xeutnpcmvlm', 'zh-TW', '文章列表', '2025-07-19 09:21:17.004', '2025-07-19 09:21:17.004');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6ob000k6xeutnpcmvlm', 'en', 'Article list', '2025-07-19 09:21:17.004', '2025-07-19 09:21:17.004');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6ob000k6xeutnpcmvlm', 'zh-CN', '文章列表', '2025-07-19 09:21:17.004', '2025-07-19 09:21:17.004');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6og000l6xeur7t2wphs', 'zh-TW', '文章詳情', '2025-07-19 09:21:17.008', '2025-07-19 09:21:17.008');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6og000l6xeur7t2wphs', 'en', 'Article details', '2025-07-19 09:21:17.008', '2025-07-19 09:21:17.008');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6og000l6xeur7t2wphs', 'zh-CN', '文章详情', '2025-07-19 09:21:17.008', '2025-07-19 09:21:17.008');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6ok000m6xeu2bgebg4v', 'zh-TW', '創建文章', '2025-07-19 09:21:17.013', '2025-07-19 09:21:17.013');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6ok000m6xeu2bgebg4v', 'en', 'Create article', '2025-07-19 09:21:17.013', '2025-07-19 09:21:17.013');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6ok000m6xeu2bgebg4v', 'zh-CN', '创建文章', '2025-07-19 09:21:17.013', '2025-07-19 09:21:17.013');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6op000n6xeuav9f7sgw', 'zh-TW', '編輯文章', '2025-07-19 09:21:17.017', '2025-07-19 09:21:17.017');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6op000n6xeuav9f7sgw', 'en', 'Edit article', '2025-07-19 09:21:17.017', '2025-07-19 09:21:17.017');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6op000n6xeuav9f7sgw', 'zh-CN', '编辑文章', '2025-07-19 09:21:17.017', '2025-07-19 09:21:17.017');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6ou000o6xeux9a1utnv', 'zh-TW', '刪除文章', '2025-07-19 09:21:17.023', '2025-07-19 09:21:17.023');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6ou000o6xeux9a1utnv', 'en', 'Delete article', '2025-07-19 09:21:17.023', '2025-07-19 09:21:17.023');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6ou000o6xeux9a1utnv', 'zh-CN', '删除文章', '2025-07-19 09:21:17.023', '2025-07-19 09:21:17.023');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6oz000p6xeu2livmlz2', 'zh-TW', '多語言設定', '2025-07-19 09:21:17.027', '2025-07-19 09:21:17.027');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6oz000p6xeu2livmlz2', 'en', 'Multi-language settings', '2025-07-19 09:21:17.027', '2025-07-19 09:21:17.027');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6oz000p6xeu2livmlz2', 'zh-CN', '多语言设置', '2025-07-19 09:21:17.027', '2025-07-19 09:21:17.027');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6p3000q6xeut4dqhx7n', 'zh-TW', '語言列表', '2025-07-19 09:21:17.032', '2025-07-19 09:21:17.032');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6p3000q6xeut4dqhx7n', 'en', 'Language list', '2025-07-19 09:21:17.032', '2025-07-19 09:21:17.032');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6p3000q6xeut4dqhx7n', 'zh-CN', '语言列表', '2025-07-19 09:21:17.032', '2025-07-19 09:21:17.032');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6p8000r6xeu4h4z4gt6', 'zh-TW', '新增語言', '2025-07-19 09:21:17.036', '2025-07-19 09:21:17.036');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6p8000r6xeu4h4z4gt6', 'en', 'Add new language', '2025-07-19 09:21:17.036', '2025-07-19 09:21:17.036');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6p8000r6xeu4h4z4gt6', 'zh-CN', '新增语言', '2025-07-19 09:21:17.036', '2025-07-19 09:21:17.036');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6pd000s6xeuf86uuevf', 'zh-TW', '編輯語言', '2025-07-19 09:21:17.042', '2025-07-19 09:21:17.042');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6pd000s6xeuf86uuevf', 'en', 'editing language', '2025-07-19 09:21:17.042', '2025-07-19 09:21:17.042');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6pd000s6xeuf86uuevf', 'zh-CN', '编辑语言', '2025-07-19 09:21:17.042', '2025-07-19 09:21:17.042');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6pi000t6xeuf78or3bn', 'zh-TW', '刪除語言', '2025-07-19 09:21:17.047', '2025-07-19 09:21:17.047');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6pi000t6xeuf78or3bn', 'en', 'Delete language', '2025-07-19 09:21:17.047', '2025-07-19 09:21:17.047');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6pi000t6xeuf78or3bn', 'zh-CN', '删除语言', '2025-07-19 09:21:17.047', '2025-07-19 09:21:17.047');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6po000u6xeuovbmrmim', 'zh-TW', '角色設定', '2025-07-19 09:21:17.052', '2025-07-19 09:21:17.052');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6po000u6xeuovbmrmim', 'en', 'Role settings', '2025-07-19 09:21:17.052', '2025-07-19 09:21:17.052');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6po000u6xeuovbmrmim', 'zh-CN', '角色设置', '2025-07-19 09:21:17.052', '2025-07-19 09:21:17.052');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6pu000v6xeuxltq7u4i', 'zh-TW', '角色列表', '2025-07-19 09:21:17.058', '2025-07-19 09:21:17.058');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6pu000v6xeuxltq7u4i', 'en', 'role list', '2025-07-19 09:21:17.058', '2025-07-19 09:21:17.058');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6pu000v6xeuxltq7u4i', 'zh-CN', '角色列表', '2025-07-19 09:21:17.058', '2025-07-19 09:21:17.058');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6pz000w6xeus0zjx34i', 'zh-TW', '所有角色', '2025-07-19 09:21:17.063', '2025-07-19 09:21:17.063');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6pz000w6xeus0zjx34i', 'en', 'All roles', '2025-07-19 09:21:17.063', '2025-07-19 09:21:17.063');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6pz000w6xeus0zjx34i', 'zh-CN', '所有角色', '2025-07-19 09:21:17.063', '2025-07-19 09:21:17.063');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6q4000x6xeu45itlad6', 'zh-TW', '新增角色', '2025-07-19 09:21:17.069', '2025-07-19 09:21:17.069');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6q4000x6xeu45itlad6', 'en', 'Add new role', '2025-07-19 09:21:17.069', '2025-07-19 09:21:17.069');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6q4000x6xeu45itlad6', 'zh-CN', '新增角色', '2025-07-19 09:21:17.069', '2025-07-19 09:21:17.069');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6qa000y6xeuh5m7gjl6', 'zh-TW', '編輯角色', '2025-07-19 09:21:17.074', '2025-07-19 09:21:17.074');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6qa000y6xeuh5m7gjl6', 'en', 'Edit role', '2025-07-19 09:21:17.074', '2025-07-19 09:21:17.074');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6qa000y6xeuh5m7gjl6', 'zh-CN', '编辑角色', '2025-07-19 09:21:17.074', '2025-07-19 09:21:17.074');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6qg000z6xeu02ezoh6p', 'zh-TW', '刪除角色', '2025-07-19 09:21:17.08', '2025-07-19 09:21:17.08');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6qg000z6xeu02ezoh6p', 'en', 'Delete role', '2025-07-19 09:21:17.08', '2025-07-19 09:21:17.08');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6qg000z6xeu02ezoh6p', 'zh-CN', '删除角色', '2025-07-19 09:21:17.08', '2025-07-19 09:21:17.08');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6qm00106xeun0rce7ou', 'zh-TW', '選單設定', '2025-07-19 09:21:17.087', '2025-07-19 09:21:17.087');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6qm00106xeun0rce7ou', 'en', 'Menu settings', '2025-07-19 09:21:17.087', '2025-07-19 09:21:17.087');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6qm00106xeun0rce7ou', 'zh-CN', '菜单设置', '2025-07-19 09:21:17.087', '2025-07-19 09:21:17.087');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6qr00116xeuo70mb3wk', 'zh-TW', '選單列表', '2025-07-19 09:21:17.092', '2025-07-19 09:21:17.092');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6qr00116xeuo70mb3wk', 'en', 'Menu list', '2025-07-19 09:21:17.092', '2025-07-19 09:21:17.092');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6qr00116xeuo70mb3wk', 'zh-CN', '菜单列表', '2025-07-19 09:21:17.092', '2025-07-19 09:21:17.092');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6qy00126xeue4ra1bz3', 'zh-TW', '所有路由', '2025-07-19 09:21:17.099', '2025-07-19 09:21:17.099');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6qy00126xeue4ra1bz3', 'en', 'All routes', '2025-07-19 09:21:17.099', '2025-07-19 09:21:17.099');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6qy00126xeue4ra1bz3', 'zh-CN', '所有路由', '2025-07-19 09:21:17.099', '2025-07-19 09:21:17.099');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6r700136xeubk721q4j', 'zh-TW', '新增選單', '2025-07-19 09:21:17.108', '2025-07-19 09:21:17.108');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6r700136xeubk721q4j', 'en', 'New menu', '2025-07-19 09:21:17.108', '2025-07-19 09:21:17.108');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6r700136xeubk721q4j', 'zh-CN', '新增菜单', '2025-07-19 09:21:17.108', '2025-07-19 09:21:17.108');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6rg00146xeuy55x24rl', 'zh-TW', '編輯選單', '2025-07-19 09:21:17.116', '2025-07-19 09:21:17.116');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6rg00146xeuy55x24rl', 'en', 'Edit menu', '2025-07-19 09:21:17.116', '2025-07-19 09:21:17.116');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6rg00146xeuy55x24rl', 'zh-CN', '编辑菜单', '2025-07-19 09:21:17.116', '2025-07-19 09:21:17.116');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6rl00156xeur8j7wvwc', 'zh-TW', '刪除選單', '2025-07-19 09:21:17.121', '2025-07-19 09:21:17.121');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6rl00156xeur8j7wvwc', 'en', 'delete menu', '2025-07-19 09:21:17.121', '2025-07-19 09:21:17.121');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6rl00156xeur8j7wvwc', 'zh-CN', '删除菜单', '2025-07-19 09:21:17.121', '2025-07-19 09:21:17.121');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6rs00166xeujxjbnw8a', 'zh-TW', '文件管理', '2025-07-19 09:21:17.128', '2025-07-19 09:21:17.128');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6rs00166xeujxjbnw8a', 'en', 'File management', '2025-07-19 09:21:17.128', '2025-07-19 09:21:17.128');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6rs00166xeujxjbnw8a', 'zh-CN', '文件管理', '2025-07-19 09:21:17.128', '2025-07-19 09:21:17.128');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6rx00176xeu7jsqqgv9', 'zh-TW', '文件和分組列表', '2025-07-19 09:21:17.134', '2025-07-19 09:21:17.134');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6rx00176xeu7jsqqgv9', 'en', 'File and group lists', '2025-07-19 09:21:17.134', '2025-07-19 09:21:17.134');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6rx00176xeu7jsqqgv9', 'zh-CN', '文件和分组列表', '2025-07-19 09:21:17.134', '2025-07-19 09:21:17.134');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6s300186xeua6zb0qn8', 'zh-TW', '上傳文件', '2025-07-19 09:21:17.139', '2025-07-19 09:21:17.139');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6s300186xeua6zb0qn8', 'en', 'Upload files', '2025-07-19 09:21:17.139', '2025-07-19 09:21:17.139');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6s300186xeua6zb0qn8', 'zh-CN', '上传文件', '2025-07-19 09:21:17.139', '2025-07-19 09:21:17.139');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6s700196xeumyg1n73n', 'zh-TW', '編輯文件資訊', '2025-07-19 09:21:17.143', '2025-07-19 09:21:17.143');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6s700196xeumyg1n73n', 'en', 'Edit file information', '2025-07-19 09:21:17.143', '2025-07-19 09:21:17.143');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6s700196xeumyg1n73n', 'zh-CN', '编辑文件信息', '2025-07-19 09:21:17.143', '2025-07-19 09:21:17.143');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6sb001a6xeueks7h0o2', 'zh-TW', '刪除文件', '2025-07-19 09:21:17.147', '2025-07-19 09:21:17.147');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6sb001a6xeueks7h0o2', 'en', 'Delete file', '2025-07-19 09:21:17.147', '2025-07-19 09:21:17.147');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6sb001a6xeueks7h0o2', 'zh-CN', '删除文件', '2025-07-19 09:21:17.147', '2025-07-19 09:21:17.147');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6sf001b6xeukibbn98b', 'zh-TW', '文件分組管理', '2025-07-19 09:21:17.151', '2025-07-19 09:21:17.151');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6sf001b6xeukibbn98b', 'en', 'File group management', '2025-07-19 09:21:17.151', '2025-07-19 09:21:17.151');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6sf001b6xeukibbn98b', 'zh-CN', '文件分组管理', '2025-07-19 09:21:17.151', '2025-07-19 09:21:17.151');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6sk001c6xeu6vfif4to', 'zh-TW', '取得所有子分組', '2025-07-19 09:21:17.157', '2025-07-19 09:21:17.157');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6sk001c6xeu6vfif4to', 'en', 'Get all subgroups', '2025-07-19 09:21:17.157', '2025-07-19 09:21:17.157');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6sk001c6xeu6vfif4to', 'zh-CN', '获取所有子分组', '2025-07-19 09:21:17.157', '2025-07-19 09:21:17.157');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6so001d6xeu39hrcqea', 'zh-TW', '新增檔案分組', '2025-07-19 09:21:17.16', '2025-07-19 09:21:17.16');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6so001d6xeu39hrcqea', 'en', 'Add new file group', '2025-07-19 09:21:17.16', '2025-07-19 09:21:17.16');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6so001d6xeu39hrcqea', 'zh-CN', '新增文件分组', '2025-07-19 09:21:17.16', '2025-07-19 09:21:17.16');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6st001e6xeua94edcad', 'zh-TW', '編輯文件分組', '2025-07-19 09:21:17.166', '2025-07-19 09:21:17.166');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6st001e6xeua94edcad', 'en', 'Edit file group', '2025-07-19 09:21:17.166', '2025-07-19 09:21:17.166');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6st001e6xeua94edcad', 'zh-CN', '编辑文件分组', '2025-07-19 09:21:17.166', '2025-07-19 09:21:17.166');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6sy001f6xeujz6386ng', 'zh-TW', '刪除文件分組', '2025-07-19 09:21:17.17', '2025-07-19 09:21:17.17');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6sy001f6xeujz6386ng', 'en', 'Delete file group', '2025-07-19 09:21:17.17', '2025-07-19 09:21:17.17');
INSERT INTO public."AdminApiTranslation" VALUES ('cmda1g6sy001f6xeujz6386ng', 'zh-CN', '删除文件分组', '2025-07-19 09:21:17.17', '2025-07-19 09:21:17.17');


--
-- Data for Name: AdminRole; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: AdminRoleRoute; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: AdminRoleTranslation; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: AdminRoute; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."AdminRoute" VALUES ('cmda1g6tg001g6xeujpci107l', 'Collection', '/content/file', false, '', 'GROUP', '', true, '/content', '0', 100, '2025-07-19 09:21:17.188', '2025-07-19 09:21:17.188');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6tq001h6xeuae8b2r3q', 'Picture', '', false, 'content/file/file-resources', 'MENU', '', true, '/content/file', 'cmda1g6tg001g6xeujpci107l', 100, '2025-07-19 09:21:17.198', '2025-07-19 09:21:17.198');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6tx001i6xeucdzcis14', '', '', false, '', 'BUTTON', 'upload-file', true, '-', 'cmda1g6tq001h6xeuae8b2r3q', 100, '2025-07-19 09:21:17.206', '2025-07-19 09:21:17.206');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6u4001j6xeuwplglf3n', '', '', false, '', 'BUTTON', 'edit-file', true, '-', 'cmda1g6tq001h6xeuae8b2r3q', 100, '2025-07-19 09:21:17.213', '2025-07-19 09:21:17.213');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6ua001k6xeuxpzjm6dz', '', '', false, '', 'BUTTON', 'delete-file', true, '-', 'cmda1g6tq001h6xeuae8b2r3q', 100, '2025-07-19 09:21:17.218', '2025-07-19 09:21:17.218');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6ue001l6xeu7yyq2glr', '', '', false, '', 'BUTTON', 'add-group', true, '-', 'cmda1g6tq001h6xeuae8b2r3q', 100, '2025-07-19 09:21:17.223', '2025-07-19 09:21:17.223');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6uk001m6xeueojkgln1', '', '', false, '', 'BUTTON', 'edit-group', true, '-', 'cmda1g6tq001h6xeuae8b2r3q', 100, '2025-07-19 09:21:17.228', '2025-07-19 09:21:17.228');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6up001n6xeuefk5hdub', '', '', false, '', 'BUTTON', 'delete-group', true, '-', 'cmda1g6tq001h6xeuae8b2r3q', 100, '2025-07-19 09:21:17.233', '2025-07-19 09:21:17.233');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6uu001o6xeucvch0b25', '', '/content/article-category/list', false, '', 'SMALL_GROUP', '', true, '/content/article-category', 'cmda1g6tg001g6xeujpci107l', 100, '2025-07-19 09:21:17.238', '2025-07-19 09:21:17.238');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6v5001q6xeual0qi6nm', '', '', false, '', 'BUTTON', 'add', true, '-', 'cmda1g6uy001p6xeu7yyt8y8l', 100, '2025-07-19 09:21:17.249', '2025-07-19 09:21:17.249');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6va001r6xeu5mfiktfp', '', '', false, '', 'BUTTON', 'edit', true, '-', 'cmda1g6uy001p6xeu7yyt8y8l', 100, '2025-07-19 09:21:17.254', '2025-07-19 09:21:17.254');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6ve001s6xeud4s27rn0', '', '', false, '', 'BUTTON', 'delete', true, '-', 'cmda1g6uy001p6xeu7yyt8y8l', 100, '2025-07-19 09:21:17.258', '2025-07-19 09:21:17.258');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6vn001u6xeudcgawxbv', '', '', false, '', 'BUTTON', 'add', true, '-', 'cmda1g6vj001t6xeuf8n7ibol', 100, '2025-07-19 09:21:17.268', '2025-07-19 09:21:17.268');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6vt001v6xeusyjiwueq', '', '', false, '', 'BUTTON', 'edit', true, '-', 'cmda1g6vj001t6xeuf8n7ibol', 100, '2025-07-19 09:21:17.273', '2025-07-19 09:21:17.273');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6vy001w6xeud9oiquh7', '', '', false, '', 'BUTTON', 'delete', true, '-', 'cmda1g6vj001t6xeuf8n7ibol', 100, '2025-07-19 09:21:17.278', '2025-07-19 09:21:17.278');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6w3001x6xeugpf8n29o', '', '', true, 'content/article/article-detail', 'MENU', '', true, '/content/article/detail', 'cmda1g6uu001o6xeucvch0b25', 100, '2025-07-19 09:21:17.284', '2025-07-19 09:21:17.284');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6w9001y6xeu7s56ni1t', '', '', false, '', 'BUTTON', 'add', true, '-', 'cmda1g6w3001x6xeugpf8n29o', 100, '2025-07-19 09:21:17.29', '2025-07-19 09:21:17.29');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6wd001z6xeumqi3x0o7', '', '', false, '', 'BUTTON', 'edit', true, '-', 'cmda1g6w3001x6xeugpf8n29o', 100, '2025-07-19 09:21:17.294', '2025-07-19 09:21:17.294');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6wk00206xeucoaq0ac1', 'Setting', '/settings/admin-user', false, '', 'GROUP', '', true, '/settings', '0', 100, '2025-07-19 09:21:17.301', '2025-07-19 09:21:17.301');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6wo00216xeu9am4uyis', 'User', '', false, 'settings/admin-user/admin-user', 'MENU', '', true, '/settings/admin-user', 'cmda1g6wk00206xeucoaq0ac1', 100, '2025-07-19 09:21:17.304', '2025-07-19 09:21:17.304');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6wv00226xeupaot5haz', '', '', false, '', 'BUTTON', 'add', true, '-', 'cmda1g6wo00216xeu9am4uyis', 100, '2025-07-19 09:21:17.311', '2025-07-19 09:21:17.311');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6x200236xeudaaq32dx', '', '', false, '', 'BUTTON', 'edit', true, '-', 'cmda1g6wo00216xeu9am4uyis', 100, '2025-07-19 09:21:17.318', '2025-07-19 09:21:17.318');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6x800246xeu5tap85gv', '', '', false, '', 'BUTTON', 'delete', true, '-', 'cmda1g6wo00216xeu9am4uyis', 100, '2025-07-19 09:21:17.325', '2025-07-19 09:21:17.325');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6xe00256xeuz1koc09l', '', '/settings/permission/admin-role', false, '', 'SMALL_GROUP', '', true, '/settings/permission', 'cmda1g6wk00206xeucoaq0ac1', 100, '2025-07-19 09:21:17.33', '2025-07-19 09:21:17.33');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6xi00266xeu5kqeiljr', 'Avatar', '', false, 'settings/permissions/admin-role/admin-role', 'MENU', '', true, '/settings/permissions/admin-role', 'cmda1g6xe00256xeuz1koc09l', 100, '2025-07-19 09:21:17.334', '2025-07-19 09:21:17.334');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6xo00276xeue8jmuunq', '', '', false, '', 'BUTTON', 'add', true, '-', 'cmda1g6xi00266xeu5kqeiljr', 100, '2025-07-19 09:21:17.34', '2025-07-19 09:21:17.34');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6xs00286xeu6e1zkoo3', '', '', false, '', 'BUTTON', 'edit', true, '-', 'cmda1g6xi00266xeu5kqeiljr', 100, '2025-07-19 09:21:17.344', '2025-07-19 09:21:17.344');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6xz00296xeu1x88776h', '', '', false, '', 'BUTTON', 'delete', true, '-', 'cmda1g6xi00266xeu5kqeiljr', 100, '2025-07-19 09:21:17.351', '2025-07-19 09:21:17.351');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6y5002a6xeunc2c8hya', 'Operation', '', false, 'settings/permissions/admin-route/admin-route', 'MENU', '', true, '/settings/permissions/admin-route', 'cmda1g6xe00256xeuz1koc09l', 100, '2025-07-19 09:21:17.357', '2025-07-19 09:21:17.357');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6ye002b6xeu4e47wf6d', '', '', false, '', 'BUTTON', 'add', true, '-', 'cmda1g6y5002a6xeunc2c8hya', 100, '2025-07-19 09:21:17.366', '2025-07-19 09:21:17.366');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6yk002c6xeuo0qp6qbu', '', '', false, '', 'BUTTON', 'edit', true, '-', 'cmda1g6y5002a6xeunc2c8hya', 100, '2025-07-19 09:21:17.372', '2025-07-19 09:21:17.372');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6yr002d6xeuz8kdwkro', '', '', false, '', 'BUTTON', 'delete', true, '-', 'cmda1g6y5002a6xeunc2c8hya', 100, '2025-07-19 09:21:17.379', '2025-07-19 09:21:17.379');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6yw002e6xeubcpbt0w2', 'Document', '', false, 'settings/permissions/admin-api/admin-api', 'MENU', '', true, '/settings/permissions/admin-api', 'cmda1g6xe00256xeuz1koc09l', 100, '2025-07-19 09:21:17.385', '2025-07-19 09:21:17.385');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6z2002f6xeumvd29z5i', '', '', false, '', 'BUTTON', 'add', true, '-', 'cmda1g6yw002e6xeubcpbt0w2', 100, '2025-07-19 09:21:17.391', '2025-07-19 09:21:17.391');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6z9002g6xeuiqyak5dv', '', '', false, '', 'BUTTON', 'edit', true, '-', 'cmda1g6yw002e6xeubcpbt0w2', 100, '2025-07-19 09:21:17.397', '2025-07-19 09:21:17.397');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6ze002h6xeuznwib8vq', '', '', false, '', 'BUTTON', 'delete', true, '-', 'cmda1g6yw002e6xeubcpbt0w2', 100, '2025-07-19 09:21:17.403', '2025-07-19 09:21:17.403');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6uy001p6xeu7yyt8y8l', 'Collection', '', false, 'content/article-category/article-category', 'MENU', '', true, '/content/article-category/list', 'cmda1g6uu001o6xeucvch0b25', 100, '2025-07-19 09:21:17.242', '2025-07-19 10:06:38.308');
INSERT INTO public."AdminRoute" VALUES ('cmda1g6vj001t6xeuf8n7ibol', 'Memo', '', false, 'content/article/article', 'MENU', '', true, '/content/article/list', 'cmda1g6uu001o6xeucvch0b25', 100, '2025-07-19 09:21:17.264', '2025-07-19 10:06:44.125');
INSERT INTO public."AdminRoute" VALUES ('cmda33yvf00006xd17jp42mpa', '', '', false, '', 'SMALL_GROUP', '', true, '-', 'cmda1g6wk00206xeucoaq0ac1', 10, '2025-07-19 10:07:46.251', '2025-07-19 10:07:46.251');
INSERT INTO public."AdminRoute" VALUES ('cmda35czy00016xd1pxacsazj', 'Setting', '', false, 'settings/system-settings/storage-setting/storage-setting', 'MENU', '', true, '/settings/storage-setting', 'cmda33yvf00006xd17jp42mpa', 10, '2025-07-19 10:08:51.215', '2025-07-19 10:09:47.108');


--
-- Data for Name: AdminRouteApi; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6tq001h6xeuae8b2r3q', 'cmda1g6sk001c6xeu6vfif4to');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6tq001h6xeuae8b2r3q', 'cmda1g6rx00176xeu7jsqqgv9');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6tx001i6xeucdzcis14', 'cmda1g6s300186xeua6zb0qn8');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6u4001j6xeuwplglf3n', 'cmda1g6s700196xeumyg1n73n');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6ua001k6xeuxpzjm6dz', 'cmda1g6sb001a6xeueks7h0o2');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6ue001l6xeu7yyq2glr', 'cmda1g6so001d6xeu39hrcqea');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6uk001m6xeueojkgln1', 'cmda1g6st001e6xeua94edcad');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6up001n6xeuefk5hdub', 'cmda1g6sy001f6xeujz6386ng');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6v5001q6xeual0qi6nm', 'cmda1g6nv000g6xeu0j9geo9u');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6va001r6xeu5mfiktfp', 'cmda1g6nz000h6xeuq60x180y');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6ve001s6xeud4s27rn0', 'cmda1g6o3000i6xeugeqi2gr6');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6vn001u6xeudcgawxbv', 'cmda1g6ok000m6xeu2bgebg4v');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6vt001v6xeusyjiwueq', 'cmda1g6op000n6xeuav9f7sgw');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6vy001w6xeud9oiquh7', 'cmda1g6ou000o6xeux9a1utnv');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6w3001x6xeugpf8n29o', 'cmda1g6og000l6xeur7t2wphs');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6w9001y6xeu7s56ni1t', 'cmda1g6ok000m6xeu2bgebg4v');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6wd001z6xeumqi3x0o7', 'cmda1g6op000n6xeuav9f7sgw');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6wo00216xeu9am4uyis', 'cmda1g6pz000w6xeus0zjx34i');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6wo00216xeu9am4uyis', 'cmda1g6ly00026xeuf8n9p3qs');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6wv00226xeupaot5haz', 'cmda1g6m400036xeuy0824o45');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6x200236xeudaaq32dx', 'cmda1g6m900046xeu5zoz07of');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6x800246xeu5tap85gv', 'cmda1g6md00056xeuhssm5p2s');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6xi00266xeu5kqeiljr', 'cmda1g6qy00126xeue4ra1bz3');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6xi00266xeu5kqeiljr', 'cmda1g6pu000v6xeuxltq7u4i');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6xo00276xeue8jmuunq', 'cmda1g6q4000x6xeu45itlad6');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6xs00286xeu6e1zkoo3', 'cmda1g6qa000y6xeuh5m7gjl6');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6xz00296xeu1x88776h', 'cmda1g6qg000z6xeu02ezoh6p');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6y5002a6xeunc2c8hya', 'cmda1g6mw00096xeu4ye659yf');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6y5002a6xeunc2c8hya', 'cmda1g6qy00126xeue4ra1bz3');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6ye002b6xeu4e47wf6d', 'cmda1g6r700136xeubk721q4j');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6yk002c6xeuo0qp6qbu', 'cmda1g6rg00146xeuy55x24rl');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6yr002d6xeuz8kdwkro', 'cmda1g6rl00156xeur8j7wvwc');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6yw002e6xeubcpbt0w2', 'cmda1g6mw00096xeu4ye659yf');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6z2002f6xeumvd29z5i', 'cmda1g6n1000a6xeuqftutfo6');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6z9002g6xeuiqyak5dv', 'cmda1g6n7000b6xeux6rs01yw');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6ze002h6xeuznwib8vq', 'cmda1g6nc000c6xeug1pbciqd');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6uy001p6xeu7yyt8y8l', 'cmda1g6nl000e6xeufikjkne1');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6uy001p6xeu7yyt8y8l', 'cmda1g6nr000f6xeuhukt47p8');
INSERT INTO public."AdminRouteApi" VALUES ('cmda1g6vj001t6xeuf8n7ibol', 'cmda1g6ob000k6xeutnpcmvlm');
INSERT INTO public."AdminRouteApi" VALUES ('cmda35czy00016xd1pxacsazj', 'cmda1g6lm00016xeugd7laa8q');


--
-- Data for Name: AdminRouteTranslation; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6tg001g6xeujpci107l', 'zh-TW', '內容管理', '2025-07-19 09:21:17.188', '2025-07-19 09:21:17.188');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6tg001g6xeujpci107l', 'en', 'Content management', '2025-07-19 09:21:17.188', '2025-07-19 09:21:17.188');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6tg001g6xeujpci107l', 'zh-CN', '内容管理', '2025-07-19 09:21:17.188', '2025-07-19 09:21:17.188');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6tq001h6xeuae8b2r3q', 'zh-TW', '文件管理', '2025-07-19 09:21:17.198', '2025-07-19 09:21:17.198');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6tq001h6xeuae8b2r3q', 'en', 'File management', '2025-07-19 09:21:17.198', '2025-07-19 09:21:17.198');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6tq001h6xeuae8b2r3q', 'zh-CN', '文件管理', '2025-07-19 09:21:17.198', '2025-07-19 09:21:17.198');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6tx001i6xeucdzcis14', 'zh-TW', '上傳文件', '2025-07-19 09:21:17.206', '2025-07-19 09:21:17.206');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6tx001i6xeucdzcis14', 'en', 'Upload files', '2025-07-19 09:21:17.206', '2025-07-19 09:21:17.206');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6tx001i6xeucdzcis14', 'zh-CN', '上传文件', '2025-07-19 09:21:17.206', '2025-07-19 09:21:17.206');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6u4001j6xeuwplglf3n', 'zh-TW', '編輯文件', '2025-07-19 09:21:17.213', '2025-07-19 09:21:17.213');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6u4001j6xeuwplglf3n', 'en', 'Edit file', '2025-07-19 09:21:17.213', '2025-07-19 09:21:17.213');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6u4001j6xeuwplglf3n', 'zh-CN', '编辑文件', '2025-07-19 09:21:17.213', '2025-07-19 09:21:17.213');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6ua001k6xeuxpzjm6dz', 'zh-TW', '刪除文件', '2025-07-19 09:21:17.218', '2025-07-19 09:21:17.218');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6ua001k6xeuxpzjm6dz', 'en', 'Delete files', '2025-07-19 09:21:17.218', '2025-07-19 09:21:17.218');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6ua001k6xeuxpzjm6dz', 'zh-CN', '删除文件', '2025-07-19 09:21:17.218', '2025-07-19 09:21:17.218');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6ue001l6xeu7yyq2glr', 'zh-TW', '新增檔案分組', '2025-07-19 09:21:17.223', '2025-07-19 09:21:17.223');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6ue001l6xeu7yyq2glr', 'en', 'Add file group', '2025-07-19 09:21:17.223', '2025-07-19 09:21:17.223');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6ue001l6xeu7yyq2glr', 'zh-CN', '新增文件分组', '2025-07-19 09:21:17.223', '2025-07-19 09:21:17.223');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6uk001m6xeueojkgln1', 'zh-TW', '編輯文件分組', '2025-07-19 09:21:17.228', '2025-07-19 09:21:17.228');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6uk001m6xeueojkgln1', 'en', 'Edit file group', '2025-07-19 09:21:17.228', '2025-07-19 09:21:17.228');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6uk001m6xeueojkgln1', 'zh-CN', '编辑文件分组', '2025-07-19 09:21:17.228', '2025-07-19 09:21:17.228');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6up001n6xeuefk5hdub', 'zh-TW', '刪除文件分組', '2025-07-19 09:21:17.233', '2025-07-19 09:21:17.233');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6up001n6xeuefk5hdub', 'en', 'Delete file group', '2025-07-19 09:21:17.233', '2025-07-19 09:21:17.233');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6up001n6xeuefk5hdub', 'zh-CN', '删除文件分组', '2025-07-19 09:21:17.233', '2025-07-19 09:21:17.233');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6uu001o6xeucvch0b25', 'zh-TW', '文章管理', '2025-07-19 09:21:17.238', '2025-07-19 09:21:17.238');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6uu001o6xeucvch0b25', 'en', 'Article management', '2025-07-19 09:21:17.238', '2025-07-19 09:21:17.238');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6uu001o6xeucvch0b25', 'zh-CN', '文章管理', '2025-07-19 09:21:17.238', '2025-07-19 09:21:17.238');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6v5001q6xeual0qi6nm', 'zh-TW', '新增', '2025-07-19 09:21:17.249', '2025-07-19 09:21:17.249');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6v5001q6xeual0qi6nm', 'en', 'New', '2025-07-19 09:21:17.249', '2025-07-19 09:21:17.249');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6v5001q6xeual0qi6nm', 'zh-CN', '新增', '2025-07-19 09:21:17.249', '2025-07-19 09:21:17.249');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6va001r6xeu5mfiktfp', 'zh-TW', '編輯', '2025-07-19 09:21:17.254', '2025-07-19 09:21:17.254');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6va001r6xeu5mfiktfp', 'en', 'edit', '2025-07-19 09:21:17.254', '2025-07-19 09:21:17.254');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6va001r6xeu5mfiktfp', 'zh-CN', '编辑', '2025-07-19 09:21:17.254', '2025-07-19 09:21:17.254');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6ve001s6xeud4s27rn0', 'zh-TW', '刪除', '2025-07-19 09:21:17.258', '2025-07-19 09:21:17.258');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6ve001s6xeud4s27rn0', 'en', 'delete', '2025-07-19 09:21:17.258', '2025-07-19 09:21:17.258');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6ve001s6xeud4s27rn0', 'zh-CN', '删除', '2025-07-19 09:21:17.258', '2025-07-19 09:21:17.258');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6vn001u6xeudcgawxbv', 'zh-TW', '新增', '2025-07-19 09:21:17.268', '2025-07-19 09:21:17.268');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6vn001u6xeudcgawxbv', 'en', 'New', '2025-07-19 09:21:17.268', '2025-07-19 09:21:17.268');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6vn001u6xeudcgawxbv', 'zh-CN', '新增', '2025-07-19 09:21:17.268', '2025-07-19 09:21:17.268');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6vt001v6xeusyjiwueq', 'zh-TW', '編輯', '2025-07-19 09:21:17.273', '2025-07-19 09:21:17.273');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6vt001v6xeusyjiwueq', 'en', 'edit', '2025-07-19 09:21:17.273', '2025-07-19 09:21:17.273');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6vt001v6xeusyjiwueq', 'zh-CN', '编辑', '2025-07-19 09:21:17.273', '2025-07-19 09:21:17.273');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6vy001w6xeud9oiquh7', 'zh-TW', '刪除', '2025-07-19 09:21:17.278', '2025-07-19 09:21:17.278');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6vy001w6xeud9oiquh7', 'en', 'delete', '2025-07-19 09:21:17.278', '2025-07-19 09:21:17.278');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6vy001w6xeud9oiquh7', 'zh-CN', '删除', '2025-07-19 09:21:17.278', '2025-07-19 09:21:17.278');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6w3001x6xeugpf8n29o', 'zh-TW', '文章詳情', '2025-07-19 09:21:17.284', '2025-07-19 09:21:17.284');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6w3001x6xeugpf8n29o', 'en', 'Article details', '2025-07-19 09:21:17.284', '2025-07-19 09:21:17.284');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6w3001x6xeugpf8n29o', 'zh-CN', '文章详情', '2025-07-19 09:21:17.284', '2025-07-19 09:21:17.284');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6w9001y6xeu7s56ni1t', 'zh-TW', '新增', '2025-07-19 09:21:17.29', '2025-07-19 09:21:17.29');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6w9001y6xeu7s56ni1t', 'en', 'New', '2025-07-19 09:21:17.29', '2025-07-19 09:21:17.29');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6w9001y6xeu7s56ni1t', 'zh-CN', '新增', '2025-07-19 09:21:17.29', '2025-07-19 09:21:17.29');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6wd001z6xeumqi3x0o7', 'zh-TW', '編輯', '2025-07-19 09:21:17.294', '2025-07-19 09:21:17.294');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6wd001z6xeumqi3x0o7', 'en', 'edit', '2025-07-19 09:21:17.294', '2025-07-19 09:21:17.294');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6wd001z6xeumqi3x0o7', 'zh-CN', '编辑', '2025-07-19 09:21:17.294', '2025-07-19 09:21:17.294');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6wk00206xeucoaq0ac1', 'zh-TW', '設定', '2025-07-19 09:21:17.301', '2025-07-19 09:21:17.301');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6wk00206xeucoaq0ac1', 'en', 'set up', '2025-07-19 09:21:17.301', '2025-07-19 09:21:17.301');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6wk00206xeucoaq0ac1', 'zh-CN', '设置', '2025-07-19 09:21:17.301', '2025-07-19 09:21:17.301');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6wo00216xeu9am4uyis', 'zh-TW', '管理員帳號', '2025-07-19 09:21:17.304', '2025-07-19 09:21:17.304');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6wo00216xeu9am4uyis', 'en', 'Admin Users', '2025-07-19 09:21:17.304', '2025-07-19 09:21:17.304');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6wo00216xeu9am4uyis', 'zh-CN', '管理员账号', '2025-07-19 09:21:17.304', '2025-07-19 09:21:17.304');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6wv00226xeupaot5haz', 'zh-TW', '新增', '2025-07-19 09:21:17.311', '2025-07-19 09:21:17.311');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6wv00226xeupaot5haz', 'en', 'New', '2025-07-19 09:21:17.311', '2025-07-19 09:21:17.311');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6wv00226xeupaot5haz', 'zh-CN', '新增', '2025-07-19 09:21:17.311', '2025-07-19 09:21:17.311');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6x200236xeudaaq32dx', 'zh-TW', '編輯', '2025-07-19 09:21:17.318', '2025-07-19 09:21:17.318');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6x200236xeudaaq32dx', 'en', 'edit', '2025-07-19 09:21:17.318', '2025-07-19 09:21:17.318');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6x200236xeudaaq32dx', 'zh-CN', '编辑', '2025-07-19 09:21:17.318', '2025-07-19 09:21:17.318');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6x800246xeu5tap85gv', 'zh-TW', '刪除', '2025-07-19 09:21:17.325', '2025-07-19 09:21:17.325');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6x800246xeu5tap85gv', 'en', 'delete', '2025-07-19 09:21:17.325', '2025-07-19 09:21:17.325');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6x800246xeu5tap85gv', 'zh-CN', '删除', '2025-07-19 09:21:17.325', '2025-07-19 09:21:17.325');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6xe00256xeuz1koc09l', 'zh-TW', '權限設定', '2025-07-19 09:21:17.33', '2025-07-19 09:21:17.33');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6xe00256xeuz1koc09l', 'en', 'Permission settings', '2025-07-19 09:21:17.33', '2025-07-19 09:21:17.33');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6xe00256xeuz1koc09l', 'zh-CN', '权限设置', '2025-07-19 09:21:17.33', '2025-07-19 09:21:17.33');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6xi00266xeu5kqeiljr', 'zh-TW', '角色設定', '2025-07-19 09:21:17.334', '2025-07-19 09:21:17.334');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6xi00266xeu5kqeiljr', 'en', 'Character settings', '2025-07-19 09:21:17.334', '2025-07-19 09:21:17.334');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6xi00266xeu5kqeiljr', 'zh-CN', '角色设置', '2025-07-19 09:21:17.334', '2025-07-19 09:21:17.334');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6xo00276xeue8jmuunq', 'zh-TW', '新增', '2025-07-19 09:21:17.34', '2025-07-19 09:21:17.34');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6xo00276xeue8jmuunq', 'en', 'New', '2025-07-19 09:21:17.34', '2025-07-19 09:21:17.34');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6xo00276xeue8jmuunq', 'zh-CN', '新增', '2025-07-19 09:21:17.34', '2025-07-19 09:21:17.34');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6xs00286xeu6e1zkoo3', 'zh-TW', '編輯', '2025-07-19 09:21:17.344', '2025-07-19 09:21:17.344');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6xs00286xeu6e1zkoo3', 'en', 'edit', '2025-07-19 09:21:17.344', '2025-07-19 09:21:17.344');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6xs00286xeu6e1zkoo3', 'zh-CN', '编辑', '2025-07-19 09:21:17.344', '2025-07-19 09:21:17.344');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6xz00296xeu1x88776h', 'zh-TW', '刪除', '2025-07-19 09:21:17.351', '2025-07-19 09:21:17.351');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6xz00296xeu1x88776h', 'en', 'delete', '2025-07-19 09:21:17.351', '2025-07-19 09:21:17.351');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6xz00296xeu1x88776h', 'zh-CN', '删除', '2025-07-19 09:21:17.351', '2025-07-19 09:21:17.351');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6y5002a6xeunc2c8hya', 'zh-TW', '選單設定', '2025-07-19 09:21:17.357', '2025-07-19 09:21:17.357');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6y5002a6xeunc2c8hya', 'en', 'Menu settings', '2025-07-19 09:21:17.357', '2025-07-19 09:21:17.357');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6y5002a6xeunc2c8hya', 'zh-CN', '菜单设置', '2025-07-19 09:21:17.357', '2025-07-19 09:21:17.357');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6ye002b6xeu4e47wf6d', 'zh-TW', '新增', '2025-07-19 09:21:17.366', '2025-07-19 09:21:17.366');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6ye002b6xeu4e47wf6d', 'en', 'New', '2025-07-19 09:21:17.366', '2025-07-19 09:21:17.366');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6ye002b6xeu4e47wf6d', 'zh-CN', '新增', '2025-07-19 09:21:17.366', '2025-07-19 09:21:17.366');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6yk002c6xeuo0qp6qbu', 'zh-TW', '編輯', '2025-07-19 09:21:17.372', '2025-07-19 09:21:17.372');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6yk002c6xeuo0qp6qbu', 'en', 'edit', '2025-07-19 09:21:17.372', '2025-07-19 09:21:17.372');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6yk002c6xeuo0qp6qbu', 'zh-CN', '编辑', '2025-07-19 09:21:17.372', '2025-07-19 09:21:17.372');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6yr002d6xeuz8kdwkro', 'zh-TW', '刪除', '2025-07-19 09:21:17.379', '2025-07-19 09:21:17.379');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6yr002d6xeuz8kdwkro', 'en', 'delete', '2025-07-19 09:21:17.379', '2025-07-19 09:21:17.379');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6yr002d6xeuz8kdwkro', 'zh-CN', '删除', '2025-07-19 09:21:17.379', '2025-07-19 09:21:17.379');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6yw002e6xeubcpbt0w2', 'zh-TW', 'API設定', '2025-07-19 09:21:17.385', '2025-07-19 09:21:17.385');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6yw002e6xeubcpbt0w2', 'en', 'API settings', '2025-07-19 09:21:17.385', '2025-07-19 09:21:17.385');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6yw002e6xeubcpbt0w2', 'zh-CN', 'API设置', '2025-07-19 09:21:17.385', '2025-07-19 09:21:17.385');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6z2002f6xeumvd29z5i', 'zh-TW', '新增', '2025-07-19 09:21:17.391', '2025-07-19 09:21:17.391');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6z2002f6xeumvd29z5i', 'en', 'New', '2025-07-19 09:21:17.391', '2025-07-19 09:21:17.391');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6z2002f6xeumvd29z5i', 'zh-CN', '新增', '2025-07-19 09:21:17.391', '2025-07-19 09:21:17.391');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6z9002g6xeuiqyak5dv', 'zh-TW', '編輯', '2025-07-19 09:21:17.397', '2025-07-19 09:21:17.397');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6z9002g6xeuiqyak5dv', 'en', 'edit', '2025-07-19 09:21:17.397', '2025-07-19 09:21:17.397');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6z9002g6xeuiqyak5dv', 'zh-CN', '编辑', '2025-07-19 09:21:17.397', '2025-07-19 09:21:17.397');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6ze002h6xeuznwib8vq', 'zh-TW', '刪除', '2025-07-19 09:21:17.403', '2025-07-19 09:21:17.403');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6ze002h6xeuznwib8vq', 'en', 'delete', '2025-07-19 09:21:17.403', '2025-07-19 09:21:17.403');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6ze002h6xeuznwib8vq', 'zh-CN', '删除', '2025-07-19 09:21:17.403', '2025-07-19 09:21:17.403');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6uy001p6xeu7yyt8y8l', 'zh-TW', '文章分類列表', '2025-07-19 10:06:38.308', '2025-07-19 10:06:38.308');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6uy001p6xeu7yyt8y8l', 'en', 'Article category list', '2025-07-19 10:06:38.308', '2025-07-19 10:06:38.308');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6uy001p6xeu7yyt8y8l', 'zh-CN', '文章分类列表', '2025-07-19 10:06:38.308', '2025-07-19 10:06:38.308');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6vj001t6xeuf8n7ibol', 'zh-TW', '文章列表', '2025-07-19 10:06:44.125', '2025-07-19 10:06:44.125');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6vj001t6xeuf8n7ibol', 'en', 'Article list', '2025-07-19 10:06:44.125', '2025-07-19 10:06:44.125');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda1g6vj001t6xeuf8n7ibol', 'zh-CN', '文章列表', '2025-07-19 10:06:44.125', '2025-07-19 10:06:44.125');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda33yvf00006xd17jp42mpa', 'zh-TW', '系統設置', '2025-07-19 10:07:46.251', '2025-07-19 10:07:46.251');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda33yvf00006xd17jp42mpa', 'en', 'System Setting', '2025-07-19 10:07:46.251', '2025-07-19 10:07:46.251');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda33yvf00006xd17jp42mpa', 'zh-CN', '系统设置', '2025-07-19 10:07:46.251', '2025-07-19 10:07:46.251');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda35czy00016xd1pxacsazj', 'zh-TW', '存儲設置', '2025-07-19 10:09:47.108', '2025-07-19 10:09:47.108');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda35czy00016xd1pxacsazj', 'en', 'Storage Setting', '2025-07-19 10:09:47.108', '2025-07-19 10:09:47.108');
INSERT INTO public."AdminRouteTranslation" VALUES ('cmda35czy00016xd1pxacsazj', 'zh-CN', '存储设置', '2025-07-19 10:09:47.108', '2025-07-19 10:09:47.108');


--
-- Data for Name: AdminUser; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."AdminUser" VALUES ('cmda1g6jj00006xeuh5jwfnp3', 'super', 'c818a83915c41d0bf2b49121a52a3dbee0e66b5b6fe404cad1ad431a2bb82881', true, 0, '2025-07-19 09:21:16.831', '2025-07-19 09:21:16.831', '2025-07-23 15:52:50.505');


--
-- Data for Name: AdminUserRole; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: Article; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: ArticleCategory; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: ArticleCategoryTranslation; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: ArticleTranslation; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: FileStorage; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."FileStorage" VALUES ('o5byjox79oc9gho3jtfrp3ju', 'local', 'LOCAL', true, '/', NULL, NULL, NULL, NULL, '2025-07-19 10:10:07.095', '2025-07-19 10:10:07.095');
INSERT INTO public."FileStorage" VALUES ('z8l969ewcx8felqd2czmqeog', 'minio', 'S3', false, 'http://127.0.0.1:9000', 'minioadmin', 'minioadmin', 'http://127.0.0.1:9000/', 'aiknew', '2025-07-19 10:10:52.236', '2025-07-19 10:10:52.236');


--
-- Data for Name: Language; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Language" VALUES ('en', 'English', 'LTR', true, 10, '2025-07-19 09:21:16.84', '2025-07-23 15:52:50.515');
INSERT INTO public."Language" VALUES ('zh-TW', '中文繁体', 'LTR', true, 10, '2025-07-19 09:21:16.84', '2025-07-23 15:52:50.515');
INSERT INTO public."Language" VALUES ('zh-CN', '中文简体', 'LTR', true, 10, '2025-07-19 09:21:16.84', '2025-07-23 15:52:50.515');


--
-- Data for Name: SystemSetting; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: UploadFile; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: UploadFileGroup; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: UploadFileGroupPath; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: WebUser; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: WebsiteLanguage; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: ArticleCategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ArticleCategory_id_seq"', 1, false);


--
-- Name: Article_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Article_id_seq"', 1, false);


--
-- Name: AdminApiTranslation AdminApiTranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminApiTranslation"
    ADD CONSTRAINT "AdminApiTranslation_pkey" PRIMARY KEY ("apiId", "langKey");


--
-- Name: AdminApi AdminApi_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminApi"
    ADD CONSTRAINT "AdminApi_pkey" PRIMARY KEY (id);


--
-- Name: AdminRoleRoute AdminRoleRoute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminRoleRoute"
    ADD CONSTRAINT "AdminRoleRoute_pkey" PRIMARY KEY ("roleId", "routeId");


--
-- Name: AdminRoleTranslation AdminRoleTranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminRoleTranslation"
    ADD CONSTRAINT "AdminRoleTranslation_pkey" PRIMARY KEY ("adminRoleId", "langKey");


--
-- Name: AdminRole AdminRole_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminRole"
    ADD CONSTRAINT "AdminRole_pkey" PRIMARY KEY (id);


--
-- Name: AdminRouteApi AdminRouteApi_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminRouteApi"
    ADD CONSTRAINT "AdminRouteApi_pkey" PRIMARY KEY ("routeId", "apiId");


--
-- Name: AdminRouteTranslation AdminRouteTranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminRouteTranslation"
    ADD CONSTRAINT "AdminRouteTranslation_pkey" PRIMARY KEY ("routeId", "langKey");


--
-- Name: AdminRoute AdminRoute_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminRoute"
    ADD CONSTRAINT "AdminRoute_pkey" PRIMARY KEY (id);


--
-- Name: AdminUserRole AdminUserRole_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminUserRole"
    ADD CONSTRAINT "AdminUserRole_pkey" PRIMARY KEY ("adminUserId", "adminRoleId");


--
-- Name: AdminUser AdminUser_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminUser"
    ADD CONSTRAINT "AdminUser_pkey" PRIMARY KEY (id);


--
-- Name: ArticleCategoryTranslation ArticleCategoryTranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ArticleCategoryTranslation"
    ADD CONSTRAINT "ArticleCategoryTranslation_pkey" PRIMARY KEY ("articleCategoryId", "langKey");


--
-- Name: ArticleCategory ArticleCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ArticleCategory"
    ADD CONSTRAINT "ArticleCategory_pkey" PRIMARY KEY (id);


--
-- Name: ArticleTranslation ArticleTranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ArticleTranslation"
    ADD CONSTRAINT "ArticleTranslation_pkey" PRIMARY KEY ("articleId", "langKey");


--
-- Name: Article Article_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Article"
    ADD CONSTRAINT "Article_pkey" PRIMARY KEY (id);


--
-- Name: FileStorage FileStorage_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FileStorage"
    ADD CONSTRAINT "FileStorage_pkey" PRIMARY KEY (id);


--
-- Name: SystemSetting SystemSetting_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SystemSetting"
    ADD CONSTRAINT "SystemSetting_pkey" PRIMARY KEY (id);


--
-- Name: UploadFileGroupPath UploadFileGroupPath_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UploadFileGroupPath"
    ADD CONSTRAINT "UploadFileGroupPath_pkey" PRIMARY KEY ("ancestorId", "descendantId");


--
-- Name: UploadFileGroup UploadFileGroup_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UploadFileGroup"
    ADD CONSTRAINT "UploadFileGroup_pkey" PRIMARY KEY (id);


--
-- Name: UploadFile UploadFile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UploadFile"
    ADD CONSTRAINT "UploadFile_pkey" PRIMARY KEY (id);


--
-- Name: WebUser WebUser_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."WebUser"
    ADD CONSTRAINT "WebUser_pkey" PRIMARY KEY (id);


--
-- Name: AdminApi_url_method_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "AdminApi_url_method_key" ON public."AdminApi" USING btree (url, method);


--
-- Name: AdminUser_userName_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "AdminUser_userName_key" ON public."AdminUser" USING btree ("userName");


--
-- Name: ArticleTranslation_title_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "ArticleTranslation_title_key" ON public."ArticleTranslation" USING btree (title);


--
-- Name: Language_key_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Language_key_key" ON public."Language" USING btree (key);


--
-- Name: SystemSetting_key_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "SystemSetting_key_key" ON public."SystemSetting" USING btree (key);


--
-- Name: UploadFileGroup_groupName_parentId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "UploadFileGroup_groupName_parentId_key" ON public."UploadFileGroup" USING btree ("groupName", "parentId");


--
-- Name: UploadFile_originalName_groupId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "UploadFile_originalName_groupId_key" ON public."UploadFile" USING btree ("originalName", "groupId");


--
-- Name: WebUser_userName_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "WebUser_userName_key" ON public."WebUser" USING btree ("userName");


--
-- Name: WebsiteLanguage_key_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "WebsiteLanguage_key_key" ON public."WebsiteLanguage" USING btree (key);


--
-- Name: AdminApiTranslation AdminApiTranslation_apiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminApiTranslation"
    ADD CONSTRAINT "AdminApiTranslation_apiId_fkey" FOREIGN KEY ("apiId") REFERENCES public."AdminApi"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: AdminApiTranslation AdminApiTranslation_langKey_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminApiTranslation"
    ADD CONSTRAINT "AdminApiTranslation_langKey_fkey" FOREIGN KEY ("langKey") REFERENCES public."Language"(key) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: AdminRoleRoute AdminRoleRoute_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminRoleRoute"
    ADD CONSTRAINT "AdminRoleRoute_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."AdminRole"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: AdminRoleRoute AdminRoleRoute_routeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminRoleRoute"
    ADD CONSTRAINT "AdminRoleRoute_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES public."AdminRoute"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: AdminRoleTranslation AdminRoleTranslation_adminRoleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminRoleTranslation"
    ADD CONSTRAINT "AdminRoleTranslation_adminRoleId_fkey" FOREIGN KEY ("adminRoleId") REFERENCES public."AdminRole"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: AdminRoleTranslation AdminRoleTranslation_langKey_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminRoleTranslation"
    ADD CONSTRAINT "AdminRoleTranslation_langKey_fkey" FOREIGN KEY ("langKey") REFERENCES public."Language"(key) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: AdminRouteApi AdminRouteApi_apiId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminRouteApi"
    ADD CONSTRAINT "AdminRouteApi_apiId_fkey" FOREIGN KEY ("apiId") REFERENCES public."AdminApi"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: AdminRouteApi AdminRouteApi_routeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminRouteApi"
    ADD CONSTRAINT "AdminRouteApi_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES public."AdminRoute"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: AdminRouteTranslation AdminRouteTranslation_langKey_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminRouteTranslation"
    ADD CONSTRAINT "AdminRouteTranslation_langKey_fkey" FOREIGN KEY ("langKey") REFERENCES public."Language"(key) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: AdminRouteTranslation AdminRouteTranslation_routeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminRouteTranslation"
    ADD CONSTRAINT "AdminRouteTranslation_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES public."AdminRoute"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: AdminUserRole AdminUserRole_adminRoleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminUserRole"
    ADD CONSTRAINT "AdminUserRole_adminRoleId_fkey" FOREIGN KEY ("adminRoleId") REFERENCES public."AdminRole"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: AdminUserRole AdminUserRole_adminUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminUserRole"
    ADD CONSTRAINT "AdminUserRole_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES public."AdminUser"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ArticleCategoryTranslation ArticleCategoryTranslation_articleCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ArticleCategoryTranslation"
    ADD CONSTRAINT "ArticleCategoryTranslation_articleCategoryId_fkey" FOREIGN KEY ("articleCategoryId") REFERENCES public."ArticleCategory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ArticleCategoryTranslation ArticleCategoryTranslation_langKey_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ArticleCategoryTranslation"
    ADD CONSTRAINT "ArticleCategoryTranslation_langKey_fkey" FOREIGN KEY ("langKey") REFERENCES public."Language"(key) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ArticleTranslation ArticleTranslation_articleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ArticleTranslation"
    ADD CONSTRAINT "ArticleTranslation_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES public."Article"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ArticleTranslation ArticleTranslation_langKey_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ArticleTranslation"
    ADD CONSTRAINT "ArticleTranslation_langKey_fkey" FOREIGN KEY ("langKey") REFERENCES public."Language"(key) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Article Article_articleCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Article"
    ADD CONSTRAINT "Article_articleCategoryId_fkey" FOREIGN KEY ("articleCategoryId") REFERENCES public."ArticleCategory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UploadFileGroupPath UploadFileGroupPath_ancestorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UploadFileGroupPath"
    ADD CONSTRAINT "UploadFileGroupPath_ancestorId_fkey" FOREIGN KEY ("ancestorId") REFERENCES public."UploadFileGroup"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UploadFileGroupPath UploadFileGroupPath_descendantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UploadFileGroupPath"
    ADD CONSTRAINT "UploadFileGroupPath_descendantId_fkey" FOREIGN KEY ("descendantId") REFERENCES public."UploadFileGroup"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UploadFile UploadFile_fileStorageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UploadFile"
    ADD CONSTRAINT "UploadFile_fileStorageId_fkey" FOREIGN KEY ("fileStorageId") REFERENCES public."FileStorage"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UploadFile UploadFile_uploaderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UploadFile"
    ADD CONSTRAINT "UploadFile_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES public."AdminUser"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

