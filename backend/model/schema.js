const mongoose= require('mongoose');
const schema= new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productImg:{
        type:String,
        required: true
    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:[{
        type:String,
        required:true
    }],
    description:{
        type:String,
    }
});

module.exports=mongoose.model('Product', schema);