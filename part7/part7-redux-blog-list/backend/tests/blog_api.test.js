const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const api = supertest(app);

const getToken = async () => {
  const password = helper.initialUsers[0].password;
  const username = helper.initialUsers[0].username;
  const user = {
    username: username,
    password: password,
  };
  const token = await api.post("/api/login").send(user);

  return token.body.token;
};

describe("api testing", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);

    await User.deleteMany({});
    const usersToInsert = await Promise.all(
      helper.initialUsers.map(async (u) => {
        const passwordHash = await bcrypt.hash(u.password, 10);
        return {
          username: u.username,
          name: u.name,
          passwordHash,
        };
      }),
    );
    await User.insertMany(usersToInsert);
  });

  test("correct amount of blogs is returned", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("unique identifier is called id", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(Object.keys(response.body[0])[4], "id");
  });

  test("a blog can be added ", async () => {
    const newBlog = {
      title: "New blog",
      author: "me",
      url: "no idea",
      likes: 7,
    };
    const token = await getToken();
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDB();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map((n) => n.title);
    assert(contents.includes("New blog"));
  });

  describe("missing properties", () => {
    test("if missing likes property, default to 0", async () => {
      const newBlog = {
        title: "Im missing my likes property",
        author: "yeah",
        url: "no",
      };

      const token = await getToken();

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDB();
      const contents = blogsAtEnd.map((n) => n.likes);
      assert.strictEqual(contents[contents.length - 1], 0);
    });

    test("if missing title, return status code 400", async () => {
      const newBlog = {
        author: "missing",
        url: "title",
        likes: 2,
      };

      const token = await getToken();

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    });

    test("if missing url, also return status code 400", async () => {
      const newBlog = {
        title: "missing",
        author: "url",
        likes: 2,
      };

      const token = await getToken();

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    });

    test("if missing token, response status 401 unauthorized", async () => {
      const newBlog = {
        title: "missing",
        url: "something",
        likes: 2,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(401)
        .expect("Content-Type", /application\/json/);
    });
  });
  test("deleting a blog post, status code 204", async () => {
    const newBlog = {
      title: "Blog to delete",
      url: "no idea",
      likes: 7,
    };
    const token = await getToken();
    const blogId = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    await api
      .delete(`/api/blogs/${blogId.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDB();

    const contents = blogsAtEnd.map((n) => n.title);
    assert(!contents.includes(newBlog.title));

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });

  test("updating a specific blog post", async () => {
    const initialBlog = {
      title: "Blog to update",
      url: "no idea",
      likes: 7,
    };
    const token = await getToken();
    const blogId = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(initialBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const updatedBlog = {
      title: "Updated blog",
      url: "no idea",
      likes: 13,
    };

    await api
      .put(`/api/blogs/${blogId.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedBlog)
      .expect(200);

    const response = await api.get(`/api/blogs/${blogId.body.id}`);
    assert.strictEqual(13, response.body.likes);
  });
});

after(async () => {
  await mongoose.connection.close();
});
