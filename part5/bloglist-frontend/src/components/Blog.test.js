import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/react'

import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let mockHandler
  beforeEach(() => {
    const blog = {
      title: 'some title',
      author: 'alireza gholami',
      url: 'https://ag.com',
      likes: 500
    }
    mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} removeBlog={() => { }} addLike={mockHandler} />
    )
  })

  test('renders just title', () => {
    // component.debug()

    // const div = component.container.querySelector('div')

    // console.log(prettyDOM(div))

    expect(component.container).toHaveTextContent(
      'some title'
    )
  })

  test('does not render url or number of likes by default', () => {
    const div = component.container.querySelector('.blog')
    expect(div).not.toHaveTextContent(
      'https://ag.com'
    )
    expect(div).not.toHaveTextContent(
      '500'
    )
  })

  test('show url and likes when show button clicked', () => {
    const div = component.container.querySelector('.blog')
    const button = component.container.querySelector('button')
    fireEvent.click(button)
    expect(div).toHaveTextContent(
      'https://ag.com'
    )
    expect(div).toHaveTextContent(
      '500'
    )
  })

  test('when like button clicked twice, likeHandler is called twice too', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)
    const likeButton = component.container.querySelector('.likeBtn')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)


    expect(mockHandler.mock.calls).toHaveLength(2)

  })


})






