import React from 'react';
import propTypes from 'prop-types';
import LoadingScreen from '../pages/LoadingScreen';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../bootstrap.min.css';

class MusicCard extends React.Component {
  state ={
    isChecked: false,
    loading: false,
    // favoriteList: [],
  }

  componentDidMount() {
    this.checkIsFavorite();
  }

  checkIsFavorite = async () => {
    this.setState({ loading: true });
    const { trackId } = this.props;
    const favoritList = await getFavoriteSongs();
    const isFavorite = favoritList.some((element) => element.trackId === trackId);
    this.setState({ loading: false, isChecked: isFavorite });
  }

  removeFromList = async () => {
    this.setState({ loading: true });
    const { dataSong } = this.props;
    await removeSong(dataSong);
    this.setState({ loading: false });
  }

  addToList = async () => {
    const { isChecked } = this.state;
    if (isChecked) {
      this.setState({ isChecked: false });
      this.removeFromList();
      const { favoriteSong } = this.props;
      if (favoriteSong) {
        favoriteSong();
      }
    } else {
      this.setState({ loading: true });
      const { dataSong } = this.props;
      await addSong(dataSong);
      this.setState({ loading: false, isChecked: true });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, isChecked } = this.state;
    return (
      <div>
        {loading ? <LoadingScreen /> : (
          <div className="music-card-container">
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <div className="form-check">
              <label className="form-check-label" htmlFor={ trackId }>
                Favorita
                <input
                  className="form-check-input"
                  name={ trackId }
                  checked={ isChecked }
                  id={ trackId }
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  onChange={ this.addToList }
                />
              </label>
            </div>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  dataSong: propTypes.node.isRequired,
  favoriteSong: propTypes.func.isRequired,
};

export default MusicCard;
