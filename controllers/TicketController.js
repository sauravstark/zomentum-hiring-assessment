const TicketModel = require('../models/TicketModel');
const TimingModel = require('../models/TimingModel');

exports.book = (req, res) => {
    let errors = [];
    if (typeof (req.body.name) !== 'string' || req.body.name.length < 3) {
        errors.push("Invalid User Name");
    }
    if (typeof (req.body.contact) !== 'string' || !req.body.contact.match(/^\d{10}$/)) {
        errors.push("Invalid Contact");
    }
    if (typeof (req.body.movie) != 'string') {
        errors.push("Invalid Movie Name")
    }
    if (typeof (req.body.time) != 'string' || Date.parse(req.body.time) === NaN) {
        errors.push("Invalid Time");
    }
    if (errors.length > 0) {
        res.send({
            status: "ERR",
            messgae: errors,
        });
    } else {
        TimingModel.findOne({ movie: req.body.movie, time: req.body.time }, (err, timing) => {
            if (err) {
                res.send({
                    status: "ERR",
                    messgae: "Could not book ticket",
                });
            } else if (timing == null) {
                res.send({
                    status: "ERR",
                    messgae: "Movie not found",
                });
            } else if (timing.capacity == 0) {
                res.send({
                    status: "ERR",
                    messgae: "No seats available",
                });
            } else {
                let doc = {
                    user_name: req.body.name,
                    user_contact: req.body.contact,
                    expired: (Date.parse(Date()) - timing.time > 8 * 3600),
                    timing: timing._id,
                };
                TicketModel.create(doc, function (err, doc) {
                    if (err) {
                        res.send({
                            status: "ERR",
                            messgae: "Could not book ticket",
                        });
                    } else {
                        TimingModel.findByIdAndUpdate(timing._id, { capacity: (timing.capacity - 1) }, (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        res.send({
                            status: "OK",
                            messgae: "Ticket Booked",
                            ticket: doc,
                        });
                    }
                });
            }
        })
    }
};