import {
  LoginFormStyle,
  LoginFormButton,
  LoginFormStyledInput,
} from "./Components.styles";

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {
  return (
    <LoginFormStyle>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username:
            <LoginFormStyledInput
              type="text"
              value={username}
              onChange={setUsername}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <LoginFormStyledInput
              primary
              type="password"
              value={password}
              onChange={setPassword}
            />
          </label>
        </div>
        <LoginFormButton type="submit">Login</LoginFormButton>
      </form>
    </LoginFormStyle>
  );
};

export default LoginForm;
