
const UserDto = require('../dtos/user.dto')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const tokenService = require('./token.service')
const userToken = require('../models/user.token')
const BaseError = require('../errors/base.error')
//const  MailService = require('./smtp.service')
class AuthService{
async register(email,password){
    const exsitUser = await userModel.findOne({email})

    if(exsitUser){
        throw BaseError.BadRequest(`user with existing ${email} already registered`)
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await userModel.create({email, password: hashPassword })
    const userDto = new UserDto(newUser)
    //email
    //await MailService.sendMail(email, `${process.env.API_URL}/api/auth/activation/${userDto.id}`)
    const tokens = await tokenService.generateToken({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    //jwt

    //token
    return {user:userDto,...tokens}
}
async activated(userId){
    const user = await userModel.findById(userId)

    if(!user){
        throw BaseError.BadRequest('user is not define')
    }
     
    user.isActiveted = true
    await user.save()

}
async login(email,password){
    try {
        const user = await userModel.findOne({email})
        if(!user){
            throw BaseError.BadRequest('user is not defined')
        }
        const isPassword = await bcrypt.compare(password, user.password)
        if(!isPassword){
            throw BaseError.BadRequest('password is inccorent')
        }
        const userDto = new UserDto(user)
        const tokens =  await tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id,tokens.refreshToken)
        return {user:userDto, ...tokens}
    } catch (error) {
        console.log(error);
        
    }
}
async logout(refreshToken){
    try {
        if(!refreshToken){
            throw  BaseError.UnauthorizedError('Bad authorizations')
        }
       return await tokenService.removeToken(refreshToken) 
    } catch (error) {
        console.log(error);
        
    }

}
async refresh(refreshToken){
    try {
        if(!refreshToken){
            throw  BaseError.UnauthorizedError('bad authorizations')
        }
        const userPayload = await tokenService.validateRefreshToken(refreshToken)
        const tokenDb = await tokenService.findToken(refreshToken)
        if(!userPayload || !tokenDb){
            throw BaseError.UnauthorizedError('bad authorizations')
        }
        const userData = await userModel.findById(userPayload.id)

        const userDto = new UserDto(userData)
        const tokens = await tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {user:userDto, ...tokens}
    } catch (error) {
      console.log(error);
    
        
    }
}
async getUsers(){
    try {
        const user = await userModel.find()
        return user
    } catch (error) {
        next(BaseError.UnauthorizedError())
    }
}
}
module.exports = new AuthService()