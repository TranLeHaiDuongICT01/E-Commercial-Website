const Product = require('../models/productModel')


const getProducts = async (req, res, next) => {
    const { title, price, category, sold, sort, fields, numericFilter } = req.query
    try {
        const queryObject = {}
        if (title) {
            queryObject.title = { $regex: title, $options: 'i' }
        }

        if (category) {
            queryObject.category = category
        }
        if (price) {
            queryObject.price = price
        }
        if (sold) {
            queryObject.sold = sold
        }
        if (numericFilter) {
            const operatorMap = {
                '>': '$gt',
                '<': '$lt',
                '=': '$eq',
                '>=': '$gte',
                '<=': '$lte'
            }
            const regEx = /\b(<|>|<=|>=|=)\b/g
            let filters = numericFilter.replace(regEx, (match) => `-${operatorMap[match]}-`)
            const options = ['price', 'sold']
            filters = filters?.split(',')?.forEach(item => {
                const [field, operator, value] = item?.split('-')
                if (options.includes(field)) {
                    queryObject[field] = { ...queryObject[field], [operator]: Number(value) }
                }
            });
        }
        // console.log(queryObject);
        let result = Product.find(queryObject)
        if (sort) {
            const sortList = sort?.split(',')?.join(' ')
            result = result.sort(sortList)
        } else result = result.sort('-createdAt')

        if (fields) {
            const fieldList = fields?.split(',')?.join(' ')
            result = result.select(fieldList)
        }

        const page = Number(req?.query?.page) || 1
        const limit = Number(req?.query?.limit) || 12
        const skip = (Number(page) - 1) * limit

        result = result.skip(skip).limit(limit)

        const products = await result

        const total = await Product.countDocuments()

        res.status(200).json({ products, currentPage: Number(page), numberOfPage: Math.ceil(total / limit) })
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

const createProduct = async (req, res, next) => {
    const { title, price, description, content, images, category } = req.body
    try {
        if (!images) return res.status(400).json({ msg: 'No images uploaded' })
        const product = await Product.create({ title: title.toLowerCase(), price, description, content, images, category })

        return res.status(201).json({ product })
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

const getSingleProduct = async (req, res, next) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ msg: `Product with id ${id} not found` })
        }
        return res.status(200).json({ product })
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

const updateProduct = async (req, res, next) => {
    const { id } = req.params
    const { title, ...others } = req.body
    try {
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ msg: `Product with id ${id} not found` })
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, { ...others, title: title?.toLowerCase() }, { new: true, runValidators: true })
        return res.status(200).json({ product: updatedProduct })
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

const deleteProduct = async (req, res, next) => {
    const { id } = req.params
    try {
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({ msg: `Product with id ${id} not found` })
        }
        return res.status(200).json({ product })
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

module.exports = {
    getProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
}