import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  age: yup
    .number()
    .transform((originalValue) => {
      const parsed = Number(originalValue);
      return isNaN(parsed) ? undefined : parsed;
    })
    .required('Age is required')
    .min(1, 'You must be polite number'),
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be no more than 32 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[@$!%*?&]/, 'Password must contain at least one special character'),
  rePassword: yup
    .string()
    .required('Please confirm your password')
    .test('passwords-match', 'Passwords must match', function (value) {
      return value === this.parent.password;
    }),
  gender: yup
    .string()
    .required('Gender is required')
    .oneOf(['male', 'female', 'other'], 'Invalid gender'),
  country: yup.string().required('Country is required'),
  accept: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  file: yup
    .mixed<FileList>()
    .required('File is required')
    .test('fileExists', 'File is required', (value) => {
      return value instanceof FileList ? value.length > 0 : !!value;
    })
    .test('fileFormat', 'Unsupported file format', (value) => {
      const file = value instanceof FileList ? value[0] : value;
      return file ? ['image/jpeg', 'image/png'].includes(file.type) : false;
    })
    .test('fileSize', 'File is too large', (value) => {
      const file = value instanceof FileList ? value[0] : value;
      return file ? file.size <= 2 * 1024 * 1024 : true;
    }),
});
