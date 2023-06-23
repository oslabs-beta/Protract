const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 3000, default: Date.now }
});

// Adjust MongoDB cleanup session for specific Time To Live Index (TTL) in seconds

sessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3000});

const Session = mongoose.model('Session', sessionSchema)

export default Session;
