import React from 'react';
import { fetchData } from 'src/serveces/API/fetchData.ts';
import { Card } from 'src/components/Card/Card';
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
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    const savedQuery = localStorage.getItem('queryData');

    if (savedQuery) {
      try {
        const localStorageData = JSON.parse(savedQuery);
        if (localStorageData.query === '') {
          this.runFirstFetch('');
        } else {
          this.setState({ query: localStorageData.query }, () => {
            this.runFirstFetch(localStorageData.query);
          });
        }
      } catch (error) {
        error;
        this.runFirstFetch('');
      }
    } else {
      this.runFirstFetch('');
    }
  }

  handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { query } = this.state;
    const searchData = { query };
    localStorage.setItem('queryData', JSON.stringify(searchData));
    this.setState({ isLoading: true });
    try {
      const results = await fetchData(query);
      this.setState({ results });
    } catch (error) {
      error;
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

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
      </>
    );
  }
}
