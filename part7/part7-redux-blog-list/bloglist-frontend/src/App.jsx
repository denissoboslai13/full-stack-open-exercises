import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { setSuccess } from "./reducers/successReducer";
import { setError } from "./reducers/errorReducer";

import {
  initializeBlogs,
  appendBlog,
  voteBlog,
  deleteBlog,
  commentBlogAsync,
} from "./reducers/blogReducer";

import { getLogout, getLogin } from "./reducers/loggedUserReducer";

import { initializeUsers } from "./reducers/userReducer";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useMatch,
  useParams,
} from "react-router-dom";

import loginService from "./services/login";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Error from "./components/Error";
import Success from "./components/Success";
import Togglable from "./components/Togglable";

import {
  GlobalStyle,
  NavLink,
  NavBar,
  Content,
  ListStyle,
  ListLink,
  NavButton,
  StyledRow,
  StyledData,
  StyledHead,
  StyledTable,
  UserListContainer,
  BlogMainContainer,
  BlogItemsContainer,
  BlogCommentContainer,
  BlogCommentFormContainer,
  BlogCommentInput,
} from "./App.styles";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  const blogs = useSelector(({ blogs }) => {
    return blogs;
  });

  console.log(blogs);
  const sorted = [...blogs].sort((a, b) => b.likes - a.likes);

  const users = useSelector(({ users }) => {
    return users;
  });

  const user = useSelector(({ loggedUser }) => {
    console.log(loggedUser);
    return loggedUser;
  });

  console.log("users:", users);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  /*const [user, setUser] = useState(null)*/

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      //setUser(user)
      dispatch(getLogin(user));
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      dispatch(appendBlog(blogObject));
      dispatch(
        setSuccess(`A new blog '${blogObject.title}' by ${user.name} added`, 5),
      );
    } catch {
      dispatch(setError("could not add note", 5));
    }
  };

  const handleLike = async (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    dispatch(voteBlog(blog.id, updatedBlog));
    dispatch(setSuccess(`You voted for '${blog.title}' by ${blog.author}`, 5));
  };

  const delBlog = async (blog) => {
    const confirmDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`,
    );

    if (!confirmDelete) return;

    dispatch(deleteBlog(blog.id));
    navigate("/");
    dispatch(setError(`You deleted '${blog.title}'`, 5));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      //setUser(user)
      setUsername("");
      setPassword("");
      console.log("user: ", user);
      dispatch(getLogin(user));
      dispatch(setSuccess("Successfully logged in", 5));
    } catch {
      dispatch(setError("Wrong username or password", 5));
    }
  };

  const handleClick = () => {
    window.localStorage.clear();
    //setUser('')
    dispatch(getLogout());
    dispatch(setError("Logged out", 5));
    navigate("/");
  };

  const loginForm = () => (
    <Togglable buttonLabel="Login">
      <LoginForm
        username={username}
        password={password}
        setUsername={({ target }) => setUsername(target.value)}
        setPassword={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Togglable>
  );

  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel="New blog" ref={blogFormRef}>
      <h1>Create new</h1>
      <BlogForm
        createBlog={addBlog}
        setSuccess={setSuccessMessage}
        setError={setErrorMessage}
      />
    </Togglable>
  );

  const padding = {
    paddingRight: 5,
  };

  const canDelete = (blog) => {
    console.log("user: ", user);
    console.log("blog.user: ", blog.user);
    if (!user || !blog.user) return false;

    const blogUserId = typeof blog.user === "object" ? blog.user.id : blog.user;

    return user.id === blogUserId;
  };

  const BlogsView = () => {
    if (!user) {
      return null;
    }

    return (
      <div>
        <h2>Blogs</h2>
        {blogForm()}
        {/* {sorted.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            visible={visible}
            toggleVisibility={toggleVisibility}
            updateBlog={handleLike}
            delBlog={canDelete(blog) ? delBlog : undefined}
          />
        ))} */}
        {sorted.map((blog) => (
          <ListStyle key={blog.id}>
            <ListLink to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </ListLink>
          </ListStyle>
        ))}
      </div>
    );
  };

  const UsersView = () => {
    if (!user) {
      return null;
    }

    return (
      <div>
        <h2>Users</h2>
        <StyledTable>
          <thead>
            <StyledRow>
              <StyledHead>Name</StyledHead>
              <StyledHead>Blogs created</StyledHead>
            </StyledRow>
          </thead>
          <tbody>
            {users.map((u) => (
              <StyledRow key={u.id}>
                <StyledData>
                  <NavLink primary to={`/users/${u.id}`}>
                    {u.name}
                  </NavLink>
                </StyledData>
                <StyledData>{u.blogs.length}</StyledData>
              </StyledRow>
            ))}
          </tbody>
        </StyledTable>
      </div>
    );
  };

  const Home = () => (
    <div>
      {user && <h1>Home</h1>}
      <BlogsView />
      <UsersView />
    </div>
  );

  const User = ({ users }) => {
    const { id } = useParams();
    const oneUser = users.find((u) => u.id === id);
    if (!oneUser) return <div>User not found</div>;

    return (
      <div>
        <h1>{oneUser.name}</h1>
        <UserListContainer>
          <p>Added blogs</p>
          <div>
            <ul>
              {oneUser.blogs.map((blog) => (
                <li key={blog.id}>{blog.title}</li>
              ))}
            </ul>
          </div>
        </UserListContainer>
      </div>
    );
  };

  const OneBlog = ({ blogs, handleLike, delBlog, user }) => {
    const { id } = useParams();
    const oneBlog = blogs.find((blog) => blog.id === id);
    const [comment, setComment] = useState("");
    if (!oneBlog) return <div>Blog not found</div>;

    const handleComment = (e) => {
      e.preventDefault();
      if (comment.trim() === "") return;
      dispatch(setSuccess(`You commented ${comment} on '${oneBlog.title}'`, 5));
      dispatch(commentBlogAsync(oneBlog.id, comment));
      setComment("");
    };

    return (
      <div>
        <h1>
          {oneBlog.title} by {oneBlog.author}
        </h1>
        <BlogMainContainer>
          <BlogItemsContainer>
            Link:
            <a href={oneBlog.url}>{oneBlog.url}</a>
          </BlogItemsContainer>
          <BlogItemsContainer>
            {oneBlog.likes} likes
            <NavButton primary onClick={() => handleLike(oneBlog)}>
              Like
            </NavButton>
          </BlogItemsContainer>
          <div>Added by {oneBlog.author}</div>
          <div>
            {canDelete(oneBlog) && (
              <NavButton secondary onClick={() => delBlog(oneBlog)}>
                delete
              </NavButton>
            )}
          </div>
        </BlogMainContainer>
        <BlogCommentContainer>
          <div>
            <h2>Comments</h2>
            <ul>
              {oneBlog.comments?.map((c, index) => (
                <li key={index}>{c}</li>
              ))}
            </ul>
          </div>
          <BlogCommentFormContainer>
            <form onSubmit={handleComment}>
              <BlogCommentInput
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment"
              />
              <NavButton primary type="submit">
                Add Comment
              </NavButton>
            </form>
          </BlogCommentFormContainer>
        </BlogCommentContainer>
      </div>
    );
  };

  console.log(blogs);
  return (
    <>
      <GlobalStyle />
      <div>
        {user && (
          <NavBar>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/blogs">Blogs</NavLink>
            <NavLink to="/users">Users</NavLink>
            <a style={padding}>{user.name} logged in</a>
            <NavButton onClick={handleClick}>Logout</NavButton>
          </NavBar>
        )}

        <Content>
          <Error message={errorMessage} />
          <Success message={successMessage} />
          {!user && loginForm()}
          <Routes>
            <Route path="/users/:id" element={<User users={users} />} />
            <Route
              path="/blogs/:id"
              element={
                <OneBlog
                  blogs={sorted}
                  handleLike={handleLike}
                  delBlog={delBlog}
                  user={user}
                />
              }
            />
            <Route
              path="/blogs"
              element={
                <div>
                  <BlogsView />
                </div>
              }
            ></Route>
            <Route
              path="/users"
              element={
                <div>
                  <UsersView />
                </div>
              }
            ></Route>
            <Route
              path="/"
              element={
                <div>
                  <Home />
                </div>
              }
            ></Route>
          </Routes>
        </Content>
      </div>
    </>
  );
};

export default App;
