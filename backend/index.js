// requiring packages
const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
app.use(cors({ origin: process.env.CLIENT_URL }));

//use of body parser for Parsing the input requests data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// DB Connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database Connection establsihed Successfully");
});

const router = require('./Router/router');
const authRouter = require('./Router/auth/auth');

app.use(router);

//for authentication routes 
app.use("/api/", authRouter);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server is Up and Runnig on Port ${PORT}`)
);
