import React, { Component } from 'react';
import { Formik } from 'formik';
import Text from "antd/lib/typography/Text";
import { Input, Button} from 'antd';


const inputMarginY = { margin: '5px 0' };

class EditStudentForm extends Component {
   render() {
      const { submitter, initialValues } = this.props;

      return (
          <Formik
              initialValues={ initialValues }
              validate={ values => {
                 let errors = {};
                 if ( !values.email ) {
                    errors.email = 'Required';
                 } else if (
                     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                 ) {
                    errors.email = 'Invalid email address';
                 }
                 if ( !values.firstName ) {
                    errors.firstName = 'First name required';
                 }
                 if ( !values.lastName ) {
                    errors.lastName = 'Last name required';
                 }
                 return errors;
              } }

              // Handles onSubmit :
              onSubmit={ ( values, { setSubmitting } ) => {
                 console.log(values); // values has Selected Student Record
                 submitter(values);
                 setSubmitting(false);
              } }
          >
             { ( {
                    values,
                    errors,
                    touched,
                    handleChange,
                    isValid,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    submitForm
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

                    <Button className="mt-2 d-block"
                            onClick={ () => submitForm() }
                            type="submit"
                            disabled={ isSubmitting || ( touched && !isValid ) }>
                       Submit
                    </Button>
                 </form>
             ) }
          </Formik>
      )
   }
}


export default EditStudentForm
