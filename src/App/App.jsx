import React from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';

import { history } from '@/_helpers';
import { ListPhoto } from '@/pages';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component={ListPhoto} />
                </Switch>
            </Router>
        );
    }
}

export { App }; 