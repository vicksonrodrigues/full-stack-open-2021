
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogMenu from './BlogMenu'

import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Paper } from '@mui/material'

const BlogList = () => {
  const allBlogs = useSelector(state => state.blogs)

  const byLikes = (b1, b2) => b2.likes - b1.likes
  return(
    <div>
      <BlogMenu/>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant='h4' >
                  Blog Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h4' >
                  Author
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allBlogs.sort(byLikes).map(blog =>
              <TableRow key={blog.id} >
                <TableCell  >
                  <Button component={Link} to = {`/blogs/${blog.id}`}>
                    {blog.title}
                  </Button></TableCell>
                <TableCell >{blog.author}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList

/*<div key ={blog.id}>
<Link to ={`/blogs/${blog.id}`}><i>{blog.title}</i> by {blog.author}</Link>
</div>*/