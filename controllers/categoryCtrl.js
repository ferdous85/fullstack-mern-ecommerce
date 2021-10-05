const { findOne } = require('../models/categoryModel')
const Category = require('../models/categoryModel')

const categoryCtrl = {
    getCategories: async (req, res)=>{
        try {
            const catagories = await Category.find()
            res.json(catagories)
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    //createCatagory
    createCatagory: async (req, res)=>{
        try {
            const {name}= req.body
            const catagory = await Category.findOne({name})
            if (catagory) {
                return res.status(400).json({msg:'This catagory already exists'})
            } 
            const newCatagory = new Category({name})
            await newCatagory.save()
            res.json("Caragory created")
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    //deleteCategory
    deleteCategory: async (req, res)=>{
        try {
            await Category.findByIdAndDelete(req.params.id)
            res.json("Deleted a category")
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    //updateCategory
    updateCategory: async (req, res)=>{
        try {
            const {name} = req.body
            await Category.findByIdAndUpdate({_id:req.params.id}, {name})
            res.json("category updated")
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    }
}

module.exports = categoryCtrl