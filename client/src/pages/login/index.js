import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import auth from "../../utils/auth";
import { LOGIN } from "../../utils/graphQL/mutations";

const LoginPage = () => {
  const [formState, changeFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  if (error) {
    console.log(error);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    changeFormState({
      ...formState,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await login({
        variables: { ...formState },
      });
      auth.login(data.login.token);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="authincation h-100 mt-5">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/landing">
                        <img src="images/logo-full-h.png" alt=""></img>
                      </Link>
                    </div>
                    <h4 className="text-center mb-4 text-white">Sign in</h4>
                    <form>
                      <div className="form-group">
                        <label className="mb-1 text-white">
                          <strong>Email</strong>
                        </label>
                        <input
                          onChange={handleChange}
                          type="email"
                          name="email"
                          className="form-control"
                        ></input>
                      </div>
                      <div className="form-group">
                        <label className="mb-1 text-white">
                          <strong>Password</strong>
                        </label>
                        <input
                          onChange={handleChange}
                          type="password"
                          name="password"
                          className="form-control"
                        ></input>
                      </div>
                      <div className="text-center mt-5">
                        <button
                          onClick={handleSubmit}
                          className="btn bg-white text-primary btn-block"
                        >
                          Sign Me In
                        </button>
                      </div>
                    </form>
                    {error && (
                      <div className="text-danger text-center mt-3">
                        Login failed
                      </div>
                    )}
                    <div className="new-account mt-3">
                      <p className="text-white">
                        Don't have an account?{" "}
                        <Link className="text-white" to="/signup">
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
