const jwt = require('jsonwebtoken')
const tokenModel = require('../models/user.token')
class TokenService{
    generateToken(payload){
        const accssToken = jwt.sign(payload,process.env.TOOKEN_ACCESS_KEY,{expiresIn:'15m'})
        const refreshToken = jwt.sign(payload, process.env.TOKEN_REFRESH_KEY,{expiresIn:'30d'})

        return {accssToken, refreshToken}
    }
    async saveToken(userId, refreshToken){
        const existUser = await tokenModel.findOne({user:userId}) 

        if(existUser){
            existUser.refreshToken = refreshToken
            return existUser.save()
        }
        const token = await tokenModel.create( {user:userId, refreshToken})
        return token
    }
    async removeToken(refreshToken){
        return await tokenModel.findOneAndDelete({refreshToken})
    }
    async findToken(refreshToken){
        return await tokenModel.findOne({refreshToken})
    }
    validateRefreshToken(token){
        try {
            return jwt.verify(token, process.env.TOKEN_REFRESH_KEY)
            
        } catch (error) {
            return null
            
        }
    }
    validateAccessToken(token){
        try {
            return jwt.verify(token ,process.env.TOOKEN_ACCESS_KEY)
        } catch (error) {
            return null
            
        }
    }
}
module.exports = new  TokenService()