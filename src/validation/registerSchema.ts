import * as Yup from 'yup';

const errorMessages = {
  email: 'Email must be a valid email address',
  required: 'This field is required',
  passwordMin: 'Password must be at least 6 characters long',
  usernameMin: 'Username must be at least 3 characters long',
};

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email(errorMessages.email)
    .required(errorMessages.required),
  password: Yup.string()
    .min(6, errorMessages.passwordMin)
    .required(errorMessages.required),
  username: Yup.string()
    .min(3, errorMessages.usernameMin)
    .required(errorMessages.required),
});

export default registerSchema;
