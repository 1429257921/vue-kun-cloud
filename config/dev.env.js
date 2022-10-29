'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOST: '"http://192.168.3.10"',
  KUN_BASE_URL: '"http://192.168.3.10:9200/kun-blog"'
})
