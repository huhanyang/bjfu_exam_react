import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Table, PageHeader, Tag } from 'antd';

import * as Ajax from '../../util/Ajax'
import * as PaperAnswerStateEnum from '../../enum/PaperAnswerStateEnum'
import '../common/Common.css'

class PaperAnswerList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: null,
        }
    }

    componentDidMount() {
        this.getPaperAnswersRequest()
    }

    getPaperAnswersRequest() {
        Ajax.GET('/exam/answer/getPaperAnswers', (res) => {
            this.setState({
                data: res.data.object
            })
        }, this.props.history)
    }

    columns = [
        { title: '试卷标题', dataIndex: 'paperTitle' },
        { title: '答卷状态', dataIndex: 'state',
            render: (text, record) => {
                let color, content;
                if (record.state === PaperAnswerStateEnum.FINISH || record.state === PaperAnswerStateEnum.OVERTIME) {
                    color = 'green'
                    content = '作答完成'
                } else {
                    color = 'red'
                    content = '作答中'
                }
                return (
                    <Tag color={color}>
                        {content}
                    </Tag>
                )
            },
        },
        { title: '动作', dataIndex: 'action',
            render: (text, record) => {
                if (record.state === PaperAnswerStateEnum.FINISH || record.state === PaperAnswerStateEnum.OVERTIME) {
                    return null;
                } else {
                    return (
                        <div>
                            <a onClick={() => {
                                this.props.history.push({
                                    pathname: '/answerProblem',
                                    paperAnswerId: record.id
                                })
                            }}>继续答题</a>
                        </div>
                    )
                }
            }
        },
    ];

    render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => this.props.history.goBack()}
                    title="作答历史"
                />
                <div className="component-content">
                    <Table
                        columns={this.columns}
                        dataSource={this.state.data}
                        pagination={false}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(PaperAnswerList)