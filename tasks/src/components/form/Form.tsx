import React from 'react';
import { fetchData } from 'src/serveces/API/fetchData.ts';
import { Card } from 'src/components/Card/Card.tsx';
import 'src/components/form/Forms.scss';

interface Person {}

interface FormState {
  query: string;
  results: Person[];
  isLoading: boolean;
}

export class Form extends React.Component<object, FormState> {
  state = {
    query: '',
    results: [],
    isLoading: false,
  };

  private runFirstFetch = async (query: string) => {
    this.setState({ isLoading: true });
    try {
      const results = await fetchData(query);
      this.setState({ results });
    } catch (error) {
      error;
      // console.error('Error in runFirstFetch:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    this.runFirstFetch(this.state.query);
  }

  handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      const results = await fetchData(this.state.query);
      this.setState({ results });
    } catch (error) {
      error;
      // console.error('Error in handleClick:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleClickError = () => {};

  render() {
    return (
      <>
        <form className="form-form">
          <label htmlFor="search" />
          <input
            className="form-input"
            type="text"
            name="search"
            value={this.state.query}
            onChange={this.handleInputChange}
          />

          <button
            type="submit"
            onClick={(event) => {
              this.handleClick(event);
            }}
          >
            search
          </button>
        </form>
        <div className="title">
          <h2>Search Results:</h2>
          <div className="cards-container">
            {this.state.isLoading ? (
              <p className="loading">Loading...</p>
            ) : this.state.results.length === 0 ? (
              <p className="ups">ups...</p>
            ) : (
              this.state.results.map((result, index) => <Card key={index} result={result} />)
            )}
          </div>
        </div>
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
