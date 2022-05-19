import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingScreen from './LoadingScreen';

class Search extends React.Component {
  state = {
    isDisabled: true,
    search: '',
    artists: [],
    hasArtist: false,
    loading: false,
  }

  checkSearch = () => {
    const { search } = this.state;
    if (search.length >= 1) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  renderArtist = () => {
    const { artists } = this.state;
    if (artists.length >= 1) {
      this.setState({ hasArtist: true });
    } else {
      this.setState({ hasArtist: false });
    }
  }

  onInputChange = ({ target }) => this.setState({ [target.name]: target.value },
    this.checkSearch());

  search = () => {
    const { search } = this.state;
    this.setState({ loading: true });
    searchAlbumsAPI(search).then((artist) => {
      this.setState({ artists: artist, loading: false });
      this.renderArtist();
    });
  }

  render() {
    const { isDisabled, loading, artists, hasArtist, search } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <LoadingScreen />
          : (
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
                onClick={ this.search }
                type="button"
                data-testid="search-artist-button"
                disabled={ isDisabled }
              >
                Pesquisar
              </button>
            </form>)}
        <div>
          {hasArtist ? (
            <h1>
              {`Resultado de álbuns de: ${search}`}
            </h1>) : <h1>Nenhum álbum foi encontrado</h1>}
          {hasArtist && artists.map((info) => (
            <div key={ info.artistID }>
              <p>{info.artistName}</p>
              <p>{info.collectionId}</p>
              <p>{info.collectionName}</p>
              <p>{info.collectionPrice}</p>
              <p>{info.artworkUrl100}</p>
              <p>{info.releaseDate}</p>
              <p>{info.trackCount}</p>
              <Link
                to={ `/album/${info.collectionId}` }
                data-testid={ `link-to-album-${info.collectionId}` }
              >
                link
              </Link>
            </div>))}
        </div>
      </div>
    );
  }
}

export default Search;
