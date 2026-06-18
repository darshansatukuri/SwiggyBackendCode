const express = require('express');


const vendorRoutes = require('./routes/vendorRoutes')

const firmRoutes = require("./routes/firmRoutes")

const productRoutes = require("./routes/productRoutes")


const cors = require("cors")
 


const path = require("path")

const dotEnv = require('dotenv');


const mongoose = require('mongoose')

const bodyParser = require("body-parser");

const PORT= process.env.PORT || 4000;










const app = express();

dotEnv.config();

app.use(cors())

app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URL).then(()=>console.log("MongoDb connected Sucessfully!")).catch((error)=>console.log(error))

app.listen(PORT,()=>{
    console.log(`Server started and running at ${PORT}` )
})


app.use("/vendor",vendorRoutes)


app.use("/firm" ,firmRoutes)


app.use("/product",productRoutes)

app.use("/uploads",express.static('uploads'));


app.use('/', (req,res)=>{
    res.send("Welcome to SUBY");
})

