const { Schema, model } = require('mongoose');


const UserSchem = new Schema(
    {
        email:{type:String, required: true,unique:true},
        password:{type: String, required: true},
        isActiveted:{type:Boolean, default:false}

},{
    timestamps: true
})

module.exports = model("User", UserSchem)