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
            message: errors,
        });
    } else {
        TimingModel.findOne({ movie: req.body.movie, time: req.body.time }, (err, timing) => {
            if (err) {
                res.send({
                    status: "ERR",
                    message: "Could not book ticket",
                });
            } else if (timing == null) {
                res.send({
                    status: "ERR",
                    message: "Movie not found",
                });
            } else if (timing.capacity == 0) {
                res.send({
                    status: "ERR",
                    message: "No seats available",
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
                            message: "Could not book ticket",
                        });
                    } else {
                        TimingModel.findByIdAndUpdate(timing._id, { capacity: (timing.capacity - 1) }, (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        res.send({
                            status: "OK",
                            message: "Ticket Booked",
                            ticket: doc,
                        });
                    }
                });
            }
        })
    }
};

exports.update = (req, res) => {
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
    if (typeof (req.body.old_time) != 'string' || Date.parse(req.body.old_time) === NaN) {
        errors.push("Invalid Old Time");
    }    
    if (typeof (req.body.new_time) != 'string' || Date.parse(req.body.new_time) === NaN) {
        errors.push("Invalid New Time");
    }
    if (errors.length > 0) {
        res.send({
            status: "ERR",
            message: errors,
        });
    } else {
        TimingModel.find({ movie: req.body.movie }, (err, timings) => {
            if (err) {
                res.send({
                    status: "ERR",
                    message: "Could not complete request",
                });
            } else if (timings == null) {
                res.send({
                    status: "ERR",
                    message: "Movie not found",
                });
            } else {
                let old_timing = timings.find(el => Date.parse(el.time) === Date.parse(req.body.old_time));
                let new_timing = timings.find(el => Date.parse(el.time) === Date.parse(req.body.new_time));

                if (old_timing === undefined) {
                    res.send({
                        status: "ERR",
                        message: "Old Time not found",
                    });
                } else if (new_timing === undefined){
                    res.send({
                        status: "ERR",
                        message: "New Time not found",
                    });
                } else if (new_timing.capacity == 0) {
                    res.send({
                        status: "ERR",
                        message: "No Vacancy in new time",
                    });
                } else {
                    TicketModel.findOne({ user_name: req.body.name, user_contact: req.body.contact, timing: old_timing._id }, (err, doc) => {
                        if (err) {
                            console.log(err);
                        } else if (doc == null) {
                            res.send({
                                status: "ERR",
                                message: "Booking not found",
                            });
                        } else {
                            TimingModel.findByIdAndUpdate(old_timing._id, { capacity: (old_timing.capacity + 1) }, (err) => {
                                if (err)
                                    console.log(err);
                            });
                            TimingModel.findByIdAndUpdate(new_timing._id, { capacity: (new_timing.capacity - 1) }, (err) => {
                                if (err)
                                    console.log(err);
                            });
                            TicketModel.findByIdAndUpdate(doc._id, { timing: new_timing._id }, {new: true}, (err, out) => {
                                if (err)
                                    console.log(err);
                                else
                                    res.send({
                                        status: "OK",
                                        message: "Timing updated",
                                        updated: out
                                    });
                            });
                        }
                    })
                }
            }
        })
    }
};