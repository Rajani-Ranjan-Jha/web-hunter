const {Schema, model} = require('mongoose')

const AdminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },

})
//                    'default-collection-name', schema, desired-collection name
const AdminModel = model('admin', AdminSchema, 'adminX')

module.exports = AdminModel