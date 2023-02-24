//require
const combineRouter = require('koa-combine-routers')

const a = require('./aRouter')

const b = require('./bRouter')

const c = require('./userModel')

module.exports = combineRouter(a,b,c);