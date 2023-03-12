// External Modules:
const router = require('express').Router()

// Controller:
const { getSingle, getAll, order } = require('../controllers/product')

//Routes:
router.post('/order', order)

router.get('/:id', getSingle)
router.get('/', getAll)

// Exports
module.exports = router
