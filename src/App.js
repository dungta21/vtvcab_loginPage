import "./App.css";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({
    username: "",
    phoneNumber: "",
    password: "",
  });
  const [confirm, setConfirm] = useState("");
  const [messages, setMessages] = useState([]);

  const signUpButtonOnClick = () => {
    const newMessages = ["", "", "", ""];

    if (user.username.length < 8 || isNumber(user.username[0])) {
      newMessages[0] = "Username is not valid.";
    }

    if (user.phoneNumber.length < 12) {
      newMessages[1] = "Phone number is not valid";
    }

    const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

    if (user.password.length < 8 || !regularExpression.test(user.password)) {
      newMessages[2] = "Password is not valid.";
    }

    if (user.password !== confirm) {
      newMessages[3] = "Password do not match.";
    }

    setMessages(newMessages);
  };

  function isNumber(char) {
    if (typeof char !== "string") {
      return false;
    }

    if (char.trim() === "") {
      return false;
    }

    return !isNaN(char);
  }

  const formatPhoneNumber = (event) => {
    let value = event.target.value.replace(/\D/g, "");

    if (value[4] !== undefined) {
      value = value.substring(0, 4) + "." + value.substring(4);
      if (value[8] !== undefined) {
        value = value.substring(0, 8) + "." + value.substring(8);
      }
    }

    setUser({
      ...user,
      phoneNumber: value,
    });
  };

  return (
    <div className="App">
      <div className="sign-up-page">
        <h1>Create account</h1>
        <form className="sign-up-form">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            maxLength="16"
            onChange={(event) =>
              setUser({
                ...user,
                username: event.target.value.replace(
                  /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
                  ""
                ),
              })
            }
          />
          <p className="message">{messages[0]}</p>
          <label htmlFor="phone-number">Phone number</label>
          <input
            type="text"
            id="phone-number"
            name="phone-number"
            value={user.phoneNumber}
            maxLength="12"
            onChange={(event) => {
              formatPhoneNumber(event);
            }}
          />
          <p className="message">{messages[1]}</p>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            maxLength="16"
            onChange={(event) =>
              setUser({
                ...user,
                password: event.target.value,
              })
            }
          />
          <p className="message">{messages[2]}</p>
          <label htmlFor="confirm">Confirm</label>
          <input
            type="password"
            id="confirm"
            name="confirm"
            value={confirm}
            maxLength="16"
            onChange={(event) => setConfirm(event.target.value)}
          />
          <p className="message">{messages[3]}</p>
          <button
            type="button"
            className="sign-up-button"
            onClick={signUpButtonOnClick}
          >
            Sign up
          </button>
          <h2>
            Already have an account?
            <span>
              <button type="button" className="login-here">
                Login here
              </button>
            </span>
          </h2>
        </form>
      </div>
    </div>
  );
}

export default App;
