import React from "react";
import { Button, Input, Text } from "antd";
import { Formik } from "formik";
import { addNewStudent } from "../client";


// Stateless Components (Component that doesn't use State),
// Converts into Functional Component.
const inputMarginY = { margin: '5px 0' };

const AddStudentForm = props => (
    <Formik
        initialValues={ { firstName: '', lastName: '', email: '', gender: '' } }
        validate={ values => {
           const errors = {};
           if ( !values.firstName ) {
              errors.firstName = '* First Name Required';
           }
           if ( !values.lastName ) {
              errors.lastName = '* Last Name Required';
           }
           if ( !values.email ) {
              errors.email = '* Email Required';
           } else if (
               !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
           ) {
              errors.email = '* Invalid email address';
           }
           if ( !values.gender ) {
              errors.gender = '* Gender Required';
           } else if ( ![ 'MALE', 'Male', 'male', 'FEMALE', 'Female', 'female' ].includes(values.gender) ) {
              errors.gender = '* Gender must be "MALE" or "FEMALE"';
           }

           return errors;
        } }

        // Handles onSubmit :
        onSubmit={ ( student, { setSubmitting, resetForm } ) => {
           student.gender = student.gender.toUpperCase();   // Convert the 'gender' to Uppercase, else Jdbc WILL NOT process the query.
           addNewStudent(student)
               .then(() => {
                  // resetForm();       // Reset the form after Submitting.
                  props.onSuccess();
               })
               .catch(err => {
                  props.onFailure(err);
               })
               .finally(() => {
                  setSubmitting(false);
               });
        } }
    >
       { ( {
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              submitForm,     // ADD 'submitForm' to use for submitting IF we don't use the default Formik button.
              isValid
              /* and other goodies */
           } ) => (
           <form onSubmit={ handleSubmit }>
              <Input
                  style={ inputMarginY }
                  name="firstName"
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  value={ values.firstName }
                  placeholder="First Name. E.g. Jason"/>

              { errors.firstName && touched.firstName &&
              <Text type="danger">{ errors.firstName }</Text> }

              <Input
                  style={ inputMarginY }
                  name="lastName"
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  value={ values.lastName }
                  placeholder="Last Name. E.g. Bourne"/>
              { errors.lastName && touched.lastName &&
              <Text type="danger">{ errors.lastName }</Text> }

              <Input
                  style={ inputMarginY }
                  type="email"
                  name="email"
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  value={ values.email }
                  placeholder="Email.E.g. jasonbourne@gmail.com"/>
              { errors.email && touched.email &&
              <Text type="danger">{ errors.email }</Text> }

              <Input
                  style={ inputMarginY }
                  name="gender"
                  onChange={ handleChange }
                  onBlur={ handleBlur }
                  value={ values.gender }
                  placeholder="Gender. E.g. MALE or FEMALE"/>
              { errors.gender && touched.gender &&
              <Text type="danger">{ errors.gender }</Text> }

              <Button className="mt-2 d-block"
                  // Add this onClick() returning submitForm() IF not using Formik's default button element
                      onClick={ () => submitForm() }
                      type="submit"
                      disabled={ isSubmitting || ( touched && !isValid ) }>
                 Submit
              </Button>
           </form>
       ) }
    </Formik>
);


export default AddStudentForm
