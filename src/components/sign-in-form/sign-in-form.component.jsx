import { useState } from 'react';
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailPassword,
} from '../../utils/firebase/firebase.utils';
import Button from '../button/button-component';
import FormInput from '../form-input/form-input.component';

import './sign-in-form.style.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

export default function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    // await createDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInAuthUserWithEmailPassword(email, password);
      resetFormFields();
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className='sign-up-container'>
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button buttonType='google' type='button' onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>

        {/* <button type='submit'>Sign Up</button> */}
      </form>
    </div>
  );
}
