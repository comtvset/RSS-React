import React from 'react';

interface ErrorBoundaryState {
  error: null | Error;
  errorInfo: null | React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  handleReturnClick = () => {
    this.setState({ error: null, errorInfo: null });
    localStorage.setItem('queryDataPage', JSON.stringify('1'));
  };

  render() {
    if (this.state.error) {
      const errorMessage: React.CSSProperties = {
        whiteSpace: 'break-spaces',
        overflowWrap: 'anywhere',
        backgroundColor: '#00000057',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '10px',
      };

      return (
        <div>
          <h2>Something went wrong...</h2>
          <details style={errorMessage}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </details>
          <button onClick={this.handleReturnClick}>Return</button>
        </div>
      );
    }
    return this.props.children;
  }
}
