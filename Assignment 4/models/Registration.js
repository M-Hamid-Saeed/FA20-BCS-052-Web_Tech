// models/Registration.js
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
