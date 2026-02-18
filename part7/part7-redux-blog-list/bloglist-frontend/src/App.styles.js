import styled, { createGlobalStyle, css } from "styled-components";
import { Link } from "react-router-dom";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #303030;
    font-family: Arial, sans-serif;
    color: #aeaeae;
    overflow-x: hidden;
  }
`;
export const NavLink = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  color: #aeaeae;
  transition: 0.2s ease all;

  &:hover {
    color: #00a7cc;
  }

  ${(props) =>
    props.primary &&
    css`
      text-decoration: underline;

      &:hover {
        color: #777eff;
      }
    `}
`;

export const NavBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  width: 100%;
  gap: 4rem;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  font-size: 20px;
  background-color: #242424;
  color: #aeaeae;
`;

export const Content = styled.main`
  padding: 1rem;
`;

export const ListStyle = styled.div`
  border: none;
  border-radius: 5px;
  background-color: #454545;
  padding: 15px;
  margin-top: 10px;
  transition: 0.3s ease all;

  &:hover {
    background-color: #5f5f5f;
  }
`;

export const ListLink = styled(Link)`
  color: #aeaeae;
  text-decoration: none;
  font-size: 20px;
  transition: 0.3s ease all;

  &:hover {
    color: #8a31ff;
  }
`;

export const NavButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 1px solid #aeaeae;
  color: #aeaeae;
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 18px;
  transition: 0.2s ease all;

  &:hover {
    color: #0077cc;
    border: 1px solid #0077cc;
  }

  ${(props) =>
    props.primary &&
    css`
      margin: 0;

      &:hover {
        color: #8a31ff;
        border: 1px solid #8a31ff;
      }
    `}

  ${(props) =>
    props.secondary &&
    css`
      margin: 0px;
      margin-top: 5px;

      &:hover {
        color: #ff7977;
        border: 1px solid #ff7977;
      }
    `}
`;

export const StyledRow = styled.tr`
  background-color: #454545;

  &:nth-child(even) {
    background-color: #5f5f5f;
  }
`;

export const StyledData = styled.td`
  padding: 1rem 2rem;
  border-radius: 5px;
  border: none;
`;

export const StyledHead = styled.th`
  padding: 1rem 2rem;
  background-color: #5f5f5f;
  border-radius: 5px;
  border: none;
`;

export const StyledTable = styled.table`
  border: none;
  border-spacing: 8px;
  font-size: 20px;
  text-align: center;
`;

export const UserListContainer = styled.div`
  background-color: #414141;
  padding: 1rem 2rem;
  border-radius: 10px;

  p {
    margin: 0px;
    margin-top: 10px;
    font-size: 30px;
  }

  li {
    margin-bottom: 10px;
    font-size: 18px;
  }
`;

export const BlogMainContainer = styled.div`
  background-color: #373737;
  display: flex;
  padding: 1rem;
  border-radius: 5px;
  flex-direction: column;
  gap: 10px;
  align-items: left;
  font-size: 20px;
  margin-bottom: 1rem;
  transition: 0.3s ease all;

  &:hover {
    background-color: #424242;
  }

  a {
    text-decoration: underline;
    font-weight: 500;
    color: #aeaeae;
    transition: 0.2s ease all;

    &:hover {
      color: #8a31ff;
    }
  }
`;

export const BlogItemsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const BlogCommentContainer = styled.div`
  background-color: #373737;
  display: flex;
  padding: 1rem;
  border-radius: 5px;
  flex-direction: column;
  gap: 5px;
  align-items: left;
  font-size: 20px;
  transition: 0.2s ease all;

  &:hover {
    background-color: #424242;
  }

  h2 {
    margin-top: 0px;
  }
`;

export const BlogCommentFormContainer = styled.div`
  background-color: #303030;
  padding: 15px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 10px;
  font-size: 22px;
`;

export const BlogCommentInput = styled.input`
  margin-right: 20px;
  padding: 5px;
  background: #5f5f5f;
  color: black;
  border: none;
  border-radius: 5px;
  margin-left: 5px;
  font-size: 18px;
  outline: none;
  transition: 0.2s ease all;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }

  &:focus {
    background-color: #848484;
  }
`;
