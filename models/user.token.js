const { Schema, model } = require("mongoose");

const TokenSchemas = new Schema({
    user:{type:Schema.ObjectId, ref:"User"},
    refreshToken:{type:String, required: true}
})

module.exports = model("Token", TokenSchemas)