const express = require("express");
const category=require("../Models/CategoryModel")
const asyncHandler = require("express-async-handler");

// get  category
const getCategory = asyncHandler(async (req, res) => {
    const categorys = await category.find();
    res.json(categorys);
}
);

// add category
const addCategory = asyncHandler(async (req, res) => {
    const { name ,description} = req.body;
    const categorys = await category.create({
        name,
        description
    });
    res.json(categorys);
}
);

// delete category

const deleteCategory = asyncHandler(async (req, res) => {

    const categorys = await category.findByIdAndDelete(req.params.id);
    res.json(categorys);
}
);

// update category

const updateCategory = asyncHandler(async (req, res) => {
    const { name ,description} = req.body;
    const categorys = await category.findByIdAndUpdate(req.params.id, {
        name,
        description
    });
    res.json(categorys);
}
);

module.exports = {
    getCategory,
    addCategory,
    deleteCategory,
    updateCategory
}
