import React from 'react';
import { Link } from 'react-router-dom';
import LoadingScreen from '../pages/LoadingScreen';
import MainHeader from '../pages/MainHeader';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    user: '',
    loading: true,
  }

  componentDidMount() {
    getUser().then((user) => {
      this.setState({ user: user.name, loading: false });
    });
    const { user } = this.state;
    console.log(user);
    if (user === undefined) {
      this.setState({ user: 'NoUSer' });
    }
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="header-component">
        <MainHeader userName={ user } />
        <div className="header-links-main-container">
          <div className="header-links-container">
            <Link className="link" to="/search" data-testid="link-to-search">Buscar</Link>
          </div>
          <div className="header-links-container">
            <Link
              className="link"
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Favoritos

            </Link>
          </div>
          <div className="header-links-container">
            <Link
              className="link"
              to="/profile"
              data-testid="link-to-profile"
            >
              Perfil
            </Link>
          </div>
        </div>
        {loading && <LoadingScreen /> }
      </div>
    );
  }
}

export default Header;
