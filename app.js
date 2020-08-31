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
