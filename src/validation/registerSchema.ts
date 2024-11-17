import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters long')
    .required('Username is required'),
});

export default registerSchema;
