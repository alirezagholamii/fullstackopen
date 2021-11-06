import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('event handler it received as props with the right details', () => {
    const mockHandler = jest.fn()
    const component = render(
      <BlogForm createBlog={mockHandler} />
    )

    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    fireEvent.change(title, {
      target: { value: 'How to become an engineer.' }
    })
    fireEvent.change(author, {
      target: { value: 'Matti Luukkainen' }
    })
    fireEvent.change(url, {
      target: { value: 'https://fullstackopen.com/en/' }
    })
    fireEvent.submit(form)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect((mockHandler.mock.calls[0][0]).title).toBe('How to become an engineer.');
    expect((mockHandler.mock.calls[0][0]).author).toBe('Matti Luukkainen');
    expect((mockHandler.mock.calls[0][0]).url).toBe('https://fullstackopen.com/en/');

  })
})