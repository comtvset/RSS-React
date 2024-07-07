import React from 'react';
import { ButtonError } from 'src/components/ButtonError/ButtonError';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary';
import { Form } from 'src/components/form/Form';

export const Main: React.FC = () => {
  return (
    <>
      <ErrorBoundary>
        <Form />
        <ButtonError cusomError="My custom Error" />
      </ErrorBoundary>
    </>
  );
};
