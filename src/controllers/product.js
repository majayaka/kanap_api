// External Module:
const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')

const { find, findById } = require('./../config/data')

/**
 * @desc Create
 * @Route [POST]- /api/v1/products
 * @Access protected - [admin]
 * @returns {OBJECT}
 */
const create = async (req, res, next) => {}

/**
 * @description Get Single Data
 * @Route [GET]- /api/v1/products/:id
 * @Access protected - [admin]
 * @returns {Object}
 */
const getSingle = async (req, res, next) => {
  try {
    const id = req.params.id
    const data = await findById(id)
    if (data?._id) {
      let product = {
        ...data,
        imageUrl: data?.imageUrl
          ? `${req.photo_url}/${data.imageUrl}`
          : undefined,
      }
      return res.status(200).json(product)
    }
    return next(createError(404, 'Product Not Found!'))
  } catch (error) {
    next(createError(404, 'Product Not Found!'))
  }
}

/**
 * @desc Get All Data
 * @Route [GET]- /api/v1/products
 * @Access protected - [admin]
 * @returns {Array<JSON>}
 */
const getAll = async (req, res, next) => {
  try {
    const data = await find()
    if (data.length) {
      let products = data.map((item) => ({
        ...item,
        imageUrl: item?.imageUrl
          ? `${req.photo_url}/${item.imageUrl}`
          : undefined,
      }))
      return res.status(200).json(products)
    }
    return next(createError(404, 'Products Not Found!'))
  } catch (error) {
    next(createError(500, 'Internal Server Error!'))
  }
}

/**
 * @desc Update Data
 * @Route [PUT]- /api/v1/products/:id
 * @Access protected - [admin]
 * @returns {JSON} - Updated Object
 */
const update = async (req, res, next) => {}

/**
 * @desc Delete single
 * @Route [DELETE]- /api/v1/products/:id
 * @Access protected - [admin]
 * @returns {Boolean}
 */
const deleteSingle = async (req, res, next) => {}

/**
 * @desc Delete All
 * @Route [DELETE]- /api/v1/products/destroy
 * @Access protected - [admin]
 * @returns {Boolean}
 */
const deleteAll = async (req, res, next) => {}

/**
 * @desc Create
 * @Route [POST]- /api/v1/products/order
 * @Access protected - [admin]
 * @returns {OBJECT}
 */
const order = async (req, res, next) => {
  let { firstName, lastName, address, city, email, products } = req.body

  if (!firstName && !lastName && !address && !city && !email) {
    return next(createError(422, 'Bad Request!'))
  }

  let data = await find(products)

  if (data.length) {
    let products = data.map((item) => ({
      ...item,
      imageUrl: item?.imageUrl
        ? `${req.photo_url}/${item.imageUrl}`
        : undefined,
    }))
    return res.status(200).json({
      orderId: uuidv4(),
      products,
      contract: { firstName, lastName, address, city, email },
    })
  }
  return next(createError(404, 'Products Not Found!'))
}

//Export Module:
module.exports = {
  create,
  getSingle,
  getAll,
  order,
  update,
  deleteSingle,
  deleteAll,
}
