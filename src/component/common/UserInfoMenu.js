import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom"
import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import "antd/dist/antd.css"

import * as UserTypeEnum from '../../enum/UserTypeEnum'
import * as Ajax from '../../util/Ajax'

class UserInfoMenu extends Component {

    constructor(props) {
        super(props);
    }

    logoutRequest = () => {
        Ajax.GET('/exam/user/logout', (res) => this.props.history.push('/login'), this.props.history);
    }

    teacherMenuItems = [
        {
            url: "/createPaper",
            msg: "创建试卷"
        },{
            url: "/paperList",
            msg: "管理试卷"
        }
    ];

    studentMenuItems = [
        {
            url: "/searchPaper",
            msg: "作答试卷"
        },{
            url: "/paperAnswerList",
            msg: "历史作答"
        }
    ];

    adminMenuItems = [];

    LoginMenu = () => {
        let menuItems;
        if (this.props.type === UserTypeEnum.TEACHER) {
            menuItems = this.teacherMenuItems;
        } else if (this.props.type === UserTypeEnum.STUDENT) {
            menuItems = this.studentMenuItems;
        } else {
            menuItems = this.adminMenuItems;
        }
        let menuContent = menuItems.map((item) => (
            <Menu.Item>
                <Link to={item.url}>
                    {item.msg}
                </Link>
            </Menu.Item>
        ));
        let menu = (
            <Menu>
                {menuContent}
                <Menu.Item>
                    <Link to="/changePassword">
                        修改密码
                    </Link>
                </Menu.Item>
                <Menu.Item danger onClick={this.logoutRequest}>登出</Menu.Item>
            </Menu>
        );
        return (
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    {this.props.name} <DownOutlined />
                </a>
            </Dropdown>
        );
    };

    
    NotLoginMenu = () => {
        return (
            <Link className="ant-dropdown-link" to="/login">
                点击此处登录 <DownOutlined />
            </Link>
        );
    }

    UserMenu = () => {
        if (this.props.name != null) {
            return <this.LoginMenu />;
        } else {
            return <this.NotLoginMenu />;
        }
    }

    render() {
        return (
            <div>
                {this.UserMenu()}
            </div>
        )
    }
}

export default withRouter(UserInfoMenu);
