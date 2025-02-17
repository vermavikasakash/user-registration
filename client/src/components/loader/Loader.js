import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const Loader = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let interval = setInterval(() => {
      setCount((preValue) => --preValue);
    }, 1000);
    count === 0 && navigate("/login", { state: location.pathname });
    return () => clearInterval(interval);
  }, [count, navigate, location]);
  
  //! JSX START
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Redirecting to you {count} in seconds</h1>

      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
