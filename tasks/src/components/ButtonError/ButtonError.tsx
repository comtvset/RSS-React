import React from 'react';

interface ErrorState {
  cusomError: string;
}

export class ButtonError extends React.Component<ErrorState> {
  state = {
    errorState: false,
  };

  handleClickError = () => {
    this.setState({ errorState: true });
    throw Error('UUUUPS! ERROR!');
  };
  render() {
    if (this.state.errorState) {
      throw Error(this.props.cusomError);
    }
    return (
      <>
        <button
          className="error-btn"
          onClick={() => {
            this.handleClickError();
          }}
        >
          Error
        </button>
      </>
    );
  }
}
