module.exports = {
    apps: [
      {
        name: 'events-api',
        script: './dist/app.js',
        watch: true,
        ignore_watch: ["node_modules", "dist"],
        watch_options: {
          "followSymlinks": false
        },
        env: {
          NODE_ENV: 'development',
          PORT: 1234
        },
        env_production: {
          NODE_ENV: 'production',
          PORT: 1234
        }
      }
    ]
  };
  