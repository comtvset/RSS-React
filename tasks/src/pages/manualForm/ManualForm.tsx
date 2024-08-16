import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Header } from 'src/components/header/Header';
import { Checkbox } from 'src/components/inputs/checkbox/Checkbox';
import { Input } from 'src/components/inputs/input/Input';
import { Select } from 'src/components/inputs/select/Select';
import style from 'src/pages/manualForm/ManualForm.module.scss';
import { COUNTRY } from 'src/serveces/countries/countries';
import { schema } from 'src/serveces/yup/schema';
import { setData } from 'src/store/dataSlice';
import * as yup from 'yup';

export const ManualForm: React.FC = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const refName = useRef<HTMLInputElement | null>(null);
  const refAge = useRef<HTMLInputElement | null>(null);
  const refEmail = useRef<HTMLInputElement | null>(null);
  const refPassword = useRef<HTMLInputElement | null>(null);
  const refRePassword = useRef<HTMLInputElement | null>(null);
  const refGender = useRef<HTMLInputElement | null>(null);
  const refCountry = useRef<HTMLInputElement | null>(null);
  const refFile = useRef<HTMLInputElement | null>(null);
  const refAccept = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = useCallback(async () => {
    if (
      refName.current &&
      refAge.current &&
      refEmail.current &&
      refPassword.current &&
      refRePassword.current &&
      refGender.current &&
      refCountry.current &&
      refFile.current &&
      refAccept.current
    ) {
      const fileInput = refFile.current.files?.[0];

      try {
        const fileValidationData = {
          file: fileInput,
          name: refName.current?.value || null,
          age: refAge.current?.value || null,
          email: refEmail.current?.value || null,
          password: refPassword.current?.value || null,
          rePassword: refRePassword.current?.value || null,
          gender: refGender.current?.value || null,
          country: refCountry.current?.value || null,
          accept: refAccept.current?.checked || false,
        };

        await schema.validate(fileValidationData, { abortEarly: false });
        const fileBase64 = fileInput ? await readFileAsBase64(fileInput) : null;

        const data = {
          ...fileValidationData,
          file: fileBase64,
        };

        setErrors({});
        dispatch(setData(data));
        navigate('/');
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const validationErrors: Record<string, string> = {};
          err.inner.forEach((error) => {
            if (error.path) {
              validationErrors[error.path] = error.message;
            }
          });
          setErrors(validationErrors);
        } else {
          err;
        }
      }
    }
  }, [dispatch, navigate]);

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <Header />
      <div className={style.main}>
        <div className={style.container}>
          <h3>Manual Form 📋</h3>
          <div className={style.inputs}>
            <Input
              content="Name"
              type="text"
              label="nameInput"
              name="name"
              placeholder="write your name"
              ref={refName}
              error={errors.name}
            />
            <Input
              content="Age"
              type="number"
              label="ageInput"
              name="age"
              placeholder="write your age"
              ref={refAge}
              error={errors.age}
            />
            <Input
              content="Email"
              type="text"
              label="emailInput"
              name="email"
              placeholder="write your email"
              ref={refEmail}
              error={errors.email}
            />
            <Input
              content="Password"
              type="password"
              label="passwordInput"
              name="password"
              placeholder="set password"
              ref={refPassword}
              error={errors.password}
            />
            <Input
              content="Confirm password"
              type="password"
              label="repeatPasswordInput"
              name="rePassword"
              placeholder="repeat password"
              ref={refRePassword}
              error={errors.rePassword}
            />
            <Select
              content="Gender"
              label="genderInput"
              name="gender"
              placeholder="choose gender"
              options={['male', 'female', 'other']}
              ref={refGender}
              error={errors.gender}
            />
            <Select
              content="Country"
              label="countryInput"
              name="country"
              placeholder="choose your country"
              options={COUNTRY}
              ref={refCountry}
              error={errors.country}
            />
            <Input
              content="Upload .jpeg or .png image"
              type="file"
              label="fileInput"
              name="file"
              placeholder="file"
              ref={refFile}
              error={errors.file}
            />
            <Checkbox
              content="I agree to terms and conditions"
              label="accept"
              name="accept"
              placeholder="accept"
              ref={refAccept}
              error={errors.accept}
            />

            <button onClick={handleSubmit}>submit</button>
          </div>
        </div>
      </div>
    </>
  );
};
