const express = require("express");
const TicketController = require("../controllers/TicketController");
const TicketModel = require("../models/TicketModel");

var router = express.Router();

router.post("/book/", TicketController.book);
router.post("/update/", TicketController.update);
router.get("/all/", TicketController.all);
router.post("/remove/", TicketController.remove);

module.exports = router;