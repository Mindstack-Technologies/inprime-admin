import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const LoginForm = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default LoginForm;