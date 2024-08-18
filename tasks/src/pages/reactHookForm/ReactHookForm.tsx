import { useForm } from 'react-hook-form';
import { Header } from 'src/components/header/Header';
import style from 'src/pages/manualForm/ManualForm.module.scss';
import { schema } from 'src/serveces/yup/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'src/components/inputs/input/Input';
import { Select } from 'src/components/inputs/select/Select';
import { selectCountries } from 'src/store/countriesSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from 'src/components/inputs/checkbox/Checkbox';
import { setData } from 'src/store/dataSlice';

type FormData = {
  name: string | null;
  age: number | null;
  email: string | null;
  password: string | null;
  rePassword: string | null;
  gender: string | null;
  country: string | null;
  file: File | FileList | null;
  accept?: boolean;
};

const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const ReactHookForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(selectCountries);

  const onSubmit = async (data: FormData) => {
    const accept = data.accept ?? false;

    let fileBase64: string | null = null;

    if (data.file && (data.file as FileList).length > 0) {
      fileBase64 = await readFileAsBase64((data.file as FileList)[0]);
    }

    const formDataWithAdditionalField = {
      ...data,
      file: fileBase64,
      typeForm: 'React Hook Form',
      accept,
    };

    dispatch(setData(formDataWithAdditionalField));
    navigate('/');
    reset();
  };

  return (
    <>
      <Header />
      <div className={style.main}>
        <div className={style.container}>
          <h3>React Hook Form 📋</h3>

          <form className={style.inputs} onSubmit={handleSubmit(onSubmit)}>
            <Input
              content="Name"
              type="text"
              label="nameInput"
              name="name"
              placeholder="write your name"
              error={errors?.name?.message}
              otherProps={register('name')}
            />
            <Input
              content="Age"
              type="number"
              label="ageInput"
              name="age"
              placeholder="write your age"
              error={errors?.age?.message}
              otherProps={register('age')}
            />
            <Input
              content="Email"
              type="text"
              label="emailInput"
              name="email"
              placeholder="write your email"
              error={errors?.email?.message}
              otherProps={register('email')}
            />
            <Input
              content="Password"
              type="password"
              label="passwordInput"
              name="password"
              placeholder="set password"
              error={errors?.password?.message}
              otherProps={register('password')}
            />
            <Input
              content="Confirm password"
              type="password"
              label="repeatPasswordInput"
              name="rePassword"
              placeholder="repeat password"
              error={errors?.rePassword?.message}
              otherProps={register('rePassword')}
            />
            <Select
              content="Gender"
              label="genderInput"
              name="gender"
              placeholder="choose gender"
              options={['male', 'female', 'other']}
              error={errors?.gender?.message}
              otherProps={register('gender')}
            />
            <Select
              content="Country"
              label="countryInput"
              name="country"
              placeholder="choose your country"
              options={countries}
              error={errors?.country?.message}
              otherProps={register('country')}
            />
            <Checkbox
              content="I agree to terms and conditions"
              label="accept"
              name="accept"
              placeholder="accept"
              error={errors?.accept?.message}
              otherProps={register('accept')}
            />
            <Input
              content="Upload .jpeg or .png image"
              type="file"
              label="fileInput"
              name="file"
              placeholder="file"
              error={errors?.file?.message}
              otherProps={register('file')}
            />

            <input className={style.submit} type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
};
