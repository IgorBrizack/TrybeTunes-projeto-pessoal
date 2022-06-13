/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingScreen from './LoadingScreen';
import '../bootstrap.min.css';

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
    this.checkSearch);

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
            <form className="search-position">
              <div className="search-inputs-main-container">
                <div className="search-inputs">
                  <label htmlFor="search">
                    <input
                      className="form-control"
                      name="search"
                      onChange={ this.onInputChange }
                      id="search"
                      data-testid="search-artist-input"
                      type="text"
                    />
                  </label>
                </div>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={ this.search }
                    type="button"
                    data-testid="search-artist-button"
                    disabled={ isDisabled }
                  >
                    Pesquisar
                  </button>
                </div>
              </div>
            </form>
          )}
        <div>
          <div className="searching-text">
            {hasArtist ? (
              <h2>
                {`Resultado de álbuns de: ${search}`}
              </h2>) : <h2>Nenhum álbum foi encontrado</h2>}
          </div>
          <div className="artist-main-container">
            {hasArtist && artists.map((info) => (
              <div className="artist-card" key={ info.artistID }>
                <p>{info.artistName}</p>
                <p>{info.collectionName}</p>
                <p>{`$${info.collectionPrice}`}</p>
                <img
                  className="album-image"
                  src={ info.artworkUrl100 }
                  alt={ info.collectionName }
                />
                <p>{`Músicas: ${info.trackCount}`}</p>
                <div className="card-link-main">
                  <Link
                    className="card-link"
                    to={ `/album/${info.collectionId}` }
                    data-testid={ `link-to-album-${info.collectionId}` }
                  >
                    Ouvir Albúm
                  </Link>
                </div>
              </div>))}
          </div>
        </div>
        {!hasArtist && <Footer />}
      </div>
    );
  }
}

export default Search;
