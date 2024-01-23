const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        max: 50
    },
    password: {
        type: String,
    },
    img: {
        type: String
    },
    // saved_locations: {
    //     type: Array
    // },
    isAdmin: {
        type: Boolean,
        default: false
    },
    savedLocations: {
        type: Array,
        default: []
    }
},{timestamps: true}, {collection: 'users'})

export const Users = mongoose.models?.Users || mongoose.model("Users", userSchema, 'users')