import React from 'react';
import propTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import LoadingScreen from './LoadingScreen';

const INPUT_MINIMUM_SIZE = 2;

class Login extends React.Component {
  state ={
    isEnabled: true,
    nameInput: '',
    loading: false,
    emailInput: '',
    imageInput: '',
    descricaoInput: '',
  }

  componentWillUnmount() {
    this.setState({ loading: false });
  }

  checkHasName = () => {
    const { nameInput } = this.state;
    if (nameInput.length >= INPUT_MINIMUM_SIZE) {
      this.setState({ isEnabled: false });
    } else {
      this.setState({ isEnabled: true });
    }
  }

  doLogin = async () => {
    const { history } = this.props;
    const { nameInput, emailInput, imageInput, descricaoInput } = this.state;
    this.setState({ loading: true });
    await createUser({ name: nameInput,
      email: emailInput,
      image: imageInput,
      description: descricaoInput });
    // his.setState({ loading: false, redirect: true });
    history.push('/search');
  }

  onInputChange = ({ target }) => this.setState({ [target.name]: target.value },
    this.checkHasName());

  render() {
    const { isEnabled, loading } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name-input">
            Nome:
            <input
              type="text"
              data-testid="login-name-input"
              id="name-input"
              onChange={ this.onInputChange }
              name="nameInput"
            />
          </label>
          <label htmlFor="emailInput">
            Email:
            <input
              id="emailInput"
              type="email"
              name="emailInput"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="imageInput">
            Link Imagem:
            <input
              id="imageInput"
              type="text"
              name="imageInput"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="descriptionInput">
            Descrição:
            <input
              id="descricaoInput"
              type="text"
              name="descricaoInput"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isEnabled }
            onClick={ this.doLogin }
          >
            Entrar
          </button>
          <div>
            { loading && <LoadingScreen /> }
            {/* { redirect && <Redirect to="/search" /> } */}
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default Login;
