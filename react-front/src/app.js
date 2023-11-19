import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AdminHome from './home/adminHome';
import ClientHome from './home/clientHome';
import Login from './login/login';
import ClientContainer from './client/client-container';
import DeviceContainer from './device/device-container';
import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import AdminNavBar from './navbars/adminNavbar';
import ClientNavBar from './navbars/clientNavbar';
import ClientDeviceContainer from './client/client-devices-container';
import AdminContainer from './admin/admin-container';

function PrivateRoute({ component: Component, allowedRoles, ...rest }) {
  // Check if the user's role is allowed for this route
  const userRole = sessionStorage.getItem('userRole'); // Retrieve user role from storage
  if (allowedRoles.includes(userRole)) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    // User is not authorized, redirect to a different route (e.g., login)
    return <Redirect to="/" />;
  }
}

function App() {
  return (
    <div className={styles.back}>
      <Router>
        <div>
          <AdminNavBar />
          <ClientNavBar/>
          <Switch>
            <Route exact path='/' render={() => <Login />} />
            {/* Define a private route for the admin dashboard */}
            <PrivateRoute
              exact
              path='/admin'
              component={AdminHome}
              allowedRoles={['administrator']} // Specify the roles allowed for this route
            />
            {/* Define a private route for the client dashboard */}
            <PrivateRoute
              exact
              path='/client'
              component={ClientHome}
              allowedRoles={['client']}
            />
            <PrivateRoute
              exact
              path='/admin/client'
              component={ClientContainer}
              allowedRoles={['administrator']} // Only admins can access this route
            />
            <PrivateRoute
              exact
              path='/admin/device'
              component={DeviceContainer}
              allowedRoles={['administrator']}
            />
            <PrivateRoute
              exact
              path='/admin/edits'
              component={AdminContainer}
              allowedRoles={['administrator']}
            />
            <PrivateRoute
              exact
              path='/client/device'
              component={ClientDeviceContainer}
              allowedRoles={['client']}
            />
            
            <Route
              exact
              path='/error'
              render={() => <ErrorPage />}
            />
            <Route
              render={() => <ErrorPage />}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
