import React from 'react';
import { Link } from 'react-router-dom';
import LoadingScreen from '../pages/LoadingScreen';
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
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="header-component">
        {loading ? <LoadingScreen /> : <p data-testid="header-user-name">{user}</p>}
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Favorites</Link>
      </div>
    );
  }
}

export default Header;
