const express = require('express')
const AuthController = require('../controllers/auth.controller')
const {body} = require('express-validator')
const authMiddlewer = require('../middelwers/auth.middlewer')
const router = express.Router()

router.post('/register',body('email').isEmail(),
    body('password').isLength({min:3, max:10}), AuthController.register)
router.get('/activation/:id', AuthController.activate)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.get('/refresh', AuthController.refresh)
router.get('/get-users',authMiddlewer, AuthController.getUsers)
module.exports = router