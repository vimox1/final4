const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();//create express app

const userRoutes = require("./routes/user");
const clientRoutes = require("./routes/clients");
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");
const ordersRoutes = require("./routes/orders")

app.use("/public/uploads", express.static(__dirname + "/public/uploads"));//not working








mongoose
  .connect(
    "mongodb+srv://sohaib:4EDRjvTlSnxqxS5q@cluster0.ixyd3.mongodb.net/main-db"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();//fonctionment will continue after this midd leware
});

app.use("/auth",userRoutes);
app.use("/users",clientRoutes);
app.use("/products/physical",categoryRoutes);
app.use("/products",productRoutes);
app.use("/sales",ordersRoutes);





module.exports = app; //export entire express app also with middelwares and then import in server.js  
