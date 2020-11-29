import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Page from '../page/Page'
import Login from '../component/user/Login'
import Register from '../component/user/Register'
import ChangePassword from '../component/user/ChangePassword'

class BasicRouter extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Page>
                        <Route
                            path='/login' exact component={Login}
                        ></Route>
                        <Route
                            path='/register' exact component={Register}
                        ></Route>
                        <Route
                            path='/changePassword' exact component={ChangePassword}
                        ></Route>
                    </Page>
                </Switch>
            </BrowserRouter>
        )
    }

}

export default BasicRouter;