const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    createdAt: {
        type: Date,
        inmutable: true,
    },
    updatedAt: Date
});

module.exports = model("User", userSchema);
