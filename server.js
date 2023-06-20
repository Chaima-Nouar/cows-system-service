const express = require("express");
const http = require("http");

const app = express();
const cors = require("cors");
// const cowsRoute = require("./routes/cows");
// const examsRoute = require("./routes/examination");

const server = http.createServer(app);
const port = process.env.PORT || 3001;

require("dotenv").config();

app.use(express.json());
app.use(cors());

// app.use("/cows", cowsRoute);
app.use("/cows", require('./routes/cows'));
app.use("/milk", require('./routes/milkProduction'));
app.use("/children", require('./routes/birth'));

app.use("/cows/exams", require('./routes/examination'));


server.listen(port, () => console.log("listening on port 3001"));
