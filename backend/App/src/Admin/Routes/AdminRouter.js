const express = require("express");
const router = express.Router();
const {protect,role}=require('../../../middlewares/authMiddlewre');

const {getUser,activeDesactive,deleteClient}=require("../controller/GetUser");
const {getAliment,addAliment,deleteAliment,updateAliment}=require("../controller/AlimentController");
const {getRepas,addRepas,deleteRepas,updateRepas}=require("../controller/Repascontroller");

router.route("/getUser").get(protect,role("admin"),getUser);
router.route("/activeDesactive/:id").put(protect,role("admin"),activeDesactive);
router.route("/deleteClient/:id").delete(protect,role("admin"),deleteClient);

router.route("/getAliment").get(protect,role("admin"),getAliment);
router.route("/addAliment").post(protect,role("admin"),addAliment);
router.route("/deleteAliment/:id").delete(protect,role("admin"),deleteAliment);
router.route("/updateAliment/:id").put(protect,role("admin"),updateAliment);

router.route("/getRepas").get(protect,role("admin"),getRepas);
router.route("/addRepas").post(protect,role("admin"),addRepas);
router.route("/deleteRepas/:id").delete(protect,role("admin"),deleteRepas);
router.route("/updateRepas/:id").put(protect,role("admin"),updateRepas);



module.exports = router;