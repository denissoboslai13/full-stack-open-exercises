require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    title: 'Test2',
    author: 'Admin',
    url: 'some url again',
    likes: 496548,
})
blog.save().then(result => {
    console.log(`Added ${result.title} successfully`)
    mongoose.connection.close()
})