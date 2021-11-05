const mongoose =require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = new mongoose.Schema({
  title:{
    type: String,
    minlength: 3,
    required: true,
    unique:true,
  },
  author: {
    type:String,
    required: true,
  },
  url:{
    type:String,
    minlength:3,
    required:true,
  },
  likes: {
    type:Number,
    default:0,
  },
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.plugin(uniqueValidator,{ message:'{VALUE} already exists in bloglist' })

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports =mongoose.model('Blog',blogSchema)