const mongoose=require('mongoose')
const PoolSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
fee:{
    type:Number,
    required:true
},
token0:{
    type:String,
    required:true
},
token1:{
    type:String,
    required:true
},
pool:{
    type:String,
    required:true
},
tickSpacing:{
    type:Number,
    required:true
},

image1:{
    type:String,
    required:false,
    
},
image2:{
    type:String,
    required:false,
    
},
verified:{
    type:Boolean,
    default:false

}



})

module.exports=mongoose.model('Pools',PoolSchema)

