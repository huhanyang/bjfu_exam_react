import React, { Component } from 'react'
import "antd/dist/antd.css"
import { withRouter } from "react-router-dom"
import { Form, Input, Button, PageHeader, message } from 'antd';

import * as Ajax from '../../util/Ajax'
import '../common/Common.css'

class ChangePassword extends Component {

    onFinish = (values) => {
        Ajax.POST('/exam/user/changePassword', {
            account: values.account,
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
        }, (res) => {
            message.success('密码修改成功，请重新登录！');
            this.props.history.push('/login')
        }, this.props.history)
    };

    render() {
        return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => this.props.history.goBack()}
                title="修改密码"
            />
            <div className="component-content">
                <Form
                    name="changePassword"
                    onFinish={this.onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="account"
                        label="账号"
                        rules={[
                            {
                                min: 8,
                                max: 32,
                                message: '账号长度在8-32位!'
                            },
                            {
                                required: true,
                                message: '请输入账号'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="oldPassword"
                        label="原密码"
                        rules={[
                            {
                                min: 8,
                                max: 32,
                                message: '密码长度在8-32位!'
                            },
                            {
                                required: true,
                                message: '请输入密码'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        label="新密码"
                        rules={[
                            {
                                min: 8,
                                max: 32,
                                message: '新密码长度在8-32位!'
                            },
                            {
                                required: true,
                                message: '请输入新密码'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="再次输入新密码"
                        dependencies={['newPassword']}
                        hasFeedback
                        rules={[
                            {
                                min: 8,
                                max: 32,
                                message: '新密码长度在8-32位!'
                            },
                            {
                                required: true,
                                message: '请再次确认新密码!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('两次输入的密码不匹配!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="component-content-button">修改密码</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
        );
    }
}

export default withRouter(ChangePassword)
