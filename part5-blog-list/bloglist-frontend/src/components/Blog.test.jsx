import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders only title and author initially', () => {
  const blog = {
    title: 'Component testing',
    author: 'Admin',
    likes: 12,
    url: 'something something'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText(
    'Component testing by Admin'
  )

  expect(element).toBeDefined()
  expect(screen.queryByText(blog.url)).toBeNull()
  expect(screen.queryByText(`likes ${blog.likes}`)).toBeNull()
})

test('url and likes are shown after clicking view button', async () => {
  const blog = {
    title: 'Component testing',
    author: 'Admin',
    likes: 12,
    url: 'something something'
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element1 = screen.getByText(blog.url)
  const element2 = screen.getByText(`likes ${blog.likes}`)

  expect(element1).toBeVisible()
  expect(element2).toBeVisible()
})

test('clicking the like button calls twice calls handler twice', async () => {
  const blog = {
    title: 'Component testing',
    author: 'Admin',
    likes: 12,
    url: 'something something'
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} updateBlog={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})