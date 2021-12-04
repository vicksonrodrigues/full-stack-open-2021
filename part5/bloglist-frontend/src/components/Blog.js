import React,{ useState } from 'react'
const Blog = ({ blog,incrementLike , removeBlog }) => {
  const [expand, setExpand] = useState(false)

  const blogVisibilty=() => {
    setExpand(!expand)

  }

  if(expand===true)
  {
    return(
      <div className="blog">
        <div>
          {blog.title} - {blog.author}
          <button onClick={blogVisibilty}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>likes:{blog.likes}
          <button id='like-button'onClick={incrementLike} value={blog.id}>like</button></div>
        <div>{blog.user.name}</div>
        <button id='delete-button' onClick={removeBlog} value={blog.id}>delete</button>

      </div>

    )}
  else
  {

    return(
      <div className="blog">
        <div>
          {blog.title} - {blog.author}
          <button id='view-button' onClick={blogVisibilty}>view</button>
        </div>
      </div>
    )}
}

export default Blog