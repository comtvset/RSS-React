import { NavLink } from 'react-router-dom';
import style from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <>
      <div className={style.container}>
        <nav className={style.nav}>
          <NavLink to="/" className={({ isActive }) => (isActive ? style.active : '')}>
            Home
          </NavLink>
          <NavLink to="/manual-form" className={({ isActive }) => (isActive ? style.active : '')}>
            Manual Form
          </NavLink>
          <NavLink
            to="/react-hook-form"
            className={({ isActive }) => (isActive ? style.active : '')}
          >
            React Hook Form
          </NavLink>
        </nav>
      </div>
    </>
  );
};
