import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/react'

import Blog from './Blog'

test('renders just title', () => {
  const blog = {
    title: 'some title',
    author: 'alireza gholami',
    url: 'https://ag.com',
    likes: 500
  }

  const component = render(
    <Blog blog={blog} removeBlog={() => { }} addLike={() => { }} />
  )
  component.debug()

  const div = component.container.querySelector('div')

  console.log(prettyDOM(div))

  expect(component.container).toHaveTextContent(
    'some title'
  )

})

test('does not render url or number of likes by default ', () => {
  const blog = {
    title: 'some title',
    author: 'alireza gholami',
    url: 'https://ag.com',
    likes: 500
  }

  const component = render(
    <Blog blog={blog} removeBlog={() => { }} addLike={() => { }} />
  )
  const div = component.container.querySelector('.blog')
  expect(div).not.toHaveTextContent(
    'https://ag.com'
  )
  expect(div).not.toHaveTextContent(
    '500'
  )
})
