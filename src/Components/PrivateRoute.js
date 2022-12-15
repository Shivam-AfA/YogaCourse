import * as React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';


function PrivateRoute({ component: Component, ...rest }) {
    const {user} = React.useContext(AuthContext);
    return (
        <Route {...rest} render={(props) => {
            return user ? <Component {...props} /> : <Redirect to = "login"></Redirect>
        }}>
        </Route>
    )
}

export default PrivateRoute