import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css"; // CSS dosyanın yolu
import { useNavigate } from "react-router-dom"; // useNavigate hook'unu ekledik

const SignIn = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basit giriş simülasyonu
    if (user === "testuser" && pwd === "Test@1234") {
      setSuccess(true);
      navigate("/scenario-creation"); // Başarılı giriş sonrası yönlendirme
    } else {
      setErrMsg("Invalid Username or Password");
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>Welcome, {user}!</p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <span className={user ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={!user ? "invalid" : "hide"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">
              Password:
              <span className={pwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={!pwd ? "invalid" : "hide"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />

            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/* Sign Up linkine tıklanırsa Register sayfasına yönlendir */}
              <a href="#" onClick={() => navigate("/register")}>
                Sign Up
              </a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default SignIn;
