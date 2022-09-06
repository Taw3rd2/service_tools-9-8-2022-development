import { useState } from "react";

import { googleAuth, logIn } from "../../firebase/firestore.utils";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useNavigate } from "react-router-dom";

import { HourglassEmpty } from "@mui/icons-material";

import "./signin.css";

export default function SignIn({ setUser }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const logInWithEmail = async (e) => {
    e.preventDefault();
    console.log("log in with email");
    setLoading(true);
    try {
      await logIn(email, password).then((res) => {
        console.log("Signed in with email: ", res.user);
        setUser(res.user);
        setLoading(false);
        navigate("/homepage");
      });
    } catch {
      setLoading(false);
      alert("Your credentials are incorrect...");
    }
  };

  const logInWithGoogle = () => {
    console.log("log in with google");
    const provider = new GoogleAuthProvider();
    signInWithPopup(googleAuth, provider)
      .then((res) => {
        console.log("Signed in with google: ", res.user);
        setUser(res.user);
        setLoading(false);
        navigate("/homepage");
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  return (
    <div className="signIn">
      <div className="signInWrapper">
        <div className="signInLeft">
          <h3 className="signInLogo">Service Tools</h3>
          <span className="signInDescription">
            Tools build for Technicians, and Dispatchers!
          </span>
        </div>
        <div className="signInRight">
          <div className="signInBox">
            <form
              onSubmit={logInWithEmail}
              autoComplete="on"
              className="signInForm"
            >
              <input
                type="text"
                placeholder="Email"
                className="signInInput"
                autoComplete="current-email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="signInInput"
                autoComplete="current-password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="signInButton" type="submit">
                {loading ? <HourglassEmpty /> : `Sign In With Email`}
              </button>
              <span
                className="signInForgot"
                onClick={() => alert("Go look in the book...")}
              >
                Forgotten Password?
              </span>
            </form>
            <button
              className="signInWithGoogle"
              onClick={() => logInWithGoogle()}
              disabled
            >
              {loading ? <HourglassEmpty /> : `Sign In With Google`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
