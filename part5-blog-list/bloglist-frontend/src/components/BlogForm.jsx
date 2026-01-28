import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = event => {
    setNewTitle(event.target.value)
  }

  /* const handleAuthorChange = event => {
    setNewAuthor(event.target.value)
  } */

  const handleUrlChange = event => {
    setNewUrl(event.target.value)
  }

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <label>
            Title
            <input value={newTitle} onChange={handleTitleChange} 
            placeholder='Blog Title'/>
          </label>
        </div>
        {/* <div>
          <label>
            Author:
            <input value={newAuthor} onChange={handleAuthorChange} />
          </label>
        </div> */}
        <div>
          <label>
            Url
            <input value={newUrl} onChange={handleUrlChange} 
            placeholder='Blog Url'/>
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm