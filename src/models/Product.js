// External MOdules:
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Schema Defination:
const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'People',
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    tags: [String],
    reviewsCount: { type: Number, default: 0 },
    rating: {
      type: Number,
      default: 0,
    },
    name: { type: String, required: true },
    description: String,
    brand: String,
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    taxRate: { type: Number, default: 0 },
    countInStock: { type: Number, required: true },

    images: [String],
  },
  { timestamps: true, versionKey: false }
)

// Integrate Unique Validator Plugin:
productSchema.plugin(uniqueValidator, {
  message: '{PATH} must be unique, {VALUE} already Exists!',
})

// Product Model:
const Product = mongoose.model('Product', productSchema)

// Export Module
module.exports = Product
