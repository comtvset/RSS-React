import React, { useState } from 'react';
import style from 'src/components/form/Forms.module.scss';

interface ButtonErrorProps {
  customError: string;
  onError?: (error: Error) => void;
}

export const ButtonError: React.FC<ButtonErrorProps> = ({ customError, onError }) => {
  const [errorState, setErrorState] = useState<boolean>(false);

  const handleClickError = () => {
    setErrorState(true);
    const error = new Error('UUUUPS! ERROR!');
    if (onError) {
      onError(error);
    }
    throw error;
  };

  if (errorState) {
    throw new Error(customError);
  }

  return (
    <button className={style.errorBtn} onClick={handleClickError}>
      Error
    </button>
  );
};
