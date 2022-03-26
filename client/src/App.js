import { BrowserRouter, Link } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext';

function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <div className="container">
      <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated }}>
        <BrowserRouter>
          {isAuthenticated && (
            <div>
              <Link to="/create">Create link</Link>
              &nbsp;&nbsp;
              <Link to="/links">Links page</Link>
              &nbsp;&nbsp;
              <button type="button" onClick={logout}>Logout</button>
            </div>
          )}
          <h1>Hello</h1>
          
          {routes}
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
