import { useState } from 'react'

const Blog = ({ blog, updateBlog, delBlog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(v => !v)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    <div style={blogStyle} data-testid="blog">
      <div>
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <div>
          <div>
            {blog.url}
          </div>
          <div>
            <span data-testid="likes-count">
              likes {blog.likes}
            </span>
            <button onClick={() => updateBlog(blog)}>like</button>
          </div>
          <div>
            by {blog.author}
          </div>
          {delBlog && (
            <div>
              <button onClick={() => delBlog(blog)}>
                delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog