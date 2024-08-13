import { Link } from 'react-router-dom';
import style from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <>
      <div className={style.container}>
        <nav className={style.nav}>
          <Link to="/">Home</Link>
          <Link to="/manual-form">Manual Form</Link>
          <Link to="/react-hook-form">React Hook Form</Link>
        </nav>
      </div>
    </>
  );
};
