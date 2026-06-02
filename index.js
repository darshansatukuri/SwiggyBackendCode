const express = require('express');


const vendorRoutes = require('./routes/vendorRoutes')

const firmRoutes = require("./routes/firmRoutes")

const productRoutes = require("./routes/productRoutes")


const cors = require("cors")


const path = require("path")

const dotEnv = require('dotenv');


const mongoose = require('mongoose')

const bodyParser = require("body-parser");




dotEnv.config();



const port= 4000 ;

const app = express();

app.use(cors())

app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URL).then(()=>console.log("MongoDb connected Sucessfully!")).catch((error)=>console.log(error))

app.listen(port,()=>{
    console.log("Server started at port 4000")
})


app.use("/vendor",vendorRoutes)


app.use("/firm" ,firmRoutes)


app.use("/product",productRoutes)

app.use("/uploads",express.static('uploads'));

