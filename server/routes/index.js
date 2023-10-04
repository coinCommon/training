const Router = require('express')
const router = new Router()

const otherRouter = require('./otherRouter')
router.use('/other', otherRouter)

module.exports = router
