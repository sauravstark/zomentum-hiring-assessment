const express = require("express");
const TicketController = require("../controllers/TicketController");

var router = express.Router();

router.post("/book/", TicketController.book);

module.exports = router;