import * as AJAX from '../../util/Ajax'
import '../common/Common.css'
import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { PageHeader, Input, Radio, Form, Button, message } from 'antd';
import "antd/dist/antd.css"

import ProblemShow from './ProblemShow'
const { TextArea } = Input;

class AnswerProblem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            answeringProblem: null,
            startTime: null,
            firstEditTime: null,
            editTime: 0,
            isEdit: false,
            isEditTime: 0
        }
    }
    formRef = React.createRef();

    componentDidMount() {
        if (this.props.history.location.paperAnswerId == null) {
            message.warn('请先选择答卷')
            this.props.history.push('/paperAnswerList')
        } else {
            //根据路由中的答卷id获取答卷
            this.getProblemRequest(this.props.history.location.paperAnswerId)
            //设置定时器
            this.timerID = setInterval(
                () => this.tick(),
                1000
            );
        }
    }

    componentWillUnmount() {
        //取消定时器
        clearInterval(this.timerID);
    }

    getProblemRequest = (paperAnswerId) => {
        AJAX.GET('/exam/answer/getNextProblem?paperAnswerId=' + paperAnswerId, (res) => {
            if(res.data.object == null) {
                message.success("答题结束！")
                this.props.history.push('/paperAnswerList')
            } else {
                this.setState({
                    startTime: Date.now(),
                    editTime: 0,
                    answeringProblem: res.data.object,
                    firstEditTime: null,
                    isEdit: false
                });
                // 清空输入
                this.formRef.current.resetFields();
            }
        }, this.props.history)
    }

    submitAnswerRequest = (answer) => {
        AJAX.PUT('/exam/answer/submitAnswer', {
            paperAnswerId: this.props.history.location.paperAnswerId,
            startTime: this.state.startTime,
            firstEditTime: this.state.firstEditTime,
            editTime: this.state.editTime,
            submitTime: Date.now(),
            answer: answer
        }, (res) => {
            this.getProblemRequest(this.props.history.location.paperAnswerId)
        }, this.props.history)
    }

    tick() {
        if (this.state.isEdit) {
            if (this.state.isEditTime >= 4) {
                this.setState({
                    isEdit: false,
                })
            }
            this.setState({
                editTime: this.state.editTime + 1,
                isEditTime: this.state.isEditTime + 1
            })
        }
    }

    problemAnswerForm = (props) => {
        if (props.problem == null) return (<></>)
        let content
        if (props.problem.type === 1) {
            let radios = JSON.parse(props.problem.answer).map((answer) => <Radio value={answer}>{answer}</Radio>)
            content = (
                <div>
                    <Radio.Group>
                        {radios}
                    </Radio.Group>
                </div>
            )
        } else {
            content = (
                <div>
                    <TextArea rows={4}
                        onChange={(value) => {
                            this.setState({
                                isEdit: true,
                                isEditTime: 0
                            })
                            if (this.state.firstEditTime == null) {
                                this.setState({
                                    firstEditTime: Date.now()
                                })
                            }
                        }}
                    ></TextArea>
                </div>
            )
        }
        return (
            <Form
                ref={this.formRef}
                onFinish={(values) => {
                    this.submitAnswerRequest(values.answer)
                }}
            >
                <Form.Item
                    name="answer"
                    rules={[
                        {
                            required: true,
                            message: '请作答!',
                        },
                    ]}
                >
                    {content}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">提交答案</Button>
                </Form.Item>
            </Form>
        )
    }

    render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => this.props.history.goBack()}
                    title="试卷答题"
                    subTitle="测试试卷"
                />
                <div className="component-content">
                    <ProblemShow problem={this.state.answeringProblem} />
                    <this.problemAnswerForm problem={this.state.answeringProblem} />
                </div>
            </div>
        );
    }
}

export default withRouter(AnswerProblem)
