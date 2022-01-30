import React, { useRef } from "react";
import styled from "styled-components";
import useToggle from "../hooks/useToggle";
import Modal from "./modal";

const LoginWrapper = styled.div`
  background-color: white;
  border: 1px solid black;
  width: 500px;
  height: 300px;
`;

const Login = () => {
  const { toggleValue, isOpen } = useToggle();
  const checkboxRef = useRef();
  const { toggleValue: toggleChecked, isOpen: isChecked } = useToggle();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <div
      className="vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{ backgroundColor: "#00aaff" }}
    >
      <button onClick={() => toggleValue(true)} className="btn-danger p-2">
        Login
      </button>

      <Modal isOpen={isOpen} handleClick={() => toggleValue()}>
        <LoginWrapper
          onClick={e => e.stopPropagation()}
          className="d-flex flex-column p-4 gap-2"
        >
          <input ref={usernameRef} placeholder="Enter username" autoFocus />
          <input
            placeholder="Enter Password"
            ref={passwordRef}
            type={isChecked ? "text" : "password"}
          />
          <input
            type="checkbox"
            ref={checkboxRef}
            onClick={() => toggleChecked(checkboxRef?.current?.checked)}
          />
          <button>Login</button>
          <button className="btn-primary">Create Account</button>
        </LoginWrapper>
      </Modal>
    </div>
  );
};

export default Login;
