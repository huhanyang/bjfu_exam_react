import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, PageHeader, message } from 'antd';
import "antd/dist/antd.css";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import * as Ajax from '../../util/Ajax'
import * as UserTypeEnum from '../../enum/UserTypeEnum'
import '../common/Common.css'



class Login extends Component {

    onFinish = (values) => {
        Ajax.POST('/exam/user/loginCheck', {
            "account": values.account,
            "password": values.password
        }, (res) => {
            message.success('登陆成功');
            if (res.data.object.type === UserTypeEnum.TEACHER) {
                this.props.history.push('/paperList');
            } else if(res.data.object.type === UserTypeEnum.STUDENT) {
                this.props.history.push('/searchPaper');
            } else {
                this.props.history.push('/teachersManager');
            }
        }, this.props.history);
    }

    render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    backIcon="false"
                    title="登录"
                />
                <div className="component-content">
                    <Form
                        name="login_form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="account"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的账号!',
                                },
                                {
                                    min: 8,
                                    max: 32,
                                    message: '账号长度在8-32位!'
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的密码!',
                                },
                                {
                                    min: 8,
                                    max: 32,
                                    message: '密码长度在8-32位!'
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住我</Checkbox>
                            </Form.Item>
                            <Link to="changePassword" style={{float: 'right'}}>
                                修改密码
                            </Link>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="component-content-button">
                                登录
                            </Button>
                            Or <Link to="register">学生注册!</Link>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);
