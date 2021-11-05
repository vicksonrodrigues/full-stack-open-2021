const _ = require('lodash')
const blog = require('../models/blog')

const dummy = (blogs) => {
  return 1
  // ...
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum,curr) => sum + curr.likes,0)||0
}

const favoriteBlog = (blogs) => {
  const favBlogs=blogs.reduce((fav,curr) => {
    return (fav.likes >=curr.likes)?fav:curr
  },blogs[0])
  const { _id,url,__v,...favBlog }=favBlogs
  return favBlog

}

const mostBlogs = (blogs) => {
  const result=_
    .chain(blogs)
    .countBy('author')
    .map((blogs,author) => ({ author,blogs }))
    .sortBy('blogs')
    .last()
    .value()
  if(result.author==='undefined'){
    return {}
  }
  else{
    return result
  }
}

const mostLikes = (blogs) => {
  const result = _
    .chain(blogs)
    .groupBy('author')
    .map((blog,author) => ({ author:author,likes:_.sumBy(blog,'likes') }))
    .orderBy('likes','desc')
    .head()
    .value()
  if(result.author==='undefined'){
    return {}
  }
  else{
    return result
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}