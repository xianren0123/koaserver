const Router = require('koa-router')
const apiA = require('../api/add')
const login = require('../middleware/login')
const router = new Router()
router.post('/apiA', login, apiA)
module.exports = router