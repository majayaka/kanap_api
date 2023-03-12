// External Modules:
const router = require('express').Router()

// Controller:
const {
  create,
  getSingle,
  getAll,
  update,
  deleteSingle,
  deleteAll,
} = require('../controllers/order')

//Middleware

//Routes:
router.delete('/destroy', deleteAll)

router.post('/', create)
router.get('/', getAll)
router.get('/:id', getSingle)
router.put('/:id', update)
router.delete('/:id', deleteSingle)

// Exports
module.exports = router
