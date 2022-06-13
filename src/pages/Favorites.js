import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    favoriteList: [],
  }

  componentDidMount() {
    this.favoritesSongsRequest();
  }

  favoritesSongsRequest = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ favoriteList: favorites });
  }

  render() {
    const { favoriteList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="favorites-main-title">
          <h1>Músicas Favoritas</h1>
        </div>
        <div className="favorites-main-container">
          {favoriteList && (
            favoriteList.map((dataSong) => (
              <div className="music-card" key={ dataSong.trackId }>
                <MusicCard
                  trackName={ dataSong.trackName }
                  previewUrl={ dataSong.previewUrl }
                  trackId={ dataSong.trackId }
                  dataSong={ dataSong }
                  favoriteSong={ this.favoritesSongsRequest }
                />
              </div>
            ))
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Favorites;
