import { useState } from 'react'

const NewBlog = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author:author,
      url: url
    })
    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return(
    <>
      <h1>Add new blog</h1>
      <form onSubmit={addBlog}>
        <div>
        title
          <input
            type="text"
            value={title}
            placeholder='Title'
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          url
          <input
            value={url}
            placeholder='Url'

            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          Author
          <input
            placeholder='Author'

            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>

    </>
  )}
export default NewBlog