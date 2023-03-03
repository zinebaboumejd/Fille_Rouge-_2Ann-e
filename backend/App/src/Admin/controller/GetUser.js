const express = require("express"); 
const User=require("../../Auth/models/authModel")
const asyncHandler = require("express-async-handler");

// /get user
const getUser = asyncHandler(async (req, res) => {
    const user = await User.find();
    res.json(user);
});



module.exports = {
    getUser,
  
};