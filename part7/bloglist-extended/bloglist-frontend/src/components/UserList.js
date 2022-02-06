
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogMenu from './BlogMenu'

import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Paper } from '@mui/material'

const UserList=() => {
  const allUsers = useSelector(state => state.users)

  const byBlogs = (b1, b2) => b2.blogs.length - b1.blogs.length
  return(
    <div>
      <BlogMenu/>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant='h4' >
                 Users
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h4' >
                  Blogs
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.sort(byBlogs).map(user =>
              <TableRow key={user.id}>
                <TableCell >
                  <Button component={Link} to = {`/users/${user.id}`} >
                    {user.name}
                  </Button>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )

}
export default UserList