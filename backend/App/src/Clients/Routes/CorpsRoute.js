const express = require("express");
const router = express.Router();
const { protect, role } = require('../../../middlewares/authMiddlewre');

const {
    getCorps,
    getCorpsById,
    deleteCorps,
    createCorps,
    updateCorps,
    getCorpsByIdUser
} = require("../Controllers/corpsController");


// Autorization client
router.use(protect);
router.use(role('client'));

router.route("/").get(getCorps).post(createCorps);
router.route("/:id").get(getCorpsById).put(updateCorps).delete(deleteCorps);
router.route("/getCorpsByIdUser/:id").get(getCorpsByIdUser);

module.exports = router;
