import React, { Component } from 'react'
import "antd/dist/antd.css"
import { withRouter } from "react-router-dom"
import { Form, Input, Tooltip, Button, PageHeader, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import * as Ajax from '../../util/Ajax'
import '../common/Common.css'

class CreateTeacherAccount extends Component {

    onFinish = (values) => {
        Ajax.PUT('/exam/admin/createTeacherAccount', {
            account: values.account,
            password: values.password,
            name: values.name
        }, (res) => {
            message.success('创建成功');
            this.props.history.push('/teachersManager');
        }, this.props.history);
    };

    render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => this.props.history.goBack()}
                    title="创建教师账号"
                />
                <div className="component-content">
                    <Form
                        name="register-form"
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
                            name="password"
                            label="密码"
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
                            name="confirm"
                            label="再次输入密码"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    min: 8,
                                    max: 32,
                                    message: '密码长度在8-32位!'
                                },
                                {
                                    required: true,
                                    message: '请再次确认您的密码!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('两次输入的密码不匹配!');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label={
                            <span>
                                真实姓名&nbsp;
                                <Tooltip title="真实姓名仅用于便于辨认">
                                <QuestionCircleOutlined />
                                </Tooltip>
                            </span>
                            }
                            rules={[{ required: true, message: '请输入您的真实姓名!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="component-content-button">添加账号</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }

}

export default withRouter(CreateTeacherAccount);