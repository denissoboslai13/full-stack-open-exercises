import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls onSubmit and adds new blog with correct data', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByLabelText('Title')
  const urlInput = screen.getByLabelText('Url')

  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'New blog')
  await user.type(urlInput, 'something something')
  await user.click(sendButton)

  console.log(createBlog.mock.calls[0][0])

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('New blog')
  expect(createBlog.mock.calls[0][0].url).toBe('something something')
})