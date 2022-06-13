import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

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
          <div className="album-data-main-container">
            <div className="album-data-container">
              <h1 data-testid="artist-name">
                {artist[0].artistName}
              </h1>
              <p data-testid="album-name">
                {artist[0].collectionName}
              </p>
              <img
                src={ artist[0].artworkUrl100 }
                alt={ artist[0].collectionName }
              />
            </div>
            <div className="songs-main-container">
              {onlyWithSongs.map((dataSong) => (
                <div className="music-card" key={ dataSong.trackName }>
                  <MusicCard
                    trackName={ dataSong.trackName }
                    previewUrl={ dataSong.previewUrl }
                    trackId={ dataSong.trackId }
                    dataSong={ dataSong }
                  />
                </div>
              ))}
            </div>
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
