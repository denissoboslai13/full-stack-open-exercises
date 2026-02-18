import { useSelector } from "react-redux";
import { NotificationBox } from "./Components.styles";

const Error = () => {
  const message = useSelector((state) => state.error);

  if (!message) return null;

  return <NotificationBox>{message}</NotificationBox>;
};

export default Error;
