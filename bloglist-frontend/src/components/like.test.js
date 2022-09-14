import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './togglable'
import Blog from './Blog'

describe('<Togglable />', () => {
  let container
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test',
    url: "test.com"
  }
  const handleLike = jest.fn()
  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
       <Blog blog={blog} handleLike={handleLike}/>
      </Togglable>
    ).container
  })

 
  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    

    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)
    const FirstLikes = container.querySelector('.likes')

    const like = screen.getByText("Like")
    await user.click(like)
    await user.click(like)


    const div = container.querySelector('.likes')
    expect(handleLike.mock.calls).toHaveLength(2)


  })
  
  
})