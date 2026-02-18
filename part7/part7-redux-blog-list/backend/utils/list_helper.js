const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const sum = blogs.map((blog) => blog.likes);
  return sum.length === 1
    ? blogs[0].likes
    : sum.reduce((partialSum, a) => partialSum + a, 0);
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const highest = Math.max(...likes);
  const found = blogs.find((blog) => blog.likes === highest);
  return blogs.length === 1 ? blogs[0] : found;
};

const mostBlogs = (blogs) => {
  const highest = _.map(_.groupBy(blogs, "author"), (blogs, author) => ({
    author,
    blogs: blogs.length,
  }));
  return _.maxBy(highest, "blogs");
};

const mostLikes = (blogs) => {
  const result = _.map(_.groupBy(blogs, "author"), (blogs, author) => ({
    author,
    likes: _.sumBy(blogs, "likes"),
  }));
  return _.maxBy(result, "likes");
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
