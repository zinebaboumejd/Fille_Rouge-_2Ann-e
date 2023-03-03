const express = require("express");
const router = express.Router();
const {getUser}=require("../controller/GetUser");
const {addAliment,deleteAliment,updateAliment}=require("../controller/AlimentController");
const {protect,role}=require('../../../middlewares/authMiddlewre');
router.route("/getUser").get(protect,role("admin"),getUser);
router.route("/addAliment").post(protect,role("admin"),addAliment);
router.route("/deleteAliment/:id").delete(protect,role("admin"),deleteAliment);
router.route("/updateAliment/:id").put(protect,role("admin"),updateAliment);


module.exports = router;