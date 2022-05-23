import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import LoadingScreen from './LoadingScreen';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    loading: true,
    favoriteList: [],
  }

  componentDidMount() {
    this.favoritesSongsRequest();
  }

  favoritesSongsRequest = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ favoriteList: favorites, loading: false });
  }

  render() {
    const { loading, favoriteList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <LoadingScreen /> : (
          favoriteList.map((dataSong) => (
            <div key={ dataSong.trackId }>
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
    );
  }
}

export default Favorites;
