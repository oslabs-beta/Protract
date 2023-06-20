import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true}
})

userSchema.pre('save', async function (next){
  try {
    console.log('this is the user password', this.password)
    this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR)
    console.log('password has been hashed', this.password)
    return next()
  } catch (err){
    console.log('error in hashing password', err)
  }
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
};
