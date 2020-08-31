const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;

const TimingSchema = new Schema({
    movie:      { type: String },
    director:   { type: String },
    time:       { type: Date },
    capacity:   { type: Number, default: 20 },
});

const TimingModel = mongoose.model("timing", TimingSchema);
module.exports = TimingModel;