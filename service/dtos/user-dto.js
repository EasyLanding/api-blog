export class UserDto {
  email
  username
  id
  isActiveted
  constructor(model) {
    this.email = model.email
    this.username = model.username
    this.id = model._id
    this.isActiveted = model.isActiveted
  }
}
