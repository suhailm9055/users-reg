import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";

function ForgetPassword() {
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
      });
      const initialValues = {
        emailorphonenumber: "",
      };
      return (
        <div className="container mt-3 ">
          <div className="row ">
            <div className="col-md-5 m-auto">
              <h1 className="text-primary mb-5">Password Recovery</h1>
    
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={ async (values) => {
                    
                let data={
                    "emailorphonenumber": values.emailorphonenumber,
                    "password": " "
                
                }
                  await axios
                    .put("https://api.oopacks.com/api/test/forgotpassword", data)
                    .then(function (response) {
                      //handle success
                      console.log(response);
                      alert(JSON.stringify(response.data, null, 2));
                    })
                    .catch(function (response) {
                      //handle error
                      console.log(axios);
                      alert(JSON.stringify(response.data, null, 2));
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
                   
                    <div>
                      <button
                        className="btn btn-primary mt-3 my-5 col-12"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                    {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
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
    

export default ForgetPassword
