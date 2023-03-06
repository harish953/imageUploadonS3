const mogoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:{
        type: String,
    },
    age:{
        type: Number,
    },
    email:{
        type: String,
        lowerCase: true,
        unique: true,
    },
    password:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
    image:{
        type: String,
    },
},{timestamps: true});

module.exports = mongoose.model('User', userSchema);
