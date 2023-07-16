

const mongoose=require('mongoose')
const BridgePositionSchemaMUM=new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    symbol:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    fee:{
        type:Number,
        required:true
    },




})

module.exports=mongoose.model('BridgePositionSchemaMUM',BridgePositionSchemaMUM)

