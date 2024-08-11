import style from './Switch.module.scss';
import { useTheme } from '../../context/useTheme';

export const Switch: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'light';

  return (
    <div className={style.switchWrapper}>
      <label className={style.switch}>
        <input type="checkbox" id="myCheckbox" checked={isDarkMode} onChange={toggleTheme} />
        <span className={`${style.slider} ${style.round}`}></span>
      </label>
    </div>
  );
};
