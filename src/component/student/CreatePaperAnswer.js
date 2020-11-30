import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { PageHeader, Form, Input, Button, Descriptions, message } from 'antd';
import "antd/dist/antd.css"

import * as Ajax from '../../util/Ajax'
import '../common/Common.css'

class CreatePaperAnswer extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (this.props.history.location.paper == null) {
            message.warn("请先选择试卷")
            this.props.history.push('/searchPaper')
        }
    }

    createPaperAnswerRequest = (paperId, collectionAnswer) => {
        Ajax.PUT('/exam/answer/createPaperAnswer', {
            paperId: paperId,
            collectionAnswer: JSON.stringify(collectionAnswer)
        }, (res) => {
            message.success('答卷创建完成开始答题')
            this.props.history.push({
                pathname: '/answerProblem',
                paperAnswerId: res.data.object.id
            })
        }, this.props.history)
    }

    showPaperInfo = (props) => {
        if (props.paper == null) {
            return (<></>)
        } else {
            return (
                <Descriptions size="small" column={1}>
                    <Descriptions.Item label="试卷标题">{props.paper.title}</Descriptions.Item>
                    <Descriptions.Item label="试卷信息">{props.paper.introduction}</Descriptions.Item>
                </Descriptions>
            )
        }
    }

    collectionForm = (props) => {
        if (props.paper == null) {
            return (<></>)
        } else {
            let formItems = JSON.parse(props.paper.collection).map((item) => {
                return (
                    <Form.Item
                        name={item}
                        label={item}
                        key={item}
                        rules={[
                            {
                                required: true,
                                message: '请填写!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                )
            })
            return (
                <Form
                    name="collection_form"
                    onFinish={(values) => {
                        this.createPaperAnswerRequest(props.paper.id, values)
                    }}
                >
                    {formItems}
                    <Form.Item key='submit'>
                        <Button type="primary" htmlType="submit">
                            开始答题
                        </Button>
                    </Form.Item>
                </Form>
            )
        }
    }

    render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => this.props.history.goBack()}
                    title="作答试卷"
                />
                <div className="component-content">
                    <this.showPaperInfo
                        paper={this.props.history.location.paper}
                    />
                    <this.collectionForm
                        paper={this.props.history.location.paper}
                    />
                </div>
            </div>
        );
    }
}


export default withRouter(CreatePaperAnswer)
