/**
 * ScienceKH — Production PM2 Cluster Ecosystem Configuration
 * Manages zero-downtime clustering across all available CPU cores.
 *
 * Usage:
 *   pm2 start ecosystem.config.cjs --env production
 *   pm2 reload ecosystem.config.cjs (zero-downtime reload)
 */

module.exports = {
  apps: [
    {
      name: "sciencekh-api-cluster",
      script: "server/dist/index.js",
      instances: "max", // Forks 1 worker per CPU core
      exec_mode: "cluster",
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "development",
        PORT: 5001,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 5001,
      },
      exp_backoff_restart_delay: 100,
      listen_timeout: 8000,
      kill_timeout: 5000,
    },
  ],
};
