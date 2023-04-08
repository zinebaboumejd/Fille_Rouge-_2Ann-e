const express = require("express");
const router = express.Router();
const { protect, role } = require('../../../middlewares/authMiddlewre');

const {
    getCorps,
    getCorpsById,
    deleteCorps,
    createCorps,
    updateCorps,
} = require("../Controllers/corpsController");


// Autorization client
router.route("/getRepas").get(protect, role('client'), getCorps);
router.route("/getRepasById/:id").get(protect, role('client'), getCorpsById);
router.route("/deleteRepas/:id").delete(protect, role('client'), deleteCorps);
router.route("/createRepas").post(protect, role('client'), createCorps);
router.route("/updateRepas/:id").put(protect, role('client'), updateCorps);


module.exports = router;
