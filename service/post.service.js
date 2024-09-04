
const postModels = require("../models/post.models");
const fileServers = require("./file.service");

class PostService{
    //  post yaratish va file yaratish uchun yozilgan code
    async create(post, picture){
        const fileName = fileServers.save(picture)
        const newPost = await postModels.create({...post, picture : fileName})
        return newPost;

    }
    //postni output qilish uchun yozilgan code
    async getAll(){
        const postAlls = await postModels.find();
        return postAlls;
    }
    //postni o'chrish uchun yozilgan code
    async delete(id){
        const  postDelete = await postModels.findByIdAndDelete(id)
        return postDelete
    }
    // postni ozgartrish uchun yozilgan code
    async edit(id,post){
        if(!id){
            throw new Error('xata')
        }
        const isPost = await this.getOne(id)
        if(!isPost){
            throw new Error('xata')
        }
        const updateData = await postModels.findByIdAndUpdate(id,post,{
            new:true
        })
        return updateData
    }
    // postni idga qarab bitta idli postni chiqarish
    async getOne(id){
        const getOne = await postModels.findById(id)
        return getOne
    }
}


module.exports = new PostService()//calls bilan oop bilan ishlasak shuday exprots qilinadi