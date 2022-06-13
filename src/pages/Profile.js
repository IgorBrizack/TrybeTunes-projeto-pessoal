import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
// import LoadingScreen from './LoadingScreen';

class Profile extends React.Component {
  state = {
    name: '',
    // loading: true,
    email: '',
    descricao: '',
    imagem: '',
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    // this.setState({ loading: true });
    const userData = await getUser();
    console.log(userData);
    this.setState({ name: userData.name,
      // loading: false,
      email: userData.email,
      descricao: userData.description,
      imagem: userData.image,
    });
  }

  render() {
    const { name, email, imagem, descricao } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {name && (
          <div className="profile-main-container">
            <h1>{name}</h1>
            <p>{email}</p>
            <img data-testid="profile-image" src={ imagem } alt="profilePic" />
            <p>{descricao}</p>
            <div className="profile-link-container">
              <Link className="profile-link" to="/profile/edit">Editar perfil</Link>
              <Link className="profile-link" to="/">Sair</Link>
            </div>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

export default Profile;
