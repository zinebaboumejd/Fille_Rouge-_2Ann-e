const express = require("express"); 
const User=require("../../Auth/models/authModel")
const asyncHandler = require("express-async-handler");

// /get user
const getUser = asyncHandler(async (req, res) => {
//    get rolle =client
const user = await User.find({role:"client"});
res.json(user);
});

// active desactiver 
const activeDesactive = asyncHandler(async (req, res) => {
// update status
const user = await User.findById(req.params.id);
if (user) {
    const userId=req.params.id;
    const user=await User.findById(userId)
    if(user.status=="inactive"){
        user.status="active";
        const updatedUser = await user.save();
        res.json({
            status: updatedUser.status,
        });
    }else{
        user.status="inactive";
        const updatedUser = await user.save();
        res.json({

            status: updatedUser.status,
        });
    }
} else {
    res.status(404);
    throw new Error("User not found");
}
});

//delete clent 
const deleteClient = asyncHandler(async (req, res) => {
const user = await User.findById(req.params.id);
if (user) {
    await user.remove();
    res.json({ message: "Client removed" });
} else {
    res.status(404);
    throw new Error("Client not found");

}
});

module.exports = {
    getUser,
    activeDesactive,
    deleteClient
};