
const postServer = require("../service/post.service")

class PostController{
    async getAll (req,res,next){
        try {
            
            const allPosts = await postServer.getAll()
            res.status(200).json(allPosts)
        } catch (error) {
            next(error)
        }
    }
    async create(req,res,next){
      
         try {
        const newPost = await postServer.create(req.body, req.files.picture, )
        console.log(newPost);
        
        res.status(201).json(newPost)

        
    } catch (error) {
        next(error)
    }
    }
    async delete(req,res,next){
        try {
            const deletPost = await postServer.delete(req.params.id)
            res.status(200).json(deletPost)
        } catch (error) {
         next(error)

        }
        }
    async edit(req,res,next){
        try {
        
        const {params,body} = req
        const editPost = await postServer.edit(params.id,body)
        res.status(200).json(editPost)     
        } catch (error) {
            next(error)
    } 
    }
    async getOne(req,res,next){
        try {
            const getId = req.params.id 
            const postOne = await postServer.getOne(getId)
            res.status(200).json(postOne)
        } catch (error) {
            res.next(error)
        }
    }

}


module.exports = new PostController()