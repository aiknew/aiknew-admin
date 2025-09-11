module.exports = {
  apps: [
    {
      name: 'aiknew-admin-admin-api',
      script: './dist/main.js',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
      },
    },
  ],
}
