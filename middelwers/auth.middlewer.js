// with middelwers is require
const BaseError = require("../errors/base.error")
const tokenService = require("../service/token.service")

module.exports = function (req,res,next){
    try {
       // checking authorization
        const authorization = req.headers.authorization
        if(!authorization){
            next(BaseError.UnauthorizedError())
        }
        //checking token authoriations
        const accessToken = authorization.split(' ')[1]
        if(!accessToken){
            next(BaseError.UnauthorizedError())
        }

        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData){
            next(BaseError.UnauthorizedError())
        }
        // req. parameters add
        req.user = userData
        next()
    } catch (error) {
        next(BaseError.UnauthorizedError())
    }
    
}