import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import LoadingScreen from './LoadingScreen';

class Profile extends React.Component {
  state = {
    name: '',
    loading: false,
    email: '',
    descricao: '',
    imagem: '',
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    this.setState({ loading: true });
    const userData = await getUser();
    // console.log(userData);
    this.setState({ name: userData.name,
      loading: false,
      email: userData.email,
      descricao: userData.description,
      imagem: userData.image,
    });
  }

  render() {
    const { name, loading, email, imagem, descricao } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <LoadingScreen /> : (
          <div>
            <h1>{name}</h1>
            <p>{email}</p>
            <img data-testid="profile-image" src={ imagem } alt="profilePic" />
            <p>{descricao}</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
