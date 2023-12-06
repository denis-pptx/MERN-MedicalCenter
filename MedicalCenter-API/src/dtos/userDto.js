module.exports = function UserDto(model) {
    this.id = model._id;
    this.login = model.login;
    this.email = model.email;
}