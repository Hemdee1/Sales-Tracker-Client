import { useEffect, useRef } from "react";
import { useGlobalAuthContext } from "../contexts/authContext";

const Login = () => {
  const formRef = useRef();
  const { logIn, error, setError } = useGlobalAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = formRef.current.email.value;
    const password = formRef.current.password.value;

    logIn(email, password);
  };

  useEffect(() => {
    setError(null);
  }, [setError]);

  return (
    <div className="in">
      <h3>Login</h3>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        {error && <span className="error">{error}</span>}
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Login;
