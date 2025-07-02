const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'owner'], required: true },
    shopName: { 
        type: String, 
        required: function() { return this.role === 'owner'; } 
      },
      account: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
