const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const upload = require("express-fileupload");
const { swaggerJsDoc, swaggerUi, swaggerSpec } = require("./services/swagger");

const bookRoute = require("./routes/books");
const authRoute = require("./routes/auth");
const privateRoute = require("./routes/private");
const uploadRoute = require("./routes/upload");
const dbUrl = process.env.LOCAL_DB_CONNECT;
const mongoOpts = { useNewUrlParser: true };

app.use(express.json());
// connect to DB
mongoose.connect(dbUrl, mongoOpts, (err) => {
  if (err) console.log(err);
  else console.log("mongdb is connected");
});

app.use(upload());

// Routes
app.use("/api/user", authRoute);
app.use("/api/user", privateRoute);
app.use("/api/books", bookRoute);
app.use("/api/books/upload", uploadRoute);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerSpec)));

app.listen(3000, () => console.log("server is running on port 3000"));
