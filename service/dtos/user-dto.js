export class UserDto {
  email
  username
  id
  isActiveted
  bio
  image
  constructor(model) {
    this.email = model.email
    this.username = model.username
    this.id = model._id
    this.isActiveted = model.isActiveted
    this.bio = model.bio
    this.image = model.image
  }
}
