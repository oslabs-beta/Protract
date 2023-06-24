const mongoose = require('mongoose');
const Schema = mongoose.Schema;

import { Item } from "../../types";

interface projectSchema {
  title: string;
  root: Array<Item>;
  users: Array<String>;
}

const projectSchema = new Schema({
  title: {type: String, required: true},
  root: {type: Array<Item>, required: true},
  users: {type: Array<String>, required: true}
})

const Project = mongoose.model('Project', projectSchema);

export default Project;
