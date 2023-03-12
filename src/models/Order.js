// External MOdules:
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Schema Defination:
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'People',
      required: true,
    },
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true,
    },
    shipper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shipper',
      required: true,
    },
    taxRate: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    discount: { type: Number, required: 0 },
    subTotal: { type: Number, default: 0 },
    paymentMethod: String,
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
    isDelivered: { type: Boolean, default: false },
    deliveredAt: Date,
  },
  { timestamps: true, versionKey: false }
)

// Integrate Unique Validator Plugin:
orderSchema.plugin(uniqueValidator, {
  message: '{PATH} must be unique, {VALUE} already Exists!',
})

// Order Model:
const Order = mongoose.model('Order', orderSchema)

// Export Module
module.exports = Order
