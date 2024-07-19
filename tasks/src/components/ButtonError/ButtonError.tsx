import React, { useState } from 'react';
import style from 'src/components/form/Forms.module.scss';

interface ErrorState {
  cusomError: string;
}

export const ButtonError: React.FC<ErrorState> = ({ cusomError }) => {
  const [errorState, setErrorState] = useState<boolean>(false);

  const handleClickError = () => {
    setErrorState(true);
    throw Error('UUUUPS! ERROR!');
  };

  if (errorState) {
    throw new Error(cusomError);
  }
  return (
    <>
      <button className={style.errorBtn} onClick={handleClickError}>
        Error
      </button>
    </>
  );
};
