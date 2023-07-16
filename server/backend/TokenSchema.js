const mongoose=require('mongoose')
const TokenSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
symbol:{
    type:String,
    required:true
},
owner:{
    type:String,
    required:true
},

token:{
    type:String,
    required:true
},
totalSupply:{
    type:Number,
    required:true
},
decimals:{
    type:Number,
    required:true

},

image:{
    type:String,
    required:false,
    
},
verified:{
    type:Boolean,
    default:false

}



})

module.exports=mongoose.model('Token',TokenSchema)

