import { useSelector } from 'react-redux';
import { Header } from 'src/components/header/Header';
import { selectFormData } from 'src/store/selectors';
import style from './Home.module.scss';

export const Home: React.FC = () => {
  const entries = useSelector(selectFormData);
  return (
    <>
      <Header />
      <div className={style.container}>
        <h1>Welcome to my Forms home page</h1>

        {entries.length > 0 ? (
          <div className={style.containerForms}>
            {entries.map((entry, index) => (
              <div
                key={index}
                className={`${style.formData} ${index === entries.length - 1 ? style.target : ''}`}
              >
                <h3>Used ({entry.typeForm})</h3>
                <p>Name: {entry.name}</p>
                <p>Age: {entry.age}</p>
                <p>Email: {entry.email}</p>
                <p>Password: {entry.password}</p>
                <p>Gender: {entry.gender}</p>
                <p>Country: {entry.country}</p>
                <p>Accept: {entry.accept}Yes</p>
                <div>
                  {entry.file ? (
                    <img
                      src={entry.file}
                      alt="img"
                      style={{ maxWidth: '300px', maxHeight: '300px' }}
                    />
                  ) : (
                    <p>No file uploaded</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2>No data available</h2>
        )}
      </div>
    </>
  );
};
