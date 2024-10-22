import { useContext } from 'react';
import { StoreContext } from './store';
import { Routes, Route } from 'react-router-dom';

import List from './components/List';
import Form from './components/Form';
import Header from './components/Header';
import LoginForm from './components/Login';
import landingPage from './components/landingPage'

const App = () => {
  const { state } = useContext(StoreContext);

  return (
    <>
      <Header />
      <div className="container">
       <Routes>
          {state.auth.isLoggedIn ? (
            <>
              <Route
                path="/"
                element={
                  <div className="card px-3">
                    <div className="card-body">
                      <Form />
                      <List />
                    </div>
                  </div>
                }
              />
              <Route path="/landingPage" element={<LandingPage />} />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={
                  <>
                    <p>
                      Example app with login system using cookies. To login, use any
                      username and the password <kbd>abcdef</kbd>
                    </p>
                    <LoginForm />
                  </>
                }
              />
            </>
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;