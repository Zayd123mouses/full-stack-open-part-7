import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/BlogReducer'
import { Table, Form, Button } from 'react-bootstrap'

const NewBlog = ({ togglableRef }) => {
   const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    dispatch(createBlog({
      title: title,
      author:author,
      url: url
    }))
    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return(
    <>
      <h1>Add new blog</h1>
      <Form onSubmit={addBlog}>
        <div>
       <Form.Label>Title</Form.Label> 
          <Form.Control
            type="text"
            value={title}
            placeholder='Title'
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
        <Form.Label>Url</Form.Label>
          <Form.Control
            value={url}
            placeholder='Url'

            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
        <Form.Label>Author</Form.Label>
          <Form.Control
            placeholder='Author'

            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <Button variant="primary" type="submit" >
          Add
        </Button>
      </Form>

    </>
  )}
export default NewBlog