const Router = require('express')
const router = new Router()

const otherController = require("../controllers/otherController");

router.get('/ReceiveNotifications', otherController.ReceiveNotifications)

module.exports = router