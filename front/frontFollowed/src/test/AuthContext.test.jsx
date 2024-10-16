import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, AuthContext } from './AuthContext.jsx';
import axios from 'axios';
import Cookies from 'js-cookie';

jest.mock('axios');
jest.mock('js-cookie');

const MockComponent = () => {
  const { user, loading, error } = React.useContext(AuthContext);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return <div>{user ? user.email : 'No user'}</div>;
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Réinitialiser les mocks avant chaque test
  });

  it('should fetch user data when token is available', async () => {
    // Simuler la valeur du cookie et la réponse de l'API
    Cookies.get.mockReturnValue('mockToken');
    axios.get.mockResolvedValue({
      data: { email: 'test@example.com' },
    });

    render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>
    );

    // Attendre que le composant soit mis à jour avec les données de l'utilisateur
    await waitFor(() => expect(screen.getByText('test@example.com')).toBeInTheDocument());
  });

  it('should show an error message when token is missing', async () => {
    // Simuler un cookie manquant
    Cookies.get.mockReturnValue(undefined);

    render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>
    );

    // Attendre que le message d'erreur soit affiché
    await waitFor(() => expect(screen.getByText('Token manquant')).toBeInTheDocument());
  });

  it('should show an error message when API fails', async () => {
    Cookies.get.mockReturnValue('mockToken');
    axios.get.mockRejectedValue(new Error('Network Error'));

    render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>
    );

    // Attendre que le message d'erreur soit affiché
    await waitFor(() => expect(screen.getByText('Erreur lors de la récupération de l\'utilisateur connecté.')).toBeInTheDocument());
  });
});
