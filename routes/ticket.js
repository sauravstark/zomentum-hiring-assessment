const express = require("express");
const TicketController = require("../controllers/TicketController");

var router = express.Router();

router.post("/book/", TicketController.book);
router.post("/update/", TicketController.update);
router.get("/all/", TicketController.all);

module.exports = router;