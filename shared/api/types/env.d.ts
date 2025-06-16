declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * Current node environment: development or production
       */
      NODE_ENV: 'development' | 'production' | 'test'
      /**
       * Use for encrypt admin user password
       */
      ADMIN_USER_PASSWORD_SECRET: string
      /**
       * Use for encrypt admin user jwt token
       */
      ADMIN_USER_JWT_SECRET: string
      /**
       * Default admin user name
       */
      SUPER_ADMIN_USER_NAME: string
      /**
       * Default admin user password
       */
      SUPER_ADMIN_USER_PASSWORD: string
      /**
       * Use for encrypt web user jwt token
       */
      WEB_USER_JWT_SECRET: string
      /**
       * Data base url
       */
      DATABASE_URL: string
      /**
       * redis host
       */
      REDIS_HOST: string
      /**
       * redis port
       */
      REDIS_PORT: string
      /**
       * redis key prefix
       */
      REDIS_PREFIX: string
    }
  }
}

export {}
