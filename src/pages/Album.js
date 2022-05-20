import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    artist: [],
    hasName: false,
    onlyWithSongs: [],
  }

  componentDidMount() {
    this.getArtist();
  }

  getArtist = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const songs = musics.filter((artist) => artist.trackName);
    this.setState({ artist: musics, hasName: true, onlyWithSongs: songs });
  }

  render() {
    const { artist, hasName, onlyWithSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {hasName && (
          <div>
            <h1 data-testid="artist-name">
              {`${artist[0].artistName} `}
            </h1>
            <p data-testid="album-name">
              {`${artist[0].collectionName} `}
            </p>
            {onlyWithSongs.map((dataSong) => (
              <div key={ dataSong.trackName }>
                <MusicCard
                  trackName={ dataSong.trackName }
                  previewUrl={ dataSong.previewUrl }
                  trackId={ dataSong.trackId }
                  dataSong={ dataSong }
                  favoriteSong={ getFavoriteSongs() }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
};

export default Album;
