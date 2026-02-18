import { useSelector } from "react-redux";
import { NotificationBox } from "./Components.styles";

const Success = () => {
  const message = useSelector((state) => state.success);

  if (!message) return null;

  return <NotificationBox success>{message}</NotificationBox>;
};

export default Success;
