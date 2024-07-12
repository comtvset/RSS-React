import React from 'react';
import { ButtonError } from 'src/components/ButtonError/ButtonError';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary';
import { Form } from 'src/components/Form/Form';

export const Main: React.FC = () => {
  return (
    <>
      <ErrorBoundary>
        <Form query={''} results={[]} isLoading={false} />
        <ButtonError cusomError="My custom Error" />
      </ErrorBoundary>
    </>
  );
};
