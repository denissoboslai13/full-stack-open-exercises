const { test, expect, beforeEach, describe } = require('@playwright/test')
const { createBlog, loginWith, getBlog, likeNTimes } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Denis Soboslai',
        username: 'denissoboslai13',
        password: 'densob'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
  })
  test('Successful login', async ({ page }) => {
    await loginWith(page, 'denissoboslai13', 'densob')
    await expect(page.getByText('Denis Soboslai logged in')).toBeVisible()
  })
  test('Login fails with wrong credentials', async ({ page }) => {
    await loginWith(page, 'denissoboslai13', 'wrong')

    const errorDiv = page.locator('.error')
    await expect(errorDiv).toContainText('wrong username or password')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('Denis Soboslai logged in')).not.toBeVisible()
  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'denissoboslai13', 'densob')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'a blog created by playwright', 'localhost')
      await expect(page.locator('div').filter({ hasText: 'a blog created by playwright '}).nth(3)).toBeVisible()
    })
    describe('and several blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'first blog', 'localhost 1')
        await createBlog(page, 'second blog', 'localhost 2')
        await createBlog(page, 'third blog', 'localhost 3')
      })

      test('one can be liked', async ({ page }) => {
        await page.pause()
        const secondBlogText = page.getByText('second blog by Denis')
        const secondBlogElement = secondBlogText.locator('..')
      
        await secondBlogElement.getByRole('button', { name: 'view' }).click()
        await secondBlogElement.getByRole('button', { name: 'like' }).click()
        await expect(secondBlogElement.getByText('1')).toBeVisible()
      })

      test('one can be deleted', async ({ page }) => {
        await page.pause()
        const thirdBlogElement = page.getByTestId('blog').nth(2)
      
        await thirdBlogElement.getByRole('button', { name: 'view' }).click()
        await thirdBlogElement.getByRole('button', { name: 'delete' }).click()
        await thirdBlogElement.waitFor()
        await expect(thirdBlogElement).not.toBeVisible()
      })
      test('different user cannot see delete button', async ({ page, request }) => {
        await request.post('/api/users', {
          data: {
            name: 'root',
            username: 'root',
            password: 'root'
          }
        })

        await page.getByRole('button', { name: 'logout' }).click()
        await page.getByText('logged out').waitFor()
        await page.pause()
        await loginWith(page, 'root', 'root')
        const firstBlogText = page.getByText('first blog by Denis')
        const firstBlogElement = firstBlogText.locator('..')
      
        await firstBlogElement.getByRole('button', { name: 'view' }).click()
        await expect(firstBlogElement.getByRole('button', { name: 'delete' })).not.toBeVisible()
      })

      test('blogs are ordered by likes', async ({ page }) => {
        const titles = ['first blog', 'second blog', 'third blog']

        for (const title of titles) {
          const blog = await getBlog(page, title)
          await blog.getByRole('button', { name: 'view' }).click()
        }

        const first = await getBlog(page, 'first blog')
        const second = await getBlog(page, 'second blog')
        const third = await getBlog(page, 'third blog')

        await likeNTimes(second, 3)
        await likeNTimes(third, 2)
        await likeNTimes(first, 1) 

        const orderedBlogs = await page.locator('[data-testid="blog"]').all()
        const likeCounts = []

        for (const blog of orderedBlogs) {
          const text = await blog.getByTestId('likes-count').innerText()
          likeCounts.push(Number(text.replace('likes ', '')))
        }

        const sorted = [...likeCounts].sort((a, b) => b - a)

        expect(likeCounts).toEqual(sorted)
      })
    })
  })
})