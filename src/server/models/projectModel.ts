const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {type: String, required: true},
  root: {type: Array, required: true},
  users: {type: Array<String>, required: true}
})

const Project = mongoose.model('Project', projectSchema);

export default Project;