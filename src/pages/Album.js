import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    artist: [],
    hasName: false,
  }

  componentDidMount() {
    this.getArtist();
  }

  getArtist = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({ artist: musics, hasName: true });
    // const { artist } = this.state;
    // console.log(artist[0].artistName);
  }

  render() {
    const { artist, hasName } = this.state;
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
