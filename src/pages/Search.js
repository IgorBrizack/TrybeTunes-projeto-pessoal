import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    isDisabled: true,
    search: '',
  }

  checkSearch = () => {
    const { search } = this.state;
    if (search.length >= 1) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  onInputChange = ({ target }) => this.setState({ [target.name]: target.value },
    this.checkSearch());

  render() {
    const { isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search">
            <input
              name="search"
              onChange={ this.onInputChange }
              id="search"
              data-testid="search-artist-input"
              type="text"
            />
          </label>
          <button
            // onClick=''
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
