import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Error from './components/Error'
import Success from './components/Success'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs([...blogs].sort((a, b) => b.likes - a.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    try {
      blogService.create(blogObject).then(returnedBlog => {
        const blogWithUser = { ...returnedBlog, user: user }
        setBlogs(blogs.concat(blogWithUser))
      })
      setSuccessMessage(`a new blog ${blogObject.title} by ${user.name} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch {
      setErrorMessage('could not add note')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const toggleVisibility = () => {
    setVisible(v => !v)
  }

  const handleLike = async (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    const returnedBlog = await blogService.update(blog.id, updatedBlog)


    const blogWithUser = { ...returnedBlog, user: blog.user }

    const updateBlogs = blogs.map(b =>
      b.id === blog.id ? blogWithUser : b
    )

    setBlogs([...updateBlogs].sort((a, b) => b.likes - a.likes))
  }


  const delBlog = async (blog) => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author} `)
    await blogService.deleteBlog(blog.id)
    setBlogs(blogs.filter(b => b.id !== blog.id))
  }

  const handleLogin = async event => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage('successfully logged in')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleClick = () => {
    window.localStorage.clear()
    setUser('')
    setErrorMessage('logged out')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        setUsername={({ target }) => setUsername(target.value)}
        setPassword={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Togglable>
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <h1>create new</h1>
      <BlogForm createBlog={addBlog}
        setSuccess={setSuccessMessage}
        setError={setErrorMessage}/>
    </Togglable>
  )

  console.log(blogs)
  return (
    <div>
      <Error message={errorMessage}/>
      <Success message={successMessage}/>
      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          <a>{user.name} logged in</a>
          <button onClick={handleClick}>Logout</button>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} visible={visible} toggleVisibility={toggleVisibility} updateBlog={handleLike} delBlog={user.name === blog.user.name ? delBlog : undefined}/>
          )}
        </div>
      )}
    </div>
  )
}

export default App