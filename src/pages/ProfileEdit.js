import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
// import LoadingScreen from './LoadingScreen';
import Footer from '../components/Footer';
import '../bootstrap.min.css';

class ProfileEdit extends React.Component {
  state ={
    isDisabled: true,
    inputName: '',
    inputEmail: '',
    inputDescription: '',
    inputImage: '',
    // loading: true,
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
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    } else {
      this.setState({ isDisabled: true });
    }
  }

 updateUsuario = async () => {
   //  this.setState({ loading: true });
   const { inputName, inputImage, inputEmail, inputDescription } = this.state;
   await updateUser({ name: inputName,
     email: inputEmail,
     image: inputImage,
     description: inputDescription });
   //  this.setState({ loading: false });
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
      inputImage } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div className="profile-edit-main-container">
          <form>
            <label htmlFor="inputName" className="label-font edit-inputs">
              Editar nome:
              <input
                className="form-control"
                value={ inputName }
                type="text"
                name="inputName"
                data-testid="edit-input-name"
                id="inputName"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="inputEmail" className="label-font edit-inputs">
              Editar email:
              <input
                className="form-control"
                value={ inputEmail }
                type="email"
                name="inputEmail"
                data-testid="edit-input-email"
                id="inputEmail"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="inputDescription" className="label-font edit-inputs">
              Editar descrição:
              <input
                className="form-control"
                value={ inputDescription }
                type="text"
                name="inputDescription"
                data-testid="edit-input-description"
                id="inputDescription"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="inputImage" className="label-font edit-inputs">
              Editar imagem:
              <input
                className="form-control"
                value={ inputImage }
                type="text"
                name="inputImage"
                data-testid="edit-input-image"
                id="inputImage"
                onChange={ this.onInputChange }
              />
            </label>
            <button
              className="btn btn-primary edit-inputs"
              data-testid="edit-button-save"
              disabled={ isDisabled }
              type="button"
              onClick={ this.updateUsuario }
            >
              Salvar
            </button>
          </form>
        </div>
        <Footer />
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
