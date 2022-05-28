const Category = require('../models/categoryModel')

const createCategory = async (req, res, next) => {
    const { name } = req.body
    try {
        if (!name || name?.length === 0) {
            return res.status(400).json({ msg: 'Invalid name field!' })
        }
        const category = await Category.findOne({ name: name })
        if (category) {
            return res.status(400).json({ msg: `Category ${name} already exists.` })
        }
        const newCategory = await Category.create({ name })
        return res.status(201).json({ category: newCategory })
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

const getCategory = async (req, res, next) => {
    try {
        const categories = await Category.find({}).sort('-createdAt')
        res.status(200).json({ categories })
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

const deleteCategory = async (req, res, next) => {
    const { id } = req.params
    try {
        const category = await Category.findById(id)
        if (!category || category?.length === 0) {
            return res.status(404).json({ msg: `Category with id ${id} not found` })
        }
        const deleteCategory = await Category.findByIdAndDelete(id)
        return res.status(201).json({ category: deleteCategory })
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

const updateCategory = async (req, res, next) => {
    const { name } = req.body
    const { id } = req.params
    try {
        if (!name || name?.length === 0) {
            return res.status(400).json({ msg: 'Invalid name field!' })
        }
        let category = await Category.findOne({ name: name })
        if (category) {
            return res.status(400).json({ msg: `Category ${name} already exists.` })
        }
        category = await Category.findById(id)
        if (!category) {
            return res.status(404).json({ msg: `Category with id ${id} not found` })
        }

        const newCategory = await Category.findByIdAndUpdate(id, { name: name }, {
            new: true, runValidators: true
        })
        return res.status(201).json({ category: newCategory })
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

const getSingleCategory = async (req, res, next) => {
    const { id } = req.params
    try {
        const category = await Category.findById(id)
        if (!category) {
            return res.status(404).json({ msg: `Category with id ${id} not found` })
        }
        return res.status(200).json({ category })
    } catch (error) {
        return res.status(500).json({ msg: error.message || 'Something went wrong' })
    }
}

module.exports = {
    createCategory, getCategory, deleteCategory,
    updateCategory, getSingleCategory
}