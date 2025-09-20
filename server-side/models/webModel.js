const {Schema, model} = require('mongoose')

const WebSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    url:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    tags:{
        type: Array,
        maxlength: 5
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})
//                    'default-collection-name', schema, desired-collection name
const WebModel = model('web', WebSchema, 'websiteX')

module.exports = WebModel