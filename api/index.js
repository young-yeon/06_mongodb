const { Router } = require("express")
const router = Router()

router.use("/music", require('./music'))
router.use("/movie", require('./movie'))

module.exports = router