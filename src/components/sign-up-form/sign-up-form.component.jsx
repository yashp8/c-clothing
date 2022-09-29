import { useState } from 'react';
import {
  createAuthUserWithEmailPassword,
  createDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import Button from '../button/button-component';
import FormInput from '../form-input/form-input.component';

import './sign-up-form.style.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) return;
    try {
      const { user } = await createAuthUserWithEmailPassword(email, password);
      user.displayName = displayName;
      await createDocumentFromAuth(user);
      resetFormFields();
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className='sign-up-container'>
      <h2>Dont have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          inputOptions={{
            type: 'text',
            onChange: changeHandler,
            name: 'displayName',
            value: displayName,
            required: true,
          }}
        />
        <FormInput
          label='Email'
          inputOptions={{
            type: 'email',
            onChange: changeHandler,
            name: 'email',
            value: email,
            required: true,
          }}
        />
        <FormInput
          label='Password'
          inputOptions={{
            type: 'password',
            onChange: changeHandler,
            name: 'password',
            value: password,
            required: true,
          }}
        />
        <FormInput
          label='Confirm Password'
          inputOptions={{
            type: 'password',
            onChange: changeHandler,
            name: 'confirmPassword',
            value: confirmPassword,
            required: true,
          }}
        />
        <Button type='submit'>Sign Up</Button>
        {/* <button type='submit'>Sign Up</button> */}
      </form>
    </div>
  );
}
