import React from 'react';
import propTypes from 'prop-types';
import '../index.css';

class MainHeader extends React.Component {
  render() {
    const { userName } = this.props;
    return (
      <div className="main-header-container">
        <div className="main-title-container">
          <h1 className="main-header-title">TrybeTunes</h1>
        </div>
        <div className="user-loged-in-container">
          <p className="user-loged-in" data-testid="header-user-name">
            {`${userName} `}
          </p>
        </div>
      </div>
    );
  }
}

MainHeader.propTypes = {
  userName: propTypes.string.isRequired,
};

export default MainHeader;
