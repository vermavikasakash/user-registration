import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import {registerFunction} from "../../serviceApi/registerApi"
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import GoogleSignInButton from "../../components/GoogleSignInButton/GoogleSignInButton";

const Register = () => {
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const packageInfo = {
    name,
    email,
    password,
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    switch (true) {
      case name === "":
        setError("Please enter your name");
        return;

      case email === "":
        setError("Please enter email address");
        return;

      case password === "":
        setError("Please enter Password");
        return;

      case !emailRegex.test(email):
        setError("Invalid email format");
        return;

      default:
        await registerFn();
        break;
    }
  };

  async function registerFn() {
    try {
      const result = await registerFunction(packageInfo);
      if (result.data.success) {
        toast.success(result.data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  }

  // ! JSX START
  return (
    <Layout>
      <div className={styles.register}>
        <h1>Register</h1>
        <p className={styles.authHint}>Create a password account, or sign in instantly with Google.</p>
        <Form className={styles.authForm} onSubmit={(e) => handleSubmit(e)}>
          <GoogleSignInButton />
          <div className={styles.divider}>
            <span>or</span>
          </div>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Please Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Please Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <div className={styles.mainPassword}>
              <Form.Control
                type={passwordShow ? "password" : "text"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className={`${styles.eyeIcon}`}
                onClick={(e) => {
                  e.preventDefault();
                  setPasswordShow(!passwordShow);
                }}
              >
                {passwordShow ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
          </Form.Group>

          {/* //? ERROR TEXT  */}
          {error && <p className={styles.errorText}>{error}</p>}

          <div className={styles.login_bottom_btn}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="primary" onClick={() => navigate("/")}>
              Login
            </Button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default Register;
