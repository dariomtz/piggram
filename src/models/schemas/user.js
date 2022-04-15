const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 15
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
          validator: (email) => {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(email);
          },
          message: (props) => `${props.value} is not a valid email`
        }
    },
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        max: 100
    },
    image:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    dateOfBirth:{
        type: Date,
        required: true
    }

});

const User = mongoose.model('User', userSchema);

module.exports = User;
