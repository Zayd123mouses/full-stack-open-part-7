import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlog from './newBlog'
import userEvent from '@testing-library/user-event'

test('<NewBlog /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<NewBlog createBlog={createBlog} />)

  const input1 = screen.getByPlaceholderText('Title')
  const input2 = screen.getByPlaceholderText('Url')
  const input3 = screen.getByPlaceholderText('Author')

  const sendButton = screen.getByText('Add')

  await user.type(input1, 'testing a form...')
  await user.type(input2, 'testing.com...')
  await user.type(input3, 'Tester')
  
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
  expect(createBlog.mock.calls[0][0].url).toBe('testing.com...')
  expect(createBlog.mock.calls[0][0].author).toBe('Tester')

})