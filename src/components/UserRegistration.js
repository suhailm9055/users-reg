import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, useFormik } from "formik";
import * as yup from "yup";

function UserRegistration() {
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Required!").min(3),
    emailorphonenumber: yup
      .string("Enter your Email/Phone Number")
      .required("Email/Phone Number is required")
      .test("test-name", "Enter Valid Phone/Email", function (value) {
        const emailRegex =
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        const phoneRegex = /^(\+91-|\+91|0)?\d{10}$/; // Change this regex based on requirement
        let isValidEmail = emailRegex.test(value);
        let isValidPhone = phoneRegex.test(value);
        if (!isValidEmail && !isValidPhone) {
          return false;
        }
        return true;
      }),
    password: yup.string().required("Required!").min(3),
    lastName: yup.string().required("Required!").min(1),
  });
  const initialValues = {
    emailorphonenumber: "",
    password: "",
    firstName: "",
    lastName: "",
  };

  return (
    <div className="container mt-3 ">
      <div className="row ">
        <div className="col-md-5 m-auto">
          <h1 className="text-primary mb-5">User Registration</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                let data={
                    "emailorphonenumber": values.emailorphonenumber,
                    "password": values.password,
                    "firstName": values.firstName,
                    "lastName": values.lastName
                 
                }
              await axios
                .post("https://api.oopacks.com/api/test/register",data)
                .then(function (response) {
                  //handle success
                  console.log(response);
                  alert("registration Success");
                })
                .catch(function (response) {
                  //handle error
                  console.log(axios);
                  alert(JSON.stringify(response, null, 2));
                });
            }}
          >
            {({ formik, values, errors }) => (
              <Form className="col-10 m-auto">
                <label htmlFor={values.emailorphonenumber}>Email or Mobile Number</label>
                <Field
                  className="form-control shadow-none my-1"
                  placeholder="Email or Mobile Number"
                  name="emailorphonenumber"
                  type="email"
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

                <label htmlFor="">First Name</label>
                <Field
                  className="form-control shadow-none my-1"
                  placeholder="First Name"
                  name="firstName"
                  type="text"
                />
                <div className="text-danger">
                  {errors.firstName ? <p1>{errors.firstName}</p1> : null}
                </div>
                <label htmlFor="">lastName</label>
                <Field
                  className="form-control shadow-none my-1"
                  placeholder="lastName"
                  name="lastName"
                  type="text"
                />
                <div className="text-danger">
                  {errors.lastName ? <p1>{errors.lastName}</p1> : null}
                </div>
                <div>
                  <button
                    className="btn btn-success mt-3 my-5 col-12"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>

                <pre>{JSON.stringify(values, null, 2)}</pre>
              </Form>
            )}
          </Formik>
          <div className="container col-11 mr-auto">
            <p>Already a User,please do login</p>
            <Link to="/login">
              {" "}
              <button className="btn btn-primary mt-2  " type="button">
                Log In{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRegistration;
