import React from 'react';
import propTypes from 'prop-types';
import LoadingScreen from '../pages/LoadingScreen';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

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
    const { favoriteSong, trackId } = this.props;
    const favoritList = await favoriteSong;
    const isFavorite = favoritList.some((element) => element.trackId === trackId);
    if (isFavorite) {
      this.setState({ loading: false, isChecked: true });
    } else {
      this.setState({ loading: false, isChecked: false });
    }
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
          <div>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ trackId }>
              Favorita
              <input
                name={ trackId }
                checked={ isChecked }
                id={ trackId }
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                onChange={ this.addToList }
              />
            </label>
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
