const Firm = require("../models/Firm");

const Vendor  = require("../models/Vendor");

const multer = require("multer")

const path = require("path")

const storage = multer.diskStorage({
        destination: function(req,file,cb){
            cb(null,'uploads/');
        },
        filename:function(req,file,cb){
            cb(null, Date.now() + pathextname(file.originalname));
        }
    });

     const upload = multer({storage:storage});



const addFirm = async (req,res)=>{

    try {
        const{firmName,area,category,region,offer}=req.body;

   const image = req.file? req.file.filename : undefined;
    

   
    const vendor =await Vendor.findById(req.vendorId)

    if(!vendor){
        return res.status(401).json({message:"Vendor not found"})
    }

    const firm = new Firm({
        firmName,area,category,region,offer,image,vendor:vendor._id
    })
    const savedfirm = await firm.save();

    vendor.firm.push(savedfirm)

    await vendor.save()


       return  res.status(200).json({message:"Firm Added Successfully!"})
    } catch (error) {
        console.log(error)
        return  res.status(500).json("Internal Server Error")
    }
    
}

const deleteFirmById = async(req,res)=>{
    try {
        const firmId = req.params.firmId ;

        const deletedfirm = await Firm.findByIdAndDelete(firmId);

        if(!deletedfirm){
            return res.status(402).json({error:"No firm found"})
        }
        
    } catch (error) {
        console.log(error)
        return  res.status(500).json("Internal Server Error")
    }
}

module.exports = {addFirm:[upload.single('image'),addFirm],deleteFirmById}