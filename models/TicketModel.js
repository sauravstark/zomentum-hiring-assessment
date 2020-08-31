const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    user_name:      { type: String },
    user_contact:   { type: String },
    expired:        { type: Boolean },
    timing:         { type: Schema.Types.ObjectId, ref: 'timing' },
});

const TicketModel = mongoose.model("ticket", TicketSchema);
module.exports = TicketModel;