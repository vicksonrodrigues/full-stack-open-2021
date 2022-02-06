/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'
import { initializeUsers } from './userReducer'

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type:'NEW_BLOG',
      payload:
        newBlog
    })
    dispatch(initializeUsers())
  }
}

export const initializeBlog = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOG_LIST',
      payload:
        blogs,
    })
  }
}

export const deleteBlog =(content) => {
  return async dispatch => {
    const ok = window.confirm(`Remove blog ${content.title} by ${content.author}`)
    if(ok)
    {
      await blogService.remove(content)
      dispatch({
        type:'REMOVE_BLOG',
        payload:
        content,
      })
      dispatch(initializeUsers())
    }
  }
}

export const likeBlog = (content) => {
  return async dispatch => {
    const likedBlog= await blogService.update({ ...content,likes:content.likes +1 , user: content.user.id })
    dispatch({
      type:'LIKE_BLOG',
      payload:
        likedBlog
    })
  }
}

export const blogComment = (id,content) => {
  return async dispatch => {
    const addComment = await blogService.newComment(id,content)
    const commentedBlog = await blogService.getBlog(addComment.blog)
    console.log('AddComment', addComment)
    dispatch({
      type:'NEW_COMMENT',
      payload:
        commentedBlog
    })

  }
}

const blogReducer = (state = [],action) => {
  switch (action.type){

  case 'NEW_BLOG':
    return [...state,action.payload]

  case 'INIT_BLOG_LIST':
    return action.payload

  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.payload.id)

  case 'LIKE_BLOG':
    const id = action.payload.id
    const blogToChange = state.find(n => n.id === id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }
    return state.map(blog =>
      blog.id !== id ? blog : changedBlog
    )

  case 'NEW_COMMENT':
    return state.map(blog =>
      blog.id !== action.payload.id ? blog : action.payload
    )

  default:
    return state
  }
}

export default blogReducer