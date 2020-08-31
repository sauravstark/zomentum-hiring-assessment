const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./services/mongodbConn')

const { port } = require('./config');

const ticketRouter = require('./routes/ticket');

db.connect();

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.use("/ticket/", ticketRouter);

app.listen(port, () => {
    console.log(`Runnning on port: ${port}`);
});

/*
                            -----------  DONE  ----------
● An endpoint to book a ticket using a user’s name, phone number, and timings.
● An endpoint to update a ticket timing.
● An endpoint to view all the tickets for a particular time.
● An endpoint to delete a particular ticket.

                            -----------  TODO  ----------
● An endpoint to view the user’s details based on the ticket id.
● Mark a ticket as expired if there is a diff of 8 hours between the ticket timing and current time.
● Note: For a particular timing, a maximum of 20 tickets can be booked.
● Plus point if you could delete all the tickets which are expired automatically.
● Plus point if you could write the tests for all the endpoints.
*/