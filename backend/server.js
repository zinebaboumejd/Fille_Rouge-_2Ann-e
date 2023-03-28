const express = require("express");
const dotenv = require("dotenv").config(); 
const {errorHandler} =require("./App/middlewares/errorMiddleware")
const port = process.env.PORT || 8000; 
const app = express();
const connectDB = require("./App/config/db")
const cors = require("cors");
const { default: mongoose } = require("mongoose");

mongoose.set("strictQuery", false);
app.use(express.static("uploads"));
connectDB(); 

app.use(cors({ origin: "*" }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(errorHandler);

// // Routes
app.use("/auth", require("./App/src/Auth/routes/authRoute"));
app.use("/admin", require("./App/src/Admin/Routes/AdminRouter"));
app.use("/client", require("./App/src/Clients/Routes/CorpsRoute"));
app.listen(port, () => console.log(`Server started on port ${port}`))
