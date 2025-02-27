const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a team name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  user: {
    type: String,
    required: [true, 'Please add a user identifier']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});