import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import LoadingScreen from './LoadingScreen';

class ProfileEdit extends React.Component {
  state ={
    isDisabled: true,
    inputName: '',
    inputEmail: '',
    inputDescription: '',
    inputImage: '',
    loading: true,
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    const user = await getUser();
    const { name, email, image, description } = user;
    this.setState({ inputName: name,
      inputEmail: email,
      inputDescription: description,
      inputImage: image,
    });
    this.checkFields();
  }

  checkFields = () => {
    const { inputName, inputDescription, inputEmail, inputImage } = this.state;
    if (inputName && inputDescription && inputImage) {
      if (inputEmail.includes('@')) {
        this.setState({ isDisabled: false, loading: false });
      } else {
        this.setState({ isDisabled: true, loading: false });
      }
    } else {
      this.setState({ isDisabled: true, loading: false });
    }
  }

 updateUsuario = async () => {
   this.setState({ loading: true });
   const { inputName, inputImage, inputEmail, inputDescription } = this.state;
   await updateUser({ name: inputName,
     email: inputEmail,
     image: inputImage,
     description: inputDescription });
   this.setState({ loading: false });
   const { history } = this.props;
   history.push('/profile');
 }

  onInputChange = ({ target }) => this.setState({ [target.name]: target.value },
    this.checkFields);

  render() {
    const { isDisabled,
      inputName,
      inputDescription,
      inputEmail,
      inputImage,
      loading } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <LoadingScreen /> : (
          <form>
            <label htmlFor="inputName">
              Editar nome:
              <input
                value={ inputName }
                type="text"
                name="inputName"
                data-testid="edit-input-name"
                id="inputName"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="inputEmail">
              Editar email:
              <input
                value={ inputEmail }
                type="email"
                name="inputEmail"
                data-testid="edit-input-email"
                id="inputEmail"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="inputDescription">
              Editar descrição:
              <input
                value={ inputDescription }
                type="text"
                name="inputDescription"
                data-testid="edit-input-description"
                id="inputDescription"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="inputImage">
              Editar imagem:
              <input
                value={ inputImage }
                type="text"
                name="inputImage"
                data-testid="edit-input-image"
                id="inputImage"
                onChange={ this.onInputChange }
              />
            </label>
            <button
              data-testid="edit-button-save"
              disabled={ isDisabled }
              type="button"
              onClick={ this.updateUsuario }
            >
              Salvar
            </button>
          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
