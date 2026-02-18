import { useState } from "react";
import { FormStyle, StyledInput, Button } from "./Components.styles";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <FormStyle>
      <form onSubmit={addBlog}>
        <div>
          <label>
            Title:
            <StyledInput
              value={newTitle}
              onChange={handleTitleChange}
              placeholder="Blog Title"
            />
          </label>
        </div>
        <div>
          <label>
            Url:
            <StyledInput
              primary
              value={newUrl}
              onChange={handleUrlChange}
              placeholder="Blog Url"
            />
          </label>
        </div>
        <Button type="submit">Create</Button>
      </form>
    </FormStyle>
  );
};

export default BlogForm;
