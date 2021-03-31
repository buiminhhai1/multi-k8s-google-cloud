module.exports = {
  apps : [{
    name: "server",
    script: "./index.js", 
    // implement load-balancer with cluster mode and instance numbers
    instances: "2",
    exec_mode: "cluster",

    // watch 
    watch_delay: 1000,
    ignore_watch : ["node_modules"],
    watch_options: {
      "followSymlinks": false
    },

    // passing env for instance 
    env: {
      NODE_ENV: "development",
      REDIS_HOST: "3.0.95.43",
      REDIS_PORT: "6379",
      PGUSER: "postgres",
      PGHOST: "3.0.95.43",
      PGDATABASE: "postgres",
      PGPASSWORD: "password",
      PGPORT: 5432
    },
    env_production: {
      NODE_ENV: "production",
      REDIS_HOST: "3.0.95.43",
      REDIS_PORT: "6379",
      PGUSER: "postgres",
      PGHOST: "3.0.95.43",
      PGDATABASE: "postgres",
      PGPASSWORD: "password",
      PGPORT: 5432
    }
  }],
  deploy : {
    // "production" is the environment name
    "production" : {
      "user" : "ubuntu",
      "host" : ["3.0.95.43"],
      "ref"  : "origin/sharing-node",
      "repo" : "git@github.com:buiminhhai1/repository.git",
      "path" : "/var/www/my-repository",
      "post-deploy" : "pm2 startOrRestart ecosystem.config.js --env production"
     },
  }
};
