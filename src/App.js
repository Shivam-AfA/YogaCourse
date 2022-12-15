import logo from './logo.svg';
import './App.css';
import Login from './Components/Login.js'
import Signup from './Components/Signup.js';
import Feed from './Components/Feed.js';
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from './Components/PrivateRoute.js';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* The componenets enclosed in this tag will be given as children
          to the AuthProvider function in the AuthContext.js file*/}
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={Signup} />
          <PrivateRoute path='/' exact component={Feed} />

        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
