const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const config=require("./config/db.config");
const app=express();
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
require("dotenv").config();


app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

const port=process.env.PORT || 5000;
const routes=require("./route/routes");

app.use("/api", routes);

mongoose.connect(config.dbUrl) .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('MongoDB connection error:', error));
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})