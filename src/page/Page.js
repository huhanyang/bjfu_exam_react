import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { Layout } from 'antd';
import 'antd/dist/antd.css'

import './Page.css'
import * as Ajax from '../util/Ajax'
import UserInfoMenu from '../component/common/UserInfoMenu'

const { Header, Content, Footer } = Layout;

class Page extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: null,
            type: null
        }
    }

    componentDidMount() {
        this.loginCheckRequest();
    }

    loginCheckRequest() {
        Ajax.GET('/exam/user/getUserInfo', (res) => {
            this.setState({
                name: res.data.object.name,
                type: res.data.object.type
            });
        }, this.props.history);
    }

    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <div className="userInfoMenu">
                        <UserInfoMenu 
                            name={this.state.name} 
                            type={this.state.type} 
                            history={this.props.history}
                        />
                    </div>
                </Header>
                <Content className="content">
                    {this.props.children}
                </Content>
                <Footer className="footer">
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        );
    }
}

export default withRouter(Page);