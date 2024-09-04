const BaseError = require("../errors/base.error");
const authService = require("../service/auth.service");
const {validationResult} = require('express-validator')
class AuthController{
    async register(req,res,next){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
               return next(BaseError.BadRequest('Error with validation',errors.array()))
            }
            const {email,password} = req.body
        const data = await authService.register(email, password)
        res.cookie('refreshToken', data.refreshToken,{httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000 })
         return res.json(data)
        } catch (error) {
           next(error)
            
        }

    }
    async activate(req,res,next){
        try {
            const userId = req.params.id
            await authService.activated(userId)
            return res.redirect(process.env.CILENT_URL )
        } catch (error) {
            next(error)
        }
    }
    async login(req,res,next){
        try {
            const {email, password} = req.body
            const data = await authService.login(email, password)
            res.cookie('refreshToken', data.refreshToken,{httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000})
            res.json(data)
        } catch (error) {
            next(error)
            
        }
    }
    async logout(req,res,next){
        try {
            const {refreshToken} = req.cookies
            const token= await authService.logout(refreshToken)
             res.clearCookie('refreshToken')
             return res.json(token)
            
        } catch (error) {
            next(error)
            
        }
    }
    async refresh(req,res,next){
        try {
            //refreshtoken checking
            const {refreshToken} = req.cookies
            const data = await authService.refresh(refreshToken)
            res.cookie('refreshToken', data.refreshToken,{httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000})
            res.json(data)
            
        } catch (error) {
            next(error)
        }
    }
    async getUsers(req, res, next){
        try { 
           // all users  take
            const data = await authService.getUsers()
            return res.json(data)
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new AuthController()
