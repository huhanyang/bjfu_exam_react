import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Page from '../page/Page'
import Login from '../component/user/Login'
import Register from '../component/user/Register'
import ChangePassword from '../component/user/ChangePassword'
import CreatePaper from '../component/teacher/CreatePaper';
import EditPaper from '../component/teacher/EditPaper';
import PaperList from '../component/teacher/PaperList';
import SearchPaper from '../component/student/SearchPaper';
import CreatePaperAnswer from '../component/student/CreatePaperAnswer';
import PaperAnswerList from '../component/student/PaperAnswerList';
import AnswerProblem from '../component/student/AnswerProblem';
import TeachersManager from '../component/admin/TeachersManager';
import CreateTeacherAccount from '../component/admin/CreateTeacherAccount';
import ImagesEdit from '../component/teacher/ImagesEdit';

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
                        <Route
                            path='/searchPaper' exact component={SearchPaper}
                        ></Route>
                        <Route
                            path='/createPaperAnswer' exact component={CreatePaperAnswer}
                        ></Route>
                        <Route
                            path='/paperAnswerList' exact component={PaperAnswerList}
                        ></Route>
                        <Route
                            path='/answerProblem' exact component={AnswerProblem}
                        ></Route>
                        <Route
                            path='/teachersManager' exact component={TeachersManager}
                        ></Route>
                        <Route
                            path='/createTeacherAccount' exact component={CreateTeacherAccount}
                        ></Route>
                        <Route
                            path='/imagesEdit' exact component={ImagesEdit}
                        ></Route>
                    </Page>
                </Switch>
            </BrowserRouter>
        )
    }

}

export default BasicRouter;