import styled, { css } from "styled-components";

export const Button = styled.button`
  background-color: #242424;
  border-radius: 3px;
  border: 1px solid #aeaeae;
  color: #aeaeae;
  padding: 0.25em 1em;
  font-size: 18px;
  transition: 0.2s ease all;
  margin-top: 10px;

  &:hover {
    color: lightgreen;
    border: 1px solid lightgreen;
  }
`;

export const FormStyle = styled.div`
  background-color: #242424;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 10px;
  border-radius: 10px;
  font-size: 22px;
`;

export const StyledInput = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  background: #5f5f5f;
  color: black;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  font-size: 15px;
  outline: none;
  transition: 0.2s ease all;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }

  &:focus {
    background-color: #848484;
  }

  ${(props) =>
    props.primary &&
    css`
      margin-bottom: 0px;
    `}
`;

export const NotificationBox = styled.div`
  color: red;
  background: #ffcccb;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  padding: 10px;
  padding-left: 15px;
  margin-bottom: 15px;
  transition: 0.5s ease all;
  opacity: 0;
  transform: translateY(-10px);
  animation: fadeIn 0.3s ease forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${(props) =>
    props.success &&
    css`
      color: green;
      background: lightgreen;
    `}
`;

export const LoginFormButton = styled.button`
  background-color: #242424;
  border-radius: 3px;
  border: 1px solid #aeaeae;
  color: #aeaeae;
  padding: 0.25em 1em;
  font-size: 18px;
  transition: 0.2s ease all;
  margin-top: 10px;

  &:hover {
    color: lightgreen;
    border: 1px solid lightgreen;
  }
`;

export const LoginFormStyle = styled.div`
  background-color: #242424;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 10px;
  border-radius: 10px;
  font-size: 22px;
`;

export const LoginFormStyledInput = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  background: #5f5f5f;
  color: black;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  font-size: 15px;
  outline: none;
  transition: 0.2s ease all;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }

  &:focus {
    background-color: #848484;
  }

  ${(props) =>
    props.primary &&
    css`
      margin-bottom: 0px;
    `}
`;

export const TogglableButton = styled.button`
  background-color: #242424;
  border-radius: 3px;
  border: 1px solid #aeaeae;
  color: #aeaeae;
  padding: 0.25em 1em;
  font-size: 18px;
  transition: 0.2s ease all;
  margin-bottom: 10px;

  &:hover {
    color: #8a31ff;
    border: 1px solid #8a31ff;
  }

  ${(props) =>
    props.primary &&
    css`
      &:hover {
        color: #ff7977;
        border: 1px solid #ff7977;
      }
    `}
`;
