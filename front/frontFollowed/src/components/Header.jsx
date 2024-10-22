import { useEffect, useContext } from 'react';
import { StoreContext } from '../store';

const Header = () => {
  const { state, dispatch } = useContext(StoreContext);

  useEffect(() => {
    dispatch({
      type: 'GET_USER_INFO',
    });
  }, []);

  const logout = () => {
    dispatch({
      type: 'LOGOUT'
    });
  }

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center p-3 mb-3 bg-white border-b shadow-sm text-center">
        <nav className="my-2 md:my-0">
          <a className="px-2 text-gray-800 hover:text-blue-500" href="https://discord.gg/code">
            Discord Help
          </a>
          {state.auth.isLoggedIn && (
            <button
              type="button"
              onClick={logout}
              className="ml-4 py-2 px-4 border border-gray-600 text-gray-600 hover:bg-gray-200 rounded"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;
