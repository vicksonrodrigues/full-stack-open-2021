import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component tests', () => {
  let blog = {
    title:'React patterns',
    author:'Michael Chan',
    url:'https://reactpatterns.com/',
    likes:7,
    user:{
      id:'618fd91cdaf7ae3a5000f44a',
      name:'root',
      username:'SuperUser'

    }
  }

  let mockIncrementLike = jest.fn()
  let mockRemoveBlog= jest.fn()

  test('renders blog\'s title and author', () => {
    const component = render(
      <Blog blog={blog} incrementLike={mockIncrementLike} removeBlog={mockRemoveBlog}/>
    )

    expect(component.container).toHaveTextContent(
      'React patterns - Michael Chan'
    )
  })

  test('blog\'s url and number of likes are shown when the button clicked.',() => {



    const component = render(
      <Blog blog={blog} incrementLike={mockIncrementLike} removeBlog={mockRemoveBlog}/>
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'https://reactpatterns.com/'
    )

    expect(component.container).toHaveTextContent(
      '7'
    )
  })

  test('like button is clicked twice,',() => {



    const component = render(
      <Blog blog={blog} incrementLike={mockIncrementLike} removeBlog={mockRemoveBlog}/>
    )

    const view = component.getByText('view')
    fireEvent.click(view)

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockIncrementLike.mock.calls).toHaveLength(2)
  })


})