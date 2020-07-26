import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import App from './App';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact={true} path="/" component={App} />
                <Redirect path="*" to="/" />
            </Switch>
        </Router>
    );
}
