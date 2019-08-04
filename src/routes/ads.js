const express = require("express");
const router = express.Router();

const adController = require("../controllers/adController")

router.get("/ads", adController.index);
router.get("/ads/new", adController.new);

module.exports = router;