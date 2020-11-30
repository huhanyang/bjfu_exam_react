import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Table, Switch, PageHeader, message } from 'antd';

import * as AJAX from '../../util/Ajax'
import '../common/Common.css'
import * as UserStateEnum from '../../enum/UserStateEnum'
import * as DateUtil from '../../util/DateUtil'


class TeachersManager extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: null,
        }
    }

    componentDidMount() {
        this.getAllTeacherAccountRequest()
    }

    getAllTeacherAccountRequest() {
        AJAX.GET('/exam/admin/getAllTeacherAccount', (res) => {
            this.setState({
                data: res.data.object
            })
        }, this.props.history)
    }


    columns = [
        { title: '用户名', dataIndex: 'account', key: 'account' },
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '创建时间', dataIndex: 'createdTime', key: 'createdTime',
            render: (state, record) => {
                return DateUtil.dateFormat("YYYY-mm-dd HH:MM", record.createdTime);
            }
        },
        { title: '账号', dataIndex: 'state', key: 'state', 
            render: (state, record) => {
                return (
                    <Switch checkedChildren="激活状态" unCheckedChildren="封禁状态"
                        defaultChecked={state === UserStateEnum.ACTIVE}
                        onChange={(checked, event) => {
                            console.log(checked)
                            console.log(record.id)
                            let url = checked? '/activeTeacherAccount' : '/banTeacherAccount'
                            AJAX.POST('/exam/admin'+ url + '?teacherAccountId=' + record.id, null, (res) => {
                                message.success('变更成功！')
                                this.getAllTeacherAccountRequest()
                            }, this.props.history)
                        }}
                    />
                );
            },
        }
    ];

    render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => this.props.history.goBack()}
                    title="管理教师账号"
                />
                <div className="component-content" >
                    <Table columns={this.columns} dataSource={this.state.data} pagination={false} />
                </div>
            </div>
        )
    }
}

export default withRouter(TeachersManager)