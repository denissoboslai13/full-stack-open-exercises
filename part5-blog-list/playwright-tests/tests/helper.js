const { expect } = require('@playwright/test')

const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}


const createBlog = async (page, title, url) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByRole('textbox', { name: 'Title'}).fill(title)
  await page.getByRole('textbox', { name: 'Url'}).fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByTestId('blog').filter({ hasText: title }).waitFor()
}

const getBlog = (page, title) => {
  return page
    .getByTestId('blog')
    .filter({ hasText: title })
}

const likeNTimes = async (blog, times) => {
    for (let i = 0; i < times; i++) {
    const beforeText = await blog.getByTestId('likes-count').innerText()
    const before = Number(beforeText.replace('likes ', ''))
    await blog.getByRole('button', { name: 'like' }).click()
    await expect(blog.getByTestId('likes-count')).toHaveText(`likes ${before + 1}`)
    }
}

export { loginWith, createBlog, getBlog, likeNTimes }