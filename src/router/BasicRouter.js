import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Page from '../page/Page'
import Login from '../component/user/Login'
import Register from '../component/user/Register'
import ChangePassword from '../component/user/ChangePassword'
import CreatePaper from '../component/teacher/CreatePaper';
import EditPaper from '../component/teacher/EditPaper';
import PaperList from '../component/teacher/PaperList';

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
                        <Route
                            path='/createPaper' exact component={CreatePaper}
                        ></Route>
                        <Route
                            path='/editPaper' exact component={EditPaper}
                        ></Route>
                        <Route
                            path='/paperList' exact component={PaperList}
                        ></Route>
                    </Page>
                </Switch>
            </BrowserRouter>
        )
    }

}

export default BasicRouter;