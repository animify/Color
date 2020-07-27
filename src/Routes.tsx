import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import App from './App';
import { Silicon } from 'silicon.ui';
import theme from './theme';

export default function Routes() {
    return (
        <Silicon theme={theme}>
            <Router>
                <Switch>
                    <Route exact={true} path="/" component={App} />
                    <Redirect path="*" to="/" />
                </Switch>
            </Router>
        </Silicon>
    );
}
