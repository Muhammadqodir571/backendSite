const {Router} = require('express')
const postController = require('../controllers/post.controller')
//const authMiddlewer = require('../middelwers/auth.middlewer')

const router = Router()
router.get('/get',postController.getAll)
router.post('/create', postController.create)
router.delete('/delete/:id', postController.delete)
router.put('/edit/:id', postController.edit)
router.get('/get-one/:id',postController.getOne)
module.exports = router