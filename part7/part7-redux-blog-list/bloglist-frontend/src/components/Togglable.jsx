import { useState, useImperativeHandle } from "react";
import { TogglableButton } from "./Components.styles";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <TogglableButton onClick={toggleVisibility}>
          {props.buttonLabel}
        </TogglableButton>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <TogglableButton primary onClick={toggleVisibility}>
          Cancel
        </TogglableButton>
      </div>
    </div>
  );
};

export default Togglable;
