import React, { Component } from "react";
import { Formik } from "formik";
import { Button, Input } from "antd";
import Text from "antd/es/typography/Text";


class AddStudentForm extends Component {
   render() {
      const inputMarginY = { margin: '5px 0' };
      return (
          <Formik
              initialValues={ {
                 firstName: '',
                 lastName: '',
                 email: '',
                 gender: ''
              } }

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
                    errors.gender = '* Gender must be (MALE, male, FEMALE, female)';
                 }

                 return errors;
              } }
              onSubmit={ ( values, { setSubmitting } ) => {
                 setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                 }, 400);
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
                    /* and other goodies */
                 } ) => (
                 <>
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
                           placeholder="Gender. E.g. Male or Female"/>
                       { errors.gender && touched.gender &&
                       <Text type="danger">{ errors.gender }</Text> }

                    </form>
                    <Button className="bg-success text-white mt-2" type="submit" disabled={ isSubmitting }>
                       Submit
                    </Button>
                 </>
             ) }
          </Formik>

      );
   }
}


export default AddStudentForm
