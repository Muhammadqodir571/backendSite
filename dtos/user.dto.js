module.exports = class UserDto {
    email
    id
    activeted
    
    constructor(model){
        this.email = model.email
        this.id = model._id
        this.activeted = model.activeted
    }
}