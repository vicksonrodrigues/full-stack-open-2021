import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const addBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={addBlog} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, { target: { value: 'Michael Chan' } })
  fireEvent.change( title, { target: { value: 'React patterns' } })
  fireEvent.change(url, { target: { value: 'https://reactpatterns.com/' } })
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].author).toBe('Michael Chan' )
  expect(addBlog.mock.calls[0][0].title).toBe('React patterns' )
  expect(addBlog.mock.calls[0][0].url).toBe('https://reactpatterns.com/' )

})