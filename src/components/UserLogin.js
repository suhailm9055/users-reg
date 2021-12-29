import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";
function UserLogin() {
  const validationSchema = yup.object().shape({
    emailorphonenumber: yup
      .string("Enter your Email/Phone Number")
      .required("Email/Phone Number is required")
      .test("test-name", "Enter Valid Phone/Email", function (value) {
        const emailRegex =
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        const phoneRegex = /^(\+91-|\+91|0)?\d{10}$/;
        let isValidEmail = emailRegex.test(value);
        let isValidPhone = phoneRegex.test(value);
        if (!isValidEmail && !isValidPhone) {
          return false;
        }
        return true;
      }),
    password: yup.string().required("Required!").min(3),
  });
  const initialValues = {
    emailorphonenumber: "",
    password: "",
  };
  let loginSuccess=false
  
  let loginErr=true
  return (
    <div className="container mt-3 ">
      <div className="row ">
        <div className="col-md-5 m-auto">
          <h1 className="text-primary mb-5">User Log In</h1>
 
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                let data={
                    "emailorphonenumber": values.emailorphonenumber,
                    "password": values.password 
                }
                
              await axios
                .post("https://api.oopacks.com/api/test/login", data)
                .then(function (response) {
                  //handle success
                  
                  console.log(response);
                  alert("Login Success");
                   loginSuccess=true
                })
                .catch(function (response) {
                  //handle error
                   loginErr=true
                  console.log(axios);
                  alert(JSON.stringify(response, null, 2));
                });
            }}
          >
            {({ formik, values, errors }) => (
               
              <Form className="col-10 m-auto">
                <label htmlFor={values.emailorphonenumber}>Email</label>
                <Field
                  className="form-control shadow-none my-1"
                  placeholder="Email"
                  name="emailorphonenumber"
                  type="emailorphonenumber"
                />
                <div className="text-danger">
                  {errors.emailorphonenumber ? (
                    <p1>{errors.emailorphonenumber}</p1>
                  ) : null}
                </div>
                <label htmlFor={values.password}>Password</label>
                <Field
                  className="form-control shadow-none my-1"
                  placeholder=" Password"
                  name="password"
                  type="Password"
                />
                <div>
                  <div className="text-danger">
                    {errors.password ? <p1>{errors.password}</p1> : null}
                  </div>
                </div>

                <div>
                  <button
                    className="btn btn-primary mt-3 my-5 col-12"
                    type="submit"
                  >
                    Log In
                  </button>
                </div>
                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
              </Form>
            )}
          </Formik>

          <div className="container col-11 mr-auto">
          <Link to="/forgetPassword">
              {" "}
              <button className="btn btn-danger mt-2  " type="button">
              Forgot Password{" "}
              </button>
            </Link>
            <p className="mt-2">New User,Please do Sign Up</p>
            <Link to="/">
              {" "}
              <button className="btn btn-success mt-2  " type="button">
                Sign Up{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
