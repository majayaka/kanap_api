const router = require('express').Router()
// const authRoutes = require('./auth')
// const orderRoutes = require('./order')
const productRoutes = require('./products')

//Health Checker
router.use('/health', (_req, res) => res.status(200).json({ status: 'ok' }))

// Application Routes
// router.use('/api/v1/auth', authRoutes)
router.use('/api/v1/products', productRoutes)
// router.use('/api/v1/orders', orderRoutes)

// Module Exports
module.exports = router
